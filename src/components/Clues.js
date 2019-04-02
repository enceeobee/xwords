import React from 'react'
import PropTypes from 'prop-types'

import Clue from './Clue'

import generateSelectedClass from '../lib/clue/generateSelectedClass'

function Clues ({ clues, direction, handleClick, selectedClue }) {
  return (
    <div className={direction}>
      <h4>{direction[0].toUpperCase() + direction.slice(1)}</h4>

      <ul className='clues'>
        {
          clues.map((clue, i) => (
            <Clue
              key={`clue-${i}`}
              text={clue.text}
              selectedClass={generateSelectedClass(selectedClue, clue)}
              direction={direction}
              number={clue.number}
              handleClick={handleClick}
            />
          ))
        }
      </ul>
    </div>
  )
}

Clues.propTypes = {
  clues: PropTypes.array,
  direction: PropTypes.string,
  handleClick: PropTypes.func,
  selectedClue: PropTypes.object
}

export default Clues
