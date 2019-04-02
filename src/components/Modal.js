import React from 'react'
import Calendar from 'react-calendar'
import PropTypes from 'prop-types'

function Modal (props) {
  return (
    <div className='modal-container'>
      <div
        className='modal-background'
        onClick={props.handleClick}
      />
      <div className='calendar-modal'>
        <Calendar
          calendarType='US'
          onChange={props.handleChange}
          value={props.date}
          maxDate={new Date()}
        />
      </div>
    </div>
  )
}

Modal.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  date: PropTypes.object
}

export default Modal
