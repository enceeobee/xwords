import React from 'react'

import '../css/cell.css'

// TODO - HOC for these iterations?

function Cell (props) {
  const { cellClueNumber, inputClass, selectedClueClass, value } = props
  const selectInputCell = () => {
    props.selectInputCell(props.index)
  }

  if (value === '.') {
    return <div className='cell block' />
  }

  return (
    <div
      className={`cell ${inputClass + selectedClueClass}`}
      onClick={selectInputCell}
    >
      {
        cellClueNumber !== 0 &&
        <div className='number'>{cellClueNumber}</div>
      }
      <div className='value'>{value}</div>
    </div>
  )
}

export default Cell
