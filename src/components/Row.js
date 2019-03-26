import React, { Fragment } from 'react'
import Cell from './Cell'

function Row (props) {
  const {
    index,
    row,
    inputCell,
    selectedClue
  } = props
  const selectInputCell = (col) => props.selectInputCell([index, col])

  return (
    <Fragment>
      {
        row.map((cell, i) => (
          <Cell
            key={`cell-${i}`}
            index={i}
            value={cell.input}
            cellClueNumber={cell.cellClueNumber}
            isInputCell={inputCell[0] === index && inputCell[1] === i}
            inputClass={
              inputCell[0] === index && inputCell[1] === i
                ? ' input'
                : ''
            }
            selectedClueClass={
              // [cell.acrossClueNumber, cell.downClueNumber].includes(selectedClue.number)
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

// function Row (props) {
//   return (
//     <div className='row'>
//       {
//         // props.cols.map((col, i) => <Cell key={`col-${i}`} value={props.cols[i]} number={props.numbers[i]} />)
//         props.row.map((cell, i) => (
//           <Cell
//             key={`cell-${i}`}
//             value={cell.input}
//             number={cell.clueNumber}
//             isInputCell={props.inputCell[0] === props.index && props.inputCell[1] === i}
//           />
//         ))
//       }
//     </div>
//   )
// }

export default Row
