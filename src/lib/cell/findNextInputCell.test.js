// DEPRECATED

import findNextInputCell from './findNextInputCell'
import { BLOCK, EMPTY } from '../constants'

let direction

describe('findNextInputCell', () => {
  describe('to the right', () => {
    beforeAll(() => (direction = 'right'))

    describe('regardless of skipping letters', () => {
      it('should move to cell immediately to the right', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }]
        ]
        const inputCell = [0, 0]
        const expected = [0, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip a block', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'd' }]
        ]
        const inputCell = [0, 0]
        const expected = [0, 2]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip >1 blocks', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK },
            { input: BLOCK, value: BLOCK },
            { input: EMPTY, value: 'd' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [0, 3]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip to next row when out of cells', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' }
          ],
          [
            { input: EMPTY, value: 'd' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip blocks to next row', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: EMPTY, value: 'd' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip to next row and skip blocks', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: BLOCK, value: BLOCK },
            { input: EMPTY, value: 'd' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    describe('not skipping letters', () => {
      it('should select a cell with input', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: 'c', value: 'd' },
            { input: EMPTY, value: 'f' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [0, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })

      it('should move even if board is full', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: 'c', value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [1, 0]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })
    })

    describe('skipping letters', () => {
      it('should skip filled cells', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: 'c', value: 'd' },
            { input: EMPTY, value: 'f' }
          ]
        ]
        const inputCell = [0, 0]
        const expected = [0, 2]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      // TODO - Should it? Figure this out and refactor if needed
      it('should wrap if the end of the board has been reached', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: EMPTY, value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [1, 1]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should remain in current cell if puzzle is full', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: 'c', value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [1, 0]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('to the left', () => {
    beforeAll(() => (direction = 'left'))

    describe('regardless of skipping letters', () => {
      it('should move to cell immediately to the left', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'd' }, { input: 'a', value: 'b' }]
        ]
        const inputCell = [0, 1]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip a block', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: BLOCK, value: BLOCK }, { input: 'c', value: 'd' }]
        ]
        const inputCell = [0, 2]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip >1 blocks', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' },
            { input: BLOCK, value: BLOCK },
            { input: BLOCK, value: BLOCK },
            { input: 'c', value: 'd' }
          ]
        ]
        const inputCell = [0, 3]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip to next row when out of cells', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' }
          ],
          [
            { input: 'c', value: 'd' }
          ]
        ]
        const inputCell = [1, 0]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip blocks to next row', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' }
          ],
          [
            { input: BLOCK, value: BLOCK },
            { input: 'c', value: 'd' }
          ]
        ]
        const inputCell = [1, 1]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip to next row and skip blocks', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: BLOCK, value: BLOCK },
            { input: 'c', value: 'd' }
          ]
        ]
        const inputCell = [1, 1]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    describe('not skipping letters', () => {
      it('should select a cell with input', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' },
            { input: 'c', value: 'd' },
            { input: 'e', value: 'f' }
          ]
        ]
        const inputCell = [0, 2]
        const expected = [0, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })

      it('should move even if the board is full', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: 'c', value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [1, 1]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })
    })

    describe('skipping letters', () => {
      it('should skip filled cells', () => {
        const puzzle = [
          [
            { input: EMPTY, value: 'b' },
            { input: 'c', value: 'd' },
            { input: 'e', value: 'f' }
          ]
        ]
        const inputCell = [0, 2]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      // TODO - should it?
      it('should wrap if the end of the board has been reached', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: 'c', value: 'd' }
          ],
          [
            { input: EMPTY, value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [0, 1]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should remain in current cell if puzzle is full', () => {
        const puzzle = [
          [
            { input: 'a', value: 'b' },
            { input: BLOCK, value: BLOCK }
          ],
          [
            { input: 'c', value: 'c' },
            { input: 'd', value: 'd' }
          ]
        ]
        const inputCell = [1, 1]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('above', () => {
    beforeAll(() => (direction = 'up'))

    describe('regardless of skipping letters', () => {
      it('should move to cell immediately above', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: EMPTY, value: 'd' }],
          [{ input: 'e', value: 'f' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [1, 0]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip a block', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: EMPTY, value: 'd' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
          [{ input: 'f', value: 'g' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [2, 0]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip >1 blocks', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: EMPTY, value: 'd' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
          [{ input: 'f', value: 'g' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [3, 0]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip blocks to next column', () => {
        const puzzle = [
          [{ input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'd' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
          [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'e' }]
        ]
        const inputCell = [2, 0]
        const expected = [2, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should skip to next column and skip blocks', () => {
        const puzzle = [
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'e' }],
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [2, 0]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })

    describe('not skipping letters', () => {
      it('should select a cell with input', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: 'g', value: 'g' }, { input: EMPTY, value: 'd' }]
        ]
        const inputCell = [1, 0]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })

      it('should move even if board is full', () => {
        // TODO - is this supposed to wrap?
        // const puzzle = [
        //   [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
        //   [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
        //   [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        // ]
        // let inputCell = [1, 1]
        // let expected = [1, 1]
        // let actual = findNextInputCell(puzzle, inputCell, direction, false)

        // expect(actual).toEqual(expected)

        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: 'c', value: 'c' }],
          [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        ]

        const inputCell = [1, 1]
        const expected = [0, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })
    })

    describe('skipping letters', () => {
      // TODO - Wait, I don't think this is true. If we've hit bottom, don't do nothin
      it('should skip to next column when out of cells', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: 'g', value: 'g' }, { input: EMPTY, value: 'd' }]
        ]
        const inputCell = [1, 0]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      // TODO - should it?
      it('should wrap if the end of the board has been reached', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [1, 1]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should remain in current cell if puzzle is full', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [1, 1]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('below', () => {
    beforeAll(() => (direction = 'down'))

    it('should move to cell immediately below', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
        [{ input: EMPTY, value: 'f' }, { input: BLOCK, value: BLOCK }]
      ]
      const inputCell = [0, 0]
      const expected = [1, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip a block', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'g' }, { input: BLOCK, value: BLOCK }]
      ]
      const inputCell = [0, 0]
      const expected = [2, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip >1 blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }],
        [{ input: EMPTY, value: 'g' }, { input: BLOCK, value: BLOCK }]
      ]
      const inputCell = [0, 0]
      const expected = [3, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip blocks to next column', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
        [{ input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'e' }],
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
      ]
      const inputCell = [0, 0]
      const expected = [0, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip to next column and skip blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
        [{ input: BLOCK, value: BLOCK }, { input: EMPTY, value: 'e' }],
        [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
      ]
      const inputCell = [0, 0]
      const expected = [1, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    describe('not skipping letters', () => {
      it('should select a cell with input', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
          [{ input: 'g', value: 'g' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [0, 0]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })

      it('should move even if board is full', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: 'c', value: 'd' }],
          [{ input: 'g', value: 'g' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [0, 0]
        const expected = [1, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction, false)

        expect(actual).toEqual(expected)
      })
    })

    describe('while skipping letters', () => {
      // TODO - should it?
      it('should skip to next column when out of cells', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: EMPTY, value: 'd' }],
          [{ input: 'g', value: 'g' }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [0, 0]
        const expected = [0, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      // TODO - should it?
      it('should wrap if the end of the board has been reached', () => {
        const puzzle = [
          [{ input: EMPTY, value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [1, 1]
        const expected = [0, 0]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })

      it('should remain in current cell if puzzle is full', () => {
        const puzzle = [
          [{ input: 'a', value: 'b' }, { input: BLOCK, value: BLOCK }],
          [{ input: BLOCK, value: BLOCK }, { input: 'd', value: 'e' }],
          [{ input: BLOCK, value: BLOCK }, { input: BLOCK, value: BLOCK }]
        ]
        const inputCell = [1, 1]
        const expected = [1, 1]
        const actual = findNextInputCell(puzzle, inputCell, direction)

        expect(actual).toEqual(expected)
      })
    })
  })
})
