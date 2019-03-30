/**
 * Jump to the next clue
 */
import { moveUp, moveRight, moveLeft, moveDown } from './move'
import { BLOCK, EMPTY } from '../constants'

function jump (puzzle, startCell, direction) {
  const [row, col] = startCell

  return getStepFunction(direction)(row, col, puzzle)
}

function getStepFunction (direction) {
  switch (direction) {
    case 'up':
      return jumpUp
    case 'right':
      return jumpRight
    case 'left':
      return jumpLeft
    case 'down':
    default:
      return jumpDown
  }
}

function jumpUp (row, col, puzzle) {
  const moveUpFn = moveUp(row, col, puzzle)
  let blockCount = 0
  let topBlankCellRow = row

  const determineStop = (r) => {
    if (puzzle[r - 1][col].value === BLOCK && ++blockCount > 1) {
      return true
    }

    if (puzzle[r - 1][col].input === EMPTY && r - 1 < topBlankCellRow) {
      topBlankCellRow = r - 1
      return false
    }

    return false
  }

  moveUpFn(row, determineStop)

  return [topBlankCellRow, col]
}

function jumpRight (row, col, puzzle) {
  const moveRightFn = moveRight(row, col, puzzle)
  let hasEncounteredBlock = false

  const determineStop = (c) => {
    if (puzzle[row][c + 1].value === BLOCK) hasEncounteredBlock = true
    return hasEncounteredBlock && puzzle[row][c + 1].input === EMPTY
  }

  return moveRightFn(col, determineStop)
}

function jumpLeft (row, col, puzzle) {
  const moveLeftFn = moveLeft(row, col, puzzle)
  let blockCount = 0
  let leftmostBlankColumn = col

  const determineStop = (c) => {
    if (puzzle[row][c - 1].value === BLOCK && ++blockCount > 1) {
      return true
    }

    if (puzzle[row][c - 1].input === EMPTY && c - 1 < leftmostBlankColumn) {
      leftmostBlankColumn = c - 1
      return false
    }

    return false
  }

  moveLeftFn(col, determineStop)

  return [row, leftmostBlankColumn]
}

function jumpDown (row, col, puzzle) {
  const moveDownFn = moveDown(row, col, puzzle)
  let hasEncounteredBlock = false
  const determineStop = (r) => {
    if (puzzle[r + 1][col].value === BLOCK) hasEncounteredBlock = true
    return hasEncounteredBlock && puzzle[r + 1][col].input === EMPTY
  }

  return moveDownFn(row, determineStop)
}

export default jump
