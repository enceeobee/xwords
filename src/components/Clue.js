import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import '../css/clue.css'

class Clue extends PureComponent {
  selectClue = () => {
    this.props.handleClick(this.props.number, this.props.direction)
  }

  render () {
    return (
      <li
        className={'clue' + this.props.selectedClass}
        onClick={this.selectClue}
      >
        {this.props.number} {this.props.text}
      </li>
    )
  }
}

Clue.propTypes = {
  number: PropTypes.number,
  direction: PropTypes.string,
  selectClue: PropTypes.func,
  selectedClass: PropTypes.string,
  text: PropTypes.string
}

export default Clue
