function checkIsWinner (puzzle) {
  return puzzle.every((row) => row.every(cell => cell.input.toUpperCase() === cell.value.toUpperCase()))
}

export default checkIsWinner
