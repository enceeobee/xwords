import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Clues from './Clues'
import Header from './Header'
import Modal from './Modal'
import Puzzle from './Puzzle'

import clonePuzzle from '../lib/puzzle/clonePuzzle'
import constructPuzzle from '../lib/puzzle/constructPuzzle'
import normalizeClues from '../lib/clue/normalizeClues'
import checkIsWinner from '../lib/puzzle/checkIsWinner'
import jump from '../lib/cell/jump'
import skip from '../lib/cell/skip'
import step from '../lib/cell/step'
import formatDate from '../lib/puzzle/formatDate'
import {
  ACROSS,
  BLOCK,
  DOWN,
  EMPTY,
  UP,
  RIGHT,
  LEFT
} from '../lib/constants'

import '../css/App.css'

class App extends Component {
  constructor () {
    super()

    this.initialState = {
      clues: {
        across: [],
        down: []
      },
      date: new Date(),
      isModalVisible: false,
      entries: [],
      inputCell: [0, 0],
      isLoading: false,
      numberCoords: {},
      puzzle: [],
      rawPuzzle: {},
      selectedClue: {
        number: 1,
        direction: ACROSS
      }
    }

    this.state = { ...this.initialState }
    this.directions = [ACROSS, DOWN]
  }

  componentDidMount () {
    this.loadPuzzle()
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.inputCharacter, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  handleKeyDown = (event) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft': {
        return this.handleArrowKey(event)
      }
      case 'Space':
        event.preventDefault()
        break
      default:
        return false
    }
  }

  loadPuzzle = () => {
    // TODO - Check if puzzle is already in localStorage

    const { date } = this.state
    this.setState(() => ({ ...this.initialState, date }))

    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    fetch(`http://localhost:3333/xword?date=${formattedDate}`)
      .then(res => res.json())
      .then(body => {
        document.addEventListener('keyup', this.inputCharacter, false)
        document.addEventListener('keydown', this.handleKeyDown, false)

        this.setState(() => ({ isLoading: false, isModalVisible: false, rawPuzzle: body }), this.arrangePuzzle)
      })
      .catch(e => {
        console.error(e)
        this.setState(() => ({ isLoading: false, isModalVisible: false }))
      })
  }

  arrangePuzzle = () => {
    const { clues, grid, gridnums, size } = this.state.rawPuzzle
    const { numberCoords, constructedPuzzle: puzzle } = constructPuzzle(grid, gridnums, size)
    const across = normalizeClues(clues.across, ACROSS)
    const down = normalizeClues(clues.down, DOWN)

    this.setState(() => ({ puzzle, numberCoords, clues: { across, down } }))
  }

  selectDate = (date) => {
    if (date.toISOString() === this.state.date.toISOString()) return false

    this.setState({ date }, () => {
      this.loadPuzzle()
    })
  }

  selectClue = (number, direction) => {
    this.setState(() => ({
      selectedClue: { direction, number },
      inputCell: [...this.state.numberCoords[number]]
    }))
  }

  handleCellClick = ([row, col]) => {
    const doToggleDirection = (row === this.state.inputCell[0] && col === this.state.inputCell[1])

    this.selectInputCell([row, col])

    if (doToggleDirection) this.toggleDirection()
  }

  inputCharacter = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      return this.inputLetter(event.key.toUpperCase())
    }

    switch (event.code) {
      case 'Space': {
        return this.toggleDirection()
      }
      case 'Backspace': {
        return this.handleBackspace()
      }
      case 'Escape': {
        if (this.state.isModalVisible) {
          this.toggleModal()
        }
        break
      }
      default: {
        return false
      }
    }
  }

  handleBackspace = () => {
    const puzzle = clonePuzzle(this.state.puzzle)
    let [row, col] = this.state.inputCell

    if (puzzle[row][col].input === EMPTY) {
      if (this.state.selectedClue.direction === ACROSS) {
        if (col === 0 || puzzle[row][col - 1].value === BLOCK) return false

        col--
      } else {
        if (row === 0 || puzzle[row - 1][col].value === BLOCK) return false

        row--
      }
    }

    puzzle[row][col].input = EMPTY

    this.setState(() => ({ puzzle, inputCell: [row, col] }))
  }

  handleArrowKey = (event) => {
    const { inputCell, puzzle, selectedClue } = this.state
    const arrowDirection = event.code.match(/Arrow(Up|Right|Down|Left)/)[1].toLowerCase()

    let [nextRow, nextCol] = inputCell

    if (event.shiftKey) {
      const isSameAxis = (
        ([LEFT, RIGHT].includes(arrowDirection) && selectedClue.direction === ACROSS) ||
        ([UP, DOWN].includes(arrowDirection) && selectedClue.direction === DOWN)
      )
      const move = isSameAxis ? jump : step;
      [nextRow, nextCol] = move(puzzle, inputCell, arrowDirection)
    } else {
      const doChangeDirection = (
        ([LEFT, RIGHT].includes(arrowDirection) && selectedClue.direction === DOWN) ||
        ([UP, DOWN].includes(arrowDirection) && selectedClue.direction === ACROSS)
      )

      if (doChangeDirection) return this.toggleDirection();

      [nextRow, nextCol] = step(puzzle, inputCell, arrowDirection)
    }

    if (nextRow !== inputCell[0] || nextCol !== inputCell[1]) {
      this.selectInputCell([nextRow, nextCol])
    }
  }

  inputLetter = (letter) => {
    const puzzle = clonePuzzle(this.state.puzzle)
    const { inputCell, selectedClue } = this.state
    const [row, col] = inputCell
    const isCellEmpty = puzzle[row][col].input === EMPTY

    puzzle[row][col].input = letter

    this.setState(() => ({ puzzle }), () => {
      if (checkIsWinner(this.state.puzzle)) {
        alert('TODO - YOU ARE A WINNER')
      }

      // TODO - Maybe create separate functions for these checks
      if (
        (selectedClue.direction === ACROSS && col === puzzle[0].length - 1) ||
        (selectedClue.direction === DOWN && row === puzzle.length - 1)
      ) {
        return false
      }

      const nextCell = selectedClue.direction === ACROSS ? puzzle[row][col + 1] : puzzle[row + 1][col]
      const isEndOfClue = !nextCell || nextCell.value === BLOCK

      if (isEndOfClue) return false

      const searchDirection = selectedClue.direction === DOWN ? DOWN : 'right'
      const move = isCellEmpty ? skip : step
      const [nextRow, nextCol] = move(this.state.puzzle, inputCell, searchDirection)

      this.selectInputCell([nextRow, nextCol])
    })
  }

  selectInputCell = (inputCell) => {
    const [row, col] = inputCell
    const { direction } = this.state.selectedClue
    const updatedSelectedClue = {
      direction,
      number: this.state.puzzle[row][col].clues[direction]
    }

    this.setState(() => ({ inputCell: [...inputCell], selectedClue: updatedSelectedClue }))
  }

  toggleDirection = () => {
    const [row, col] = this.state.inputCell
    const { direction } = this.state.selectedClue
    let updatedSelectedDirection = direction
    let updatedSelectedNumber = this.state.puzzle[row][col].clues[direction]

    updatedSelectedDirection = updatedSelectedDirection === this.directions[0] ? this.directions[1] : this.directions[0]

    if (this.state.puzzle[row][col].clues[updatedSelectedDirection] !== updatedSelectedNumber) {
      updatedSelectedNumber = this.state.puzzle[row][col].clues[updatedSelectedDirection]
    }

    const updatedSelectedClue = {
      direction: updatedSelectedDirection,
      number: updatedSelectedNumber
    }

    this.setState(() => ({ selectedClue: updatedSelectedClue }))
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  render () {
    const { clues, date, puzzle, inputCell, isLoading, rawPuzzle, selectedClue } = this.state

    return (
      <div className='App'>
        <Header
          openModal={this.toggleModal}
          author={rawPuzzle.author}
          date={formatDate(date)}
          hastitle={rawPuzzle.hastitle}
          title={rawPuzzle.title}
        />

        <div className='puzzle-area'>
          {
            isLoading &&
            <div className='loading'>Loading puzzle...</div>
          }
          {
            puzzle.length > 0 &&
            <Puzzle
              inputCell={inputCell}
              puzzle={puzzle}
              selectedClue={selectedClue}
              selectedClueText={this.state.clues[selectedClue.direction].find(c => c.number === selectedClue.number).text}
              selectInputCell={this.handleCellClick}
            />
          }

          {
            this.directions.map((direction, i) => (
              <Clues
                key={`${i}-${direction}`}
                clues={clues[direction]}
                direction={direction}
                selectedClue={selectedClue}
                handleClick={this.selectClue}
              />
            ))
          }
        </div>

        {
          this.state.isModalVisible &&
          ReactDOM.createPortal(
            <Modal
              date={this.state.date}
              handleClick={this.toggleModal}
              handleChange={this.selectDate}
            />
            , document.getElementById('modalRoot'))
        }
      </div>
    )
  }
}

export default App
