import jump from './jump'
import { BLOCK, EMPTY } from '../constants'

let direction

describe('jump', () => {
  describe('up', () => {
    beforeAll(() => (direction = 'up'))

    it('should return top available cell in clue above closest block', () => {
      let puzzle = [
        [{ input: 't', value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      let startCell = [6, 0]
      let expected = [2, 0]
      let actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      startCell = [6, 0]
      expected = [1, 0]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      // Should end in the first cell
      puzzle = [
        [{ input: EMPTY, value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      startCell = [6, 0]
      expected = [0, 0]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      // Should jump multiple blocks
      puzzle = [
        [{ input: EMPTY, value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      startCell = [6, 0]
      expected = [0, 0]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if at top of puzzle', () => {
      const puzzle = [
        [{ input: 't', value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      const startCell = [1, 0]
      const expected = [1, 0]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if previous clue is already filled in', () => {
      const puzzle = [
        [{ input: 't', value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'x', value: 'b' }],
        [{ input: 'x', value: 'c' }],
        [{ input: 'x', value: 'd' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'x', value: 'd' }],
        [{ input: 'x', value: 'd' }]
      ]
      const startCell = [9, 0]
      const expected = [9, 0]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('right', () => {
    beforeAll(() => (direction = 'right'))

    it('should return left-most available cell in clue to the right of closest block', () => {
      const puzzle = [
        [
          { input: EMPTY, value: 'x' },
          { input: 'a', value: 'x' },
          { input: 't', value: 'x' },
          { input: 'e', value: 'x' },
          { input: BLOCK, value: BLOCK },
          { input: EMPTY, value: 'x' },
          { input: EMPTY, value: 'x' },
          { input: 's', value: 'x' }
        ]
      ]
      const startCell = [0, 0]
      const expected = [0, 5]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if at right of puzzle', () => {
      const puzzle = [
        [
          { input: EMPTY, value: 'x' },
          { input: 'a', value: 'x' },
          { input: 't', value: 'x' },
          { input: 'e', value: 'x' },
          { input: BLOCK, value: BLOCK },
          { input: EMPTY, value: 'x' },
          { input: EMPTY, value: 'x' },
          { input: 's', value: 'x' }
        ]
      ]
      const startCell = [0, 6]
      const expected = [0, 6]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('down', () => {
    beforeAll(() => (direction = 'down'))
    it('should return top-most available cell in clue below closest block', () => {
      let puzzle = [
        [{ input: 't', value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      let startCell = [1, 0]
      let expected = [4, 0]
      let actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      // Should end in the first cell
      puzzle = [
        [{ input: EMPTY, value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'x', value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      startCell = [1, 0]
      expected = [5, 0]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if at bottom of puzzle', () => {
      const puzzle = [
        [{ input: 't', value: 't' }],
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'b' }],
        [{ input: EMPTY, value: 'c' }],
        [{ input: EMPTY, value: 'd' }]
      ]
      const startCell = [5, 0]
      const expected = [5, 0]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('left', () => {
    beforeAll(() => (direction = 'left'))

    it('should return left-most available cell in clue to the left of closest block', () => {
      let puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: EMPTY, value: 'b' },
          { input: 'x', value: 'c' },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: EMPTY, value: EMPTY }
        ]
      ]
      let startCell = [0, 5]
      let expected = [0, 1]
      let actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: EMPTY, value: 'b' },
          { input: EMPTY, value: 'b' },
          { input: EMPTY, value: 'b' },
          { input: 'x', value: 'c' },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: EMPTY, value: EMPTY }
        ]
      ]
      startCell = [0, 7]
      expected = [0, 1]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: 'c', value: 'b' },
          { input: BLOCK, value: BLOCK },
          { input: EMPTY, value: EMPTY },
          { input: EMPTY, value: EMPTY },
          { input: EMPTY, value: EMPTY },
          { input: BLOCK, value: BLOCK },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: EMPTY, value: EMPTY }
        ]
      ]
      startCell = [0, 9]
      expected = [0, 4]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: 'c', value: 'b' },
          { input: BLOCK, value: BLOCK },
          { input: EMPTY, value: EMPTY },
          { input: EMPTY, value: EMPTY },
          { input: EMPTY, value: EMPTY },
          { input: BLOCK, value: BLOCK },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: EMPTY, value: EMPTY },
          { input: 'd', value: 'e' }
        ]
      ]
      startCell = [0, 11]
      expected = [0, 4]
      actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if at left of puzzle', () => {
      const puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: EMPTY, value: 'b' },
          { input: 'x', value: 'c' },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: EMPTY, value: EMPTY }
        ]
      ]
      const startCell = [0, 1]
      const expected = [0, 1]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should retain position if no moves available', () => {
      const puzzle = [
        [
          { input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: EMPTY, value: 'c' },
          { input: BLOCK, value: BLOCK },
          { input: 'd', value: 'e' },
          { input: 'f', value: 'f' },
          { input: BLOCK, value: BLOCK },
          { input: 'g', value: 'g' }
        ]
      ]
      const startCell = [0, 7]
      const expected = [0, 7]
      const actual = jump(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })
})
