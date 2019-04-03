import React from 'react'
import PropTypes from 'prop-types'
import examples from '../examples'

function Modal (props) {
  return (
    <div className='modal-container'>
      <div
        className='modal-background'
        onClick={props.handleClick}
      />
      <div className='modal-body'>
        {
          props.type === 'calendar' &&
          <ul className='message'>
            <h3>Please select from the following example puzzles:</h3>
            {
              examples.map(example => (
                <li
                  key={example.date}
                  onClick={() => props.handleChange(new Date(example.date))}
                  className='example-puzzle'
                >
                  {example.dow}, {example.date}
                </li>
              ))
            }
          </ul>
        }

        {
          props.type === 'correct' &&
          <div className='message'><h3>Congratulations, you solved the puzzle! <span role='img' aria-label='tada emoji'>🎉</span><span role='img' aria-label='boom emoji'>💥</span><span role='img' aria-label='ok-hand emoji'>👌</span></h3></div>
        }

        {
          props.type === 'incorrect' &&
          <div className='message'><h3>Oh no, there is at least one incorrect answer. Keep trying!</h3></div>
        }
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  date: PropTypes.object,
  type: PropTypes.string
}

export default Modal
