function clonePuzzle (puzzle) {
  return puzzle.map(r => r.map(c => ({ ...c })))
}

export default clonePuzzle
