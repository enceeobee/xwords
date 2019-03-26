import React from 'react'

import Row from './Row'

import '../css/puzzle.css'

function Puzzle (props) {
  return (
    <div
      className='puzzle'
      style={{
        gridTemplateColumns: `repeat(${props.puzzle[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${props.puzzle.length}, 1fr)`
      }}
    >
      {
        props.puzzle.map((row, i) => (
          <Row
            key={`row-${i}`}
            index={i}
            row={row}
            inputCell={props.inputCell}
            selectedClue={props.selectedClue}
            selectInputCell={props.selectInputCell}
          />
        ))
      }
    </div>
  )
}

// class Puzzle extends PureComponent {
//   render () {
//     return (
//       <table className='puzzle'>
//         <tbody>
//           {
//             this.props.puzzle.map((row, i) => (
//               <Row
//                 key={`row-${i}`}
//                 index={i}
//                 row={row}
//                 inputCell={this.props.inputCell}
//                 selectedClue={this.props.selectedClue}
//               />
//             ))
//           }
//         </tbody>
//       </table>
//     )
//   }
// }

// class Puzzle extends PureComponent {
//   render () {
//     const { colCount, grid, gridnums, rowCount } = this.props
//     const rows = []
//     let gridIndex = 0

//     for (let r = 0; r < rowCount; r++) {
//       rows.push(
//         <Row
//           key={`row-${r}`}
//           cols={grid.slice(gridIndex, colCount + gridIndex)}
//           numbers={gridnums.slice(gridIndex, colCount + gridIndex)}
//         />
//       )
//       gridIndex += rowCount
//     }

//     return (
//       <table className='puzzle'>
//         <tbody>
//           {rows}
//         </tbody>
//       </table>
//     )
//   }
// }

export default Puzzle
