import generateSelectedClass from './generateSelectedClass'

let expected

describe('generateSelectedClass', () => {
  describe('should return " selected"', () => {
    it('when selectedClue and clue are matching', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { direction: 'test', number: 666 }
      const actual = generateSelectedClass(selectedClue, clue)
      const expected = ' selected'

      expect(actual).toBe(expected)
    })
  })

  describe('should return empty string', () => {
    beforeAll(() => (expected = ''))

    it('when both direction and number are different', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { direction: 'INVALID', number: 1 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when directions are different', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { direction: 'INVALID', number: 666 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when numbers are different', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { direction: 'test', number: 1 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when selectedClue is missing direction', () => {
      const selectedClue = { number: 666 }
      const clue = { direction: 'test', number: 666 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when selectedClue is missing number', () => {
      const selectedClue = { direction: 'test' }
      const clue = { direction: 'test', number: 666 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when clue is missing direction', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { number: 666 }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })

    it('when clue is missing number', () => {
      const selectedClue = { direction: 'test', number: 666 }
      const clue = { direction: 'test' }
      const actual = generateSelectedClass(selectedClue, clue)

      expect(actual).toBe(expected)
    })
  })
})
