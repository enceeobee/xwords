function findNextInputCell (puzzle, inputCell, direction) {
  const totalCells = puzzle.length * puzzle[0].length
  let [row, col] = inputCell
  let loopCount = 0

  while (loopCount < totalCells) {
    loopCount++

    [row, col] = (direction === 'across')
      ? getNextCellAcross(row, col, puzzle)
      : getNextCellDown(row, col, puzzle)

    if (puzzle[row][col].input === '') break
  }

  return [row, col]
}

function getNextCellAcross (row, col, puzzle) {
  if (col < puzzle[0].length - 1) return [row, col + 1]

  return [(row < puzzle.length - 1) ? row + 1 : 0, 0]
}

function getNextCellDown (row, col, puzzle) {
  if (row < puzzle.length - 1) return [row + 1, col]

  return [0, col < puzzle[0].length - 1 ? col + 1 : 0]
}

export default findNextInputCell
