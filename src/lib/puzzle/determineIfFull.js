import { EMPTY } from '../constants'

function determineIfFull (puzzle) {
  for (let r = 0; r < puzzle.length; r++) {
    for (let c = 0; c < puzzle[0].length; c++) {
      if (puzzle[r][c].input === EMPTY) return false
    }
  }

  return true
}

export default determineIfFull
