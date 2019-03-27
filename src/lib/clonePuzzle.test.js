import clonePuzzle from './clonePuzzle'

describe('clonePuzzle', () => {
  it('should maintain data', () => {
    const originalPuzzle = [
      [{ input: '', value: 'a' }, { input: 'b', value: 'c' }],
      [{ input: 'd', value: 'e' }, { input: '', value: 'f' }]
    ]
    const actual = clonePuzzle(originalPuzzle)

    expect(actual).toEqual(originalPuzzle)
  })

  it('should not mutate input array', () => {
    const originalPuzzle = [
      [{ input: '', value: 'a' }, { input: 'b', value: 'c' }],
      [{ input: 'd', value: 'e' }, { input: '', value: 'f' }]
    ]
    const actual = clonePuzzle(originalPuzzle)

    originalPuzzle[0].input = 'fooled you!'

    expect(actual).not.toEqual(originalPuzzle)
  })
})
