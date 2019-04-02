import React from 'react'

import Row from './Row'

import '../css/puzzle.css'

function Puzzle (props) {
  return (
    <div className='puzzle-container'>
      <div className='selected-clue-header'>
        <div className='selected-clue-number'>{props.selectedClue.number}{props.selectedClue.direction[0].toUpperCase()}</div>
        <div className='selected-clue-text'>{props.selectedClueText}</div>
      </div>

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
    </div>
  )
}

export default Puzzle
