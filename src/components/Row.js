import React, { Fragment } from 'react'
import Cell from './Cell'

function Row (props) {
  return (
    <Fragment className='row'>
      {
        props.row.map((cell, i) => (
          <Cell
            key={`cell-${i}`}
            value={cell.input}
            number={cell.clueNumber}
            isInputCell={props.inputCell[0] === props.index && props.inputCell[1] === i}
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
