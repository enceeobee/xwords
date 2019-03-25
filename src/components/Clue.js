import React, { PureComponent } from 'react'

import '../css/clue.css'

class Clue extends PureComponent {
  selectClue = () => {
    this.props.selectClue(this.props.number, this.props.direction)
  }

  render () {
    return (
      <li
        className={`clue${this.props.isSelected ? ' selected' : ''}`}
        onClick={this.selectClue}
      >
        {/* {decodeURIComponent(props.clue)} */}
        {this.props.number} {this.props.text.replace(/&quot;/g, '"')}
      </li>
    )
  }
}

// function Clue (props) {
//   return (
//     <li
//       className={`clue${props.isSelected ? ' selected' : ''}`}
//       onClick={props.selectClue}
//     >
//       {/* {decodeURIComponent(props.clue)} */}
//       {props.clue}
//     </li>
//   )
// }

export default Clue
