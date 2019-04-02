import React from 'react'
import PropTypes from 'prop-types'

function Header (props) {
  function openModal () {
    props.openModal('calendar')
  }

  return (
    <div className='header'>
      <div className='title'>
        <h1>{props.hastitle ? props.title : 'NY Times Daily Crossword'}</h1>
      </div>
      <p>
        {props.date} <span className='date-link' onClick={openModal}>(change date)</span>
      </p>
      <p>By {props.author}</p>
    </div>
  )
}

Header.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  hastitle: PropTypes.bool,
  openModal: PropTypes.func,
  title: PropTypes.string
}

export default Header
