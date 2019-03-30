import { moveRight, moveDown } from './move'
import { EMPTY } from '../constants'

function skip (puzzle, startCell, direction) {
  const [row, col] = startCell

  return getSkipFunction(direction)(row, col, puzzle)
}

function getSkipFunction (direction) {
  switch (direction) {
    case 'right':
      return skipRight
    case 'down':
    default:
      return skipDown
  }
}

function skipRight (row, col, puzzle) {
  const moveRightFn = moveRight(row, col, puzzle)
  return moveRightFn(col, c => puzzle[row][c + 1].input === EMPTY)
}

function skipDown (row, col, puzzle) {
  const moveDownFn = moveDown(row, col, puzzle)
  return moveDownFn(row, r => puzzle[r + 1][col].input === EMPTY)
}

export default skip
