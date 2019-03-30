import { BLOCK, EMPTY } from '../constants'


// TODO - unit test!!!


/**
 * We need to do the following things:
 *
 * 1. Transform the flat grid into a 2D array of rows and cells
 * 2. Assign outputNumbers to appropriate cells
 * 3. Assign the numbers to the clues to which the cell belongs
 *  - Each cell belongs to both an across clue and a down clue,
 *    we need to store that data for puzzle-clue-highlighting
 */
function constructPuzzle (grid, gridnums, size) {
  const numberCoords = {}
  const constructedPuzzle = []
  const colToDownNumberMap = {}

  let gridIndex = 0
  let cell
  let cellClueNumber
  let currentAcrossClueNumber
  let row
  let value

  for (let r = 0; r < size.rows; r++) {
    row = []

    for (let c = 0; c < size.cols; c++) {
      cellClueNumber = gridnums[gridIndex]
      value = grid[gridIndex]

      if (cellClueNumber > 0) {
        numberCoords[cellClueNumber] = [r, c]

        if (c === 0 || row[c - 1].value === BLOCK) {
          currentAcrossClueNumber = cellClueNumber
        }

        if (r === 0 || constructedPuzzle[r - 1][c].value === BLOCK) {
          colToDownNumberMap[c] = cellClueNumber
        }
      }

      cell = {
        cellClueNumber,
        value,
        // TODO - rename this?
        clues: {
          across: currentAcrossClueNumber,
          down: colToDownNumberMap[c]
        },
        input: (value === BLOCK) ? value : EMPTY
      }

      row.push(cell)
      gridIndex++
    }

    constructedPuzzle.push(row)
  }

  return {
    numberCoords,
    constructedPuzzle
  }
}

export default constructPuzzle
