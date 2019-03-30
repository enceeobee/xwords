import { moveUp, moveRight, moveLeft, moveDown } from './move'
import { BLOCK } from '../constants'

function step (puzzle, startCell, direction) {
  const [row, col] = startCell

  return getStepFunction(direction)(row, col, puzzle)
}

function getStepFunction (direction) {
  switch (direction) {
    case 'up':
      return stepUp
    case 'right':
      return stepRight
    case 'left':
      return stepLeft
    case 'down':
    default:
      return stepDown
  }
}

function stepUp (row, col, puzzle) {
  const moveUpFn = moveUp(row, col, puzzle)
  return moveUpFn(row, r => puzzle[r - 1][col].value !== BLOCK)
}

function stepRight (row, col, puzzle) {
  const moveRightFn = moveRight(row, col, puzzle)
  return moveRightFn(col, c => puzzle[row][c + 1].value !== BLOCK)
}

function stepLeft (row, col, puzzle) {
  const moveLeftFn = moveLeft(row, col, puzzle)
  return moveLeftFn(col, c => puzzle[row][c - 1].value !== BLOCK)
}

function stepDown (row, col, puzzle) {
  const moveDownFn = moveDown(row, col, puzzle)
  return moveDownFn(row, r => puzzle[r + 1][col].value !== BLOCK)
}

export default step
