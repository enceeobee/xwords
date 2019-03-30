import clonePuzzle from './clonePuzzle'
import { EMPTY } from '../constants'

describe('clonePuzzle', () => {
  it('should maintain data', () => {
    const originalPuzzle = [
      [{ input: EMPTY, value: 'a' }, { input: 'b', value: 'c' }],
      [{ input: 'd', value: 'e' }, { input: EMPTY, value: 'f' }]
    ]
    const actual = clonePuzzle(originalPuzzle)

    expect(actual).toEqual(originalPuzzle)
  })

  it('should not mutate input array', () => {
    const originalPuzzle = [
      [{ input: EMPTY, value: 'a' }, { input: 'b', value: 'c' }],
      [{ input: 'd', value: 'e' }, { input: EMPTY, value: 'f' }]
    ]
    const actual = clonePuzzle(originalPuzzle)

    originalPuzzle[0].input = 'fooled you!'

    expect(actual).not.toEqual(originalPuzzle)
  })
})
