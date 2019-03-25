import findNextInputCell from './findNextInputCell'

let direction

describe('findNextInputCell', () => {
  describe('across', () => {
    beforeAll(() => (direction = 'across'))

    it('should move to cell immediately to the right', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }]
      ]
      const inputCell = [0, 0]
      const expected = [0, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip a block', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '.', value: '.' }, { input: '', value: 'd' }]
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
          { input: '.', value: '.' },
          { input: '.', value: '.' },
          { input: '', value: 'd' }
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
          { input: '', value: 'd' }
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
          { input: '.', value: '.' }
        ],
        [
          { input: '', value: 'd' }
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
          { input: '.', value: '.' }
        ],
        [
          { input: '.', value: '.' },
          { input: '', value: 'd' }
        ]
      ]
      const inputCell = [0, 0]
      const expected = [1, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip filled cells', () => {
      const puzzle = [
        [
          { input: 'a', value: 'b' },
          { input: 'c', value: 'd' },
          { input: '', value: 'f' }
        ]
      ]
      const inputCell = [0, 0]
      const expected = [0, 2]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should wrap if the end of the board has been reached', () => {
      const puzzle = [
        [
          { input: 'a', value: 'b' },
          { input: '.', value: '.' }
        ],
        [
          { input: '', value: 'c' },
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
          { input: '.', value: '.' }
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

  describe('down', () => {
    beforeAll(() => (direction = 'down'))

    it('should move to cell immediately below', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }],
        [{ input: '', value: 'f' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [1, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip a block', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }],
        [{ input: '', value: 'g' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [2, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip >1 blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }],
        [{ input: '', value: 'g' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [3, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip to next column when out of cells', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }],
        [{ input: 'g', value: 'g' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [0, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip blocks to next column', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '', value: 'd' }],
        [{ input: '.', value: '.' }, { input: '', value: 'e' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [0, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should skip to next column and skip blocks', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '.', value: '.' }],
        [{ input: '.', value: '.' }, { input: '', value: 'e' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }]
      ]
      const inputCell = [0, 0]
      const expected = [1, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should wrap if the end of the board has been reached', () => {
      const puzzle = [
        [{ input: '', value: 'b' }, { input: '.', value: '.' }],
        [{ input: '.', value: '.' }, { input: 'd', value: 'e' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }]
      ]
      const inputCell = [1, 1]
      const expected = [0, 0]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })

    it('should remain in current cell if puzzle is full', () => {
      const puzzle = [
        [{ input: 'a', value: 'b' }, { input: '.', value: '.' }],
        [{ input: '.', value: '.' }, { input: 'd', value: 'e' }],
        [{ input: '.', value: '.' }, { input: '.', value: '.' }]
      ]
      const inputCell = [1, 1]
      const expected = [1, 1]
      const actual = findNextInputCell(puzzle, inputCell, direction)

      expect(actual).toEqual(expected)
    })
  })
})
