export function moveUp (row, col, puzzle) {
  const move = (r, predicate) => {
    if (r <= 0) return [row, col]
    if (predicate(r)) return [r - 1, col]

    return move(r - 1, predicate)
  }

  return move
}

export function moveRight (row, col, puzzle) {
  const move = (c, predicate) => {
    if (c >= puzzle[0].length - 1) return [row, col]
    if (predicate(c)) return [row, c + 1]
    return move(c + 1, predicate)
  }

  return move
}

export function moveLeft (row, col, puzzle) {
  const move = (c, predicate) => {
    if (c <= 0) return [row, col]
    if (predicate(c)) return [row, c - 1]
    return move(c - 1, predicate)
  }

  return move
}

export function moveDown (row, col, puzzle) {
  const move = (r, predicate) => {
    if (r >= puzzle.length - 1) return [row, col]
    if (predicate(r)) return [r + 1, col]
    return move(r + 1, predicate)
  }

  return move
}
