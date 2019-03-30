import checkIsWinner from './checkIsWinner'

describe('checkIsWinner', () => {
  describe('returns true', () => {
    it('when puzzle is solved', () => {
      const puzzle = [
        [{ input: 'n', value: 'n' }, { input: 'a', value: 'a' }],
        [{ input: 't', value: 't' }, { input: 'e', value: 'e' }]
      ]
      const expected = true
      const actual = checkIsWinner(puzzle)

      expect(actual).toBe(expected)
    })

    it('when puzzle is solved with different cases', () => {
      const puzzle = [
        [{ input: 'N', value: 'n' }, { input: 'a', value: 'a' }],
        [{ input: 'T', value: 't' }, { input: 'e', value: 'e' }]
      ]
      const expected = true
      const actual = checkIsWinner(puzzle)

      expect(actual).toBe(expected)
    })
  })

  describe('returns false', () => {
    const puzzle = [
      [{ input: 'n', value: 'n' }, { input: 'a', value: 'a' }],
      [{ input: 't', value: 't' }, { input: 'zzzzzzzz', value: 'e' }]
    ]
    const expected = false
    const actual = checkIsWinner(puzzle)

    expect(actual).toBe(expected)
  })
})
