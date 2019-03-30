import step from './step'
import { BLOCK, EMPTY } from '../constants'

let direction

describe('step moves one cell in a given direction', () => {
  describe('up', () => {
    beforeAll(() => (direction = 'up'))

    describe('should move to adjacent cell', () => {
      it('when adjacent cell is empty', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }],
          [{ input: EMPTY, value: EMPTY }],
          [{ input: 'a', value: 'a' }]
        ]
        const startCell = [2, 0]
        const expected = [1, 0]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })

      it('when adjacent cell has input', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }],
          [{ input: EMPTY, value: EMPTY }],
          [{ input: 'a', value: 'a' }]
        ]
        const startCell = [1, 0]
        const expected = [0, 0]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    it('should skip over blocks', () => {
      let puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'a', value: 'a' }]
      ]
      let startCell = [2, 0]
      let expected = [0, 0]
      let actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'a', value: 'a' }]
      ]
      startCell = [3, 0]
      expected = [0, 0]
      actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should stop when reaching the top of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: EMPTY, value: EMPTY }],
        [{ input: 'a', value: 'a' }]
      ]
      const startCell = [0, 0]
      const expected = [0, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should remain in place if no moves are available', () => {
      const puzzle = [
        [{ input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'a', value: 'a' }]
      ]
      const startCell = [2, 0]
      const expected = [2, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('right', () => {
    beforeAll(() => (direction = 'right'))

    describe('should move to adjacent cell', () => {
      it('when adjacent cell is empty', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'c' }, { input: 'd', value: 'e' }]
        ]
        const startCell = [0, 0]
        const expected = [0, 1]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })

      it('when adjacent cell has input', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: 'c', value: 'c' }, { input: 'd', value: 'e' }]
        ]
        const startCell = [0, 0]
        const expected = [0, 1]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    it('should skip over blocks', () => {
      let puzzle = [
        [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }]
      ]
      let startCell = [0, 0]
      let expected = [0, 2]
      let actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }]
      ]
      startCell = [0, 0]
      expected = [0, 3]
      actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should stop when reaching the end of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: 'c', value: 'c' }, { input: 'd', value: 'e' }]
      ]
      const startCell = [0, 2]
      const expected = [0, 2]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should remain in place if no moves are available', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
      ]
      const startCell = [0, 0]
      const expected = [0, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('down', () => {
    beforeAll(() => (direction = 'down'))

    describe('should move to adjacent cell', () => {
      it('when adjacent cell is empty', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }],
          [{ input: EMPTY, value: EMPTY }],
          [{ input: 'c', value: 'd' }]
        ]
        const startCell = [0, 0]
        const expected = [1, 0]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })

      it('when adjacent cell has input', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }],
          [{ input: 'b', value: 'b' }],
          [{ input: 'c', value: 'd' }]
        ]
        const startCell = [0, 0]
        const expected = [1, 0]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    it('should skip over blocks', () => {
      let puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'c', value: 'd' }]
      ]
      let startCell = [0, 0]
      let expected = [2, 0]
      let actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: 'c', value: 'd' }]
      ]
      startCell = [0, 0]
      expected = [3, 0]
      actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should stop when reaching the end of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: 'b', value: 'b' }],
        [{ input: 'c', value: 'd' }]
      ]
      const startCell = [2, 0]
      const expected = [2, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should remain in place if no moves are available', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }]
      ]
      const startCell = [0, 0]
      const expected = [0, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('left', () => {
    beforeAll(() => (direction = 'left'))

    describe('should move to adjacent cell', () => {
      it('when adjacent cell is empty', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }, { input: EMPTY, value: EMPTY }, { input: 'b', value: 'c' }]
        ]
        const startCell = [0, 2]
        const expected = [0, 1]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })

      it('when adjacent cell has input', () => {
        const puzzle = [
          [{ input: 'a', value: 'a' }, { input: 'x', value: 'x' }, { input: 'b', value: 'c' }]
        ]
        const startCell = [0, 2]
        const expected = [0, 1]
        const actual = step(puzzle, startCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    it('should skip over blocks', () => {
      let puzzle = [
        [{ input: 'a', value: 'a' }, { input: BLOCK, value: BLOCK }, { input: 'b', value: 'c' }]
      ]
      let startCell = [0, 2]
      let expected = [0, 0]
      let actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)

      puzzle = [
        [{ input: 'a', value: 'a' }, { input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }, { input: 'b', value: 'c' }]
      ]
      startCell = [0, 3]
      expected = [0, 0]
      actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should stop when reaching the end of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }, { input: 'x', value: 'x' }, { input: 'b', value: 'c' }]
      ]
      const startCell = [0, 0]
      const expected = [0, 0]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should remain in place if no moves are available', () => {
      const puzzle = [
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }, { input: 'b', value: 'c' }]
      ]
      const startCell = [0, 2]
      const expected = [0, 2]
      const actual = step(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })
})
