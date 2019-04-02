function normalizeClues (clues, direction) {
  let number

  const normalizedClues = clues.map((clue) => {
    number = parseInt(clue, 10)

    return {
      direction,
      number,
      text: clue.replace(`${number}. `, '').replace(/&quot;/g, '"')
    }
  })

  return normalizedClues
}

export default normalizeClues
