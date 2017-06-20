import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Portal from '../portal'

export default class Modal extends Component {
  render() {
    const {shown, children} = this.props
    if (shown) {
      return (
        <Portal>
          {children}
        </Portal>
      )
    }
    return null
  }
}

Modal.propTypes = {
  shown: PropTypes.bool,
  title: PropTypes.node,
  footer: PropTypes.node,
  closeBtnShown: PropTypes.bool,
  maskClosable: PropTypes.bool,
}
