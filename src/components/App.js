import React, { Component } from 'react'

import Clue from './Clue'
import Puzzle from './Puzzle'

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
    this.setState(() => ({ isLoading: true }))

    fetch('http://localhost:3333/xword')
      .then(res => res.json())
      .then(body => {
        document.addEventListener('keyup', this.inputCharacter, false)

        this.setState(() => ({ isLoading: false, rawPuzzle: body }), this.arrangePuzzle)
      })
      .catch(e => {
        console.error(e)
        this.setState(() => ({ isLoading: false }))
      })
  }

  componentWillUnmount () {
    document.removeEventListener('keyup', this.inputCharacter, false)
  }

  arrangePuzzle = () => {
    const { clues, grid, gridnums, size } = this.state.rawPuzzle
    const { numberCoords, constructedPuzzle: puzzle } = constructPuzzle(grid, gridnums, size)
    const across = normalizeClues(clues.across, 'across')
    const down = normalizeClues(clues.down, 'down')

    this.setState(() => ({ puzzle, numberCoords, clues: { across, down } }))
  }

  selectClue = (number, direction) => {
    // TODO - update input cell
    this.setState(() => ({ selectedClue: { direction, number } }))
  }

  inputCharacter = (event) => {
    // Ensure event.key is a letter
    // TODO - allow other keys, e.g. space, backspace, numbers(?)
    if (event.keyCode < 65 || event.keyCode > 90) return false

    // Add it to the puzzle
    // TODO - is there not a better way to do this???
    const puzzle = this.state.puzzle.map(r => r.map(c => ({ ...c })))
    const [row, col] = this.state.inputCell

    puzzle[row][col].input = event.key.toUpperCase()

    this.setState(() => ({ puzzle }), () => {
      // Check if winner
      if (checkIsWinner(this.state.puzzle)) {
        console.log('TODO - YOU ARE A WINNER')
      }

      // Move input cell in proper direction
      const nextInputCell = findNextInputCell(this.state.puzzle, this.state.inputCell, this.state.selectedClue.direction)

      // TODO - Update selected clue if necessary

      this.setState(() => ({ inputCell: nextInputCell }))
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

  render () {
    const { clues, puzzle, inputCell, isLoading, rawPuzzle, selectedClue } = this.state

    return (
      <div className='App'>
        <div className='header'>
          <h1>{rawPuzzle.title}</h1>
          <div>By {rawPuzzle.author}</div>
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
      </div>
    )
  }
}

export default App
