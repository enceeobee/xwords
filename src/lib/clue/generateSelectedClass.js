function generateSelectedClass (selectedClue, clue) {
  if (!selectedClue.direction || !selectedClue.number) {
    return ''
  }

  if (selectedClue.direction !== clue.direction || selectedClue.number !== clue.number) {
    return ''
  }

  return ' selected'
}

export default generateSelectedClass
