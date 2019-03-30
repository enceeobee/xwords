// DEPRECATED

import { BLOCK, EMPTY } from '../constants'

// TODO - We can strip out the skipping shit in here, and delegate
// that to the step/jump functions

// TODO - this will become the 'skip' function of the 'movement' suite

function findNextInputCell (puzzle, inputCell, direction, doSkipLetters = true) {
  const totalCells = puzzle.length * puzzle[0].length
  const searchFunction = getSearchFunction(direction)

  let [row, col] = inputCell
  let loopCount = 0

  while (loopCount < totalCells) {
    loopCount++

    [row, col] = searchFunction(row, col, puzzle)

    if (!doSkipLetters && puzzle[row][col].input !== BLOCK) break
    if (puzzle[row][col].input === EMPTY) break
  }

  return [row, col]
}

function getSearchFunction (direction) {
  switch (direction) {
    case 'up':
      return getNextCellUp
    case 'right':
      return getNextCellRight
    case 'left':
      return getNextCellLeft
    case 'down':
    default:
      return getNextCellDown
  }
}

function getNextCellUp (row, col, puzzle) {
  if (row > 0) return [row - 1, col]

  return [puzzle.length - 1, col < puzzle[0].length - 1 ? col + 1 : 0]
}

function getNextCellRight (row, col, puzzle) {
  if (col < puzzle[0].length - 1) return [row, col + 1]

  return [(row < puzzle.length - 1) ? row + 1 : 0, 0]
}

function getNextCellLeft (row, col, puzzle) {
  if (col > 0) return [row, col - 1]

  return [(row > 0) ? row - 1 : puzzle.length - 1, puzzle[0].length - 1]
}

function getNextCellDown (row, col, puzzle) {
  if (row < puzzle.length - 1) return [row + 1, col]

  return [0, col < puzzle[0].length - 1 ? col + 1 : 0]
}

export default findNextInputCell
