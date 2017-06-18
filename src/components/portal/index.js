import React, {Component} from 'react'
import ReactDOM, { findDOMNode} from 'react-dom'

class Portal extends Component {
  componentDidMount() {
    const {closeOnESC, closeOnOuterClick, isOpen} = this.props
    if (closeOnESC) {
      document.addEventListener('keydown', this.handleKeyDown)
    }

    if (closeOnOuterClick) {
      document.addEventListener('mouseup', this.handleOuterLick)
      document.addEventListener('touchstart', this.handleOuterClick)
    }

    if (isOpen) {
      this.openPortal()
    }
  }

  componentWillReceiveProps(newProps) {
    if (typeof newProps.isOpen !== 'undefined') {
    }
  }
}
