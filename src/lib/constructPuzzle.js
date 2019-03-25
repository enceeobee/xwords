function constructPuzzle (grid, gridnums, size) {
  const numberCoords = {}
  const constructedPuzzle = []
  let gridIndex = 0
  let clueNumber
  let row
  let value

  for (let r = 0; r < size.rows; r++) {
    row = []

    for (let c = 0; c < size.cols; c++) {
      clueNumber = gridnums[gridIndex]
      value = grid[gridIndex]

      if (clueNumber > 0) {
        numberCoords[clueNumber] = [r, c]
      }

      row.push({
        clueNumber,
        value,
        input: (value === '.') ? value : ''
      })
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
