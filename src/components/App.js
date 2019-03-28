import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Calendar from 'react-calendar'

import Clue from './Clue'
import Puzzle from './Puzzle'

import clonePuzzle from '../lib/clonePuzzle'
import constructPuzzle from '../lib/constructPuzzle'
import normalizeClues from '../lib/normalizeClues'
import checkIsWinner from '../lib/checkIsWinner'
import findNextInputCell from '../lib/findNextInputCell'

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
        direction: 'across'
      }
    }

    this.directions = ['across', 'down']
  }

  componentDidMount () {
    this.loadPuzzle()
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.inputCharacter, false)
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  handleKeyDown (event) {
    if (event.code === 'Space') event.preventDefault()
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
    const across = normalizeClues(clues.across, 'across')
    const down = normalizeClues(clues.down, 'down')

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
      inputCell: { ...this.state.numberCoords[number] }
    }))
  }

  inputCharacter = (event) => {
    // TODO - arrow keys(?)

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      return this.inputLetter(event.key.toUpperCase())
    }

    switch (event.code) {
      case 'Space': {
        return this.selectInputCell([...this.state.inputCell])
      }
      case 'Backspace': {
        // Clear the current cell ✅
        // Find the next cell 'back'
        // Make 'last cell' input cell
        // Update selected clue
        const puzzle = clonePuzzle(this.state.puzzle)
        const [row, col] = this.state.inputCell

        puzzle[row][col].input = ''

        return this.setState(() => ({ puzzle }))
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

  inputLetter = (letter) => {
    // Add it to the puzzle
    // TODO - is there not a better way to do this???
    // const puzzle = this.state.puzzle.map(r => r.map(c => ({ ...c })))
    const puzzle = clonePuzzle(this.state.puzzle)
    const { inputCell, selectedClue } = this.state
    const [row, col] = inputCell

    puzzle[row][col].input = letter

    this.setState(() => ({ puzzle }), () => {
      if (checkIsWinner(this.state.puzzle)) {
        alert('TODO - YOU ARE A WINNER')
      }

      // Move input cell in proper direction
      const nextInputCell = findNextInputCell(this.state.puzzle, inputCell, selectedClue.direction)
      const [row, col] = nextInputCell
      const nextSelectedClueNumber = puzzle[row][col].clues[selectedClue.direction]

      this.setState(() => ({
        inputCell: nextInputCell,
        selectedClue: { ...selectedClue, number: nextSelectedClueNumber }
      }))
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
