import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TransitionPortal from '../TransitionPortal'
import './index.css'

export default class Modal extends Component {
  render() {
    const {
      shown,
      children,
      ...others
    } = this.props

    return (
      <TransitionPortal
        transitionName="pg-modal"
        {...others}
      >
        {shown &&
          <div
            key="modal"
            className="pg-modal"
          >
            {children}
          </div>
        }
      </TransitionPortal>
    )
    }
}

Modal.propTypes = {
  shown: PropTypes.bool,
  title: PropTypes.node,
  footer: PropTypes.node,
  closeBtnShown: PropTypes.bool,
  maskClosable: PropTypes.bool,
}
