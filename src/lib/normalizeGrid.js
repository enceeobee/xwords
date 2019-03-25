// DEPRECATED

function normalizeGrid (grid, size) {
  const rows = []
  let gridIndex = 0

  for (let i = 0; i < size.rows; i++) {
    rows.push(grid.slice(gridIndex, gridIndex + size.rows))
    gridIndex += size.rows
  }

  return rows
}

export default normalizeGrid
