import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Calendar from 'react-calendar'

import Clue from './Clue'
import Puzzle from './Puzzle'

import clonePuzzle from '../lib/puzzle/clonePuzzle'
import constructPuzzle from '../lib/puzzle/constructPuzzle'
import normalizeClues from '../lib/normalizeClues'
import checkIsWinner from '../lib/puzzle/checkIsWinner'
import jump from '../lib/cell/jump'
import skip from '../lib/cell/skip'
import step from '../lib/cell/step'
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

    this.state = {
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

    this.directions = [ACROSS, DOWN]
  }

  componentDidMount () {
    this.loadPuzzle()
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.inputCharacter, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
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

    this.setState(() => ({ isLoading: true, puzzle: [], rawPuzzle: {}, clues: { across: [], down: [] } }))

    const { date } = this.state
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

  inputCharacter = (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      return this.inputLetter(event.key.toUpperCase())
    }

    switch (event.code) {
      case 'Space': {
        return this.selectInputCell([...this.state.inputCell])
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

      if (!isSameAxis) {
        [nextRow, nextCol] = step(puzzle, inputCell, arrowDirection)
      } else {
        [nextRow, nextCol] = jump(puzzle, inputCell, arrowDirection)
      }
    } else {
      const doChangeDirection = (
        ([LEFT, RIGHT].includes(arrowDirection) && selectedClue.direction === DOWN) ||
        ([UP, DOWN].includes(arrowDirection) && selectedClue.direction === ACROSS)
      )

      if (doChangeDirection) {
        return this.selectInputCell([...inputCell])
      }

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

    puzzle[row][col].input = letter

    this.setState(() => ({ puzzle }), () => {
      if (checkIsWinner(this.state.puzzle)) {
        alert('TODO - YOU ARE A WINNER')
      }

      const nextCell = selectedClue.direction === ACROSS ? puzzle[row][col + 1] : puzzle[row + 1][col]
      const isEndOfClue = !nextCell || nextCell.value === BLOCK

      if (isEndOfClue) return false

      const searchDirection = selectedClue.direction === DOWN ? DOWN : 'right'
      const [nextRow, nextCol] = skip(this.state.puzzle, inputCell, searchDirection)

      this.selectInputCell([nextRow, nextCol])
    })
  }

  selectInputCell = (selectedInputCell) => {
    const [row, col] = selectedInputCell
    let updatedSelectedDirection = this.state.selectedClue.direction
    let updatedSelectedNumber = this.state.puzzle[row][col].clues[this.state.selectedClue.direction]

    if (row === this.state.inputCell[0] && col === this.state.inputCell[1]) {
      updatedSelectedDirection = updatedSelectedDirection === this.directions[0] ? this.directions[1] : this.directions[0]

      if (this.state.puzzle[row][col].clues[updatedSelectedDirection] !== updatedSelectedNumber) {
        updatedSelectedNumber = this.state.puzzle[row][col].clues[updatedSelectedDirection]
      }
    }

    const updatedSelectedClue = {
      direction: updatedSelectedDirection,
      number: updatedSelectedNumber
    }

    this.setState(() => ({ inputCell: selectedInputCell, selectedClue: updatedSelectedClue }))
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  render () {
    const { clues, date, puzzle, inputCell, isLoading, rawPuzzle, selectedClue } = this.state

    return (
      <div className='App'>
        <div className='header'>
          <div className='title'>
            <h1>{rawPuzzle.hastitle ? rawPuzzle.title : 'Daily Crossword'}</h1>
          </div>
          <p className='date-link' onClick={() => this.setState({ isModalVisible: true })}>
            {`${date.toLocaleString('en-us', { weekday: 'long' })}, ${date.toLocaleString('en-us', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`}
          </p>
          <p>By {rawPuzzle.author}</p>
        </div>

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
              selectInputCell={this.selectInputCell}
            />
          }

          {
            this.directions.map((direction) => (
              <div key={`direction-${direction}`} className={direction}>
                <h4>{direction[0].toUpperCase() + direction.slice(1)}</h4>
                <ul className='clues'>
                  {
                    clues[direction].map((clue, i) => (
                      <Clue
                        key={i}
                        text={clue.text}
                        isSelected={selectedClue.direction === direction && selectedClue.number === clue.number}
                        direction={direction}
                        number={clue.number}
                        selectClue={this.selectClue}
                      />
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>

        {
          this.state.isModalVisible &&
          ReactDOM.createPortal(
            <div className='modal-container'>
              <div
                className='modal-background'
                onClick={this.toggleModal}
              />
              <div className='calendar-modal'>
                <Calendar
                  calendarType='US'
                  onChange={this.selectDate}
                  value={this.state.date}
                  maxDate={new Date()}
                />
              </div>
            </div>
            , document.getElementById('modalRoot'))
        }
      </div>
    )
  }
}

export default App
