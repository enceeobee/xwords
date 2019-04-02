import determineIfFull from './determineIfFull'
import { BLOCK, EMPTY } from '../constants'

describe('determineIfFull', () => {
  describe('should return true', () => {
    it('when no empty cells remain', () => {
      const puzzle = [
        [{ input: 'a' }, { input: 'a' }, { input: 'a' }, { input: 'a' }, { input: 'a' }],
        [{ input: BLOCK, value: BLOCK }, { input: 'a' }, { input: 'a' }, { input: BLOCK, value: BLOCK }, { input: 'a' }],
        [{ input: 'a' }, { input: 'a' }, { input: BLOCK, value: BLOCK }, { input: 'a' }, { input: 'a' }]
      ]
      const actual = determineIfFull(puzzle)
      const expected = true

      expect(actual).toBe(expected)
    })
  })

  describe('should return false', () => {
    it('when there is an empty cell', () => {
      const puzzle = [
        [{ input: 'a' }, { input: 'a' }, { input: 'a' }, { input: 'a' }, { input: 'a' }],
        [{ input: BLOCK, value: BLOCK }, { input: 'a' }, { input: 'a' }, { input: BLOCK, value: BLOCK }, { input: 'a' }],
        [{ input: 'a' }, { input: 'a' }, { input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'a' }, { input: 'a' }]
      ]
      const actual = determineIfFull(puzzle)
      const expected = false

      expect(actual).toBe(expected)
    })
  })
})
