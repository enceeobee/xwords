import skip from './skip'
import { BLOCK, EMPTY } from '../constants'

let direction

// Skip is primarily used for typing letters, which is why we currently
// only test the 'right' and 'down' directions.
describe('skip finds the next empty cell', () => {
  // describe('up', () => {
  //   beforeAll(() => (direction = 'up'))
  //   it('skips over cells with input', () => {
  //     const puzzle = [
  //       [{ input: EMPTY, value: 'a' }],
  //       [{ input: 'b', value: 'c' }],
  //       [{ input: 'd', value: 'e' }],
  //       [{ input: EMPTY, value: 'f' }],
  //       [{ input: 'g', value: 'h' }]
  //     ]
  //     const startCell = [0, 3]
  //     const expected = [0, 0]
  //     const actual = skip(puzzle, startCell, direction)

  //     expect(actual).toEqual(expected)
  //   })

  //   it('skips over empty cells', () => {
  //     const puzzle = [
  //       [{ input: EMPTY, value: 'a' }],
  //       [{ input: BLOCK, value: BLOCK }],
  //       [{ input: BLOCK, value: BLOCK }],
  //       [{ input: EMPTY, value: 'f' }],
  //       [{ input: 'g', value: 'h' }]
  //     ]
  //     const startCell = [0, 3]
  //     const expected = [0, 0]
  //     const actual = skip(puzzle, startCell, direction)

  //     expect(actual).toEqual(expected)
  //   })

  //   it('stops when it reaches the end of the puzzle', () => {
  //     const puzzle = [
  //       [{ input: 'a', value: 'a' }],
  //       [{ input: BLOCK, value: BLOCK }],
  //       [{ input: BLOCK, value: BLOCK }],
  //       [{ input: 'e', value: 'f' }],
  //       [{ input: 'g', value: 'h' }]
  //     ]
  //     const startCell = [0, 3]
  //     const expected = [0, 0]
  //     const actual = skip(puzzle, startCell, direction)

  //     expect(actual).toEqual(expected)
  //   })
  // })

  describe('right', () => {
    beforeAll(() => (direction = 'right'))
    it('skips over cells with input', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: 'c', value: 'c' },
          { input: EMPTY, value: 'y' },
          { input: EMPTY, value: 'z' }]
      ]
      const startCell = [0, 0]
      const expected = [0, 3]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('skips over blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: BLOCK, value: BLOCK },
          { input: EMPTY, value: EMPTY },
          { input: EMPTY, value: EMPTY }]
      ]
      const startCell = [0, 0]
      const expected = [0, 3]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    // it('advances one cell when there are no more empty cells', () => {
    //   const puzzle = [
    //     [{ input: 'a', value: 'a' },
    //       { input: 'b', value: 'b' },
    //       { input: 'x', value: 'x' },
    //       { input: BLOCK, value: BLOCK },
    //       { input: 'z', value: 'z' }]
    //   ]
    //   const startCell = [0, 1]
    //   const expected = [0, 2]
    //   const actual = skip(puzzle, startCell, direction)

    //   expect(actual).toEqual(expected)
    // })

    it('stops when it reaches the end of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' },
          { input: 'b', value: 'b' },
          { input: 'x', value: 'x' },
          { input: 'y', value: 'y' },
          { input: 'z', value: 'z' }]
      ]
      const startCell = [0, 4]
      const expected = [0, 4]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })

  describe('down', () => {
    beforeAll(() => (direction = 'down'))
    it('skips over cells with input', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: 'b', value: 'b' }],
        [{ input: 'c', value: 'c' }],
        [{ input: EMPTY, value: 'y' }],
        [{ input: EMPTY, value: 'z' }]
      ]
      const startCell = [0, 0]
      const expected = [3, 0]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    it('skips blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: 'b', value: 'b' }],
        [{ input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: EMPTY }],
        [{ input: EMPTY, value: EMPTY }]
      ]
      const startCell = [0, 0]
      const expected = [3, 0]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })

    // it('advances one cell when there are no more empty cells', () => {
    //   const puzzle = [
    //     [{ input: 'a', value: 'a' }],
    //     [{ input: 'b', value: 'b' }],
    //     [{ input: 'x', value: 'x' }],
    //     [{ input: BLOCK, value: BLOCK }],
    //     [{ input: 'z', value: 'z' }]
    //   ]
    //   const startCell = [0, 1]
    //   const expected = [0, 2]
    //   const actual = skip(puzzle, startCell, direction)

    //   expect(actual).toEqual(expected)
    // })

    it('stops when it reaches the end of the puzzle', () => {
      const puzzle = [
        [{ input: 'a', value: 'a' }],
        [{ input: 'b', value: 'b' }],
        [{ input: 'x', value: 'x' }],
        [{ input: 'y', value: 'y' }],
        [{ input: 'z', value: 'z' }]
      ]
      const startCell = [4, 0]
      const expected = [4, 0]
      const actual = skip(puzzle, startCell, direction)

      expect(actual).toEqual(expected)
    })
  })
})
