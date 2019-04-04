import React, { Fragment } from 'react'
import Cell from './Cell'

function Row (props) {
  const {
    index,
    row,
    inputCell,
    selectedClue
  } = props
  const selectInputCell = col => props.selectInputCell([index, col])

  return (
    <Fragment>
      {
        row.map((cell, i) => (
          <Cell
            key={`cell-${i}`}
            index={i}
            value={cell.input}
            cellClueNumber={cell.cellClueNumber}
            inputClass={
              inputCell[0] === index && inputCell[1] === i
                ? ' input'
                : ''
            }
            selectedClueClass={
              cell.clues[selectedClue.direction] === selectedClue.number
                ? ' selected-clue'
                : ''
            }
            selectInputCell={selectInputCell}
          />
        ))
      }
    </Fragment>
  )
}

export default Row
