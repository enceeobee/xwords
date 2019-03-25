import React from 'react'

import '../css/cell.css'

// TODO - HOC for these iterations?

function Cell (props) {
  const { number, value } = props

  if (value === '.') {
    return <div className='cell block' />
  }

  return (
    <div className={`cell${props.isInputCell ? ' input' : ''}`}>
      {
        number !== 0 &&
        <div className='number'>{number}</div>
      }
      {props.value}
    </div>
  )
}

// function Cell (props) {
//   const { number, value } = props

//   if (value === '.') {
//     return <td className='cell block' />
//   }

//   return (
//     <td className={`cell${props.isInputCell ? ' input' : ''}`}>
//       {
//         number !== 0 &&
//         <div className='number'>{number}</div>
//       }
//       {props.value}
//     </td>
//   )
// }

export default Cell
