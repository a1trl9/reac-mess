import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import TransitionPortal from '../TransitionPortal'
import './index.css'

export default class Modal extends Component {
  handleWrapperClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    const {
      prefixCls,
      shown,
      fullPage,
      modalWrapperClassName,
      modalClassName,
      title,
      footer,
      children,
      onClose,
      maskClosable,
      ...others
    } = this.props

    const wrapperClassString = cx(`${prefixCls}-wrapper`, modalWrapperClassName)
    const classString = cx(prefixCls, modalClassName, {
      [`${prefixCls}-fullpage`]: fullPage,
    })
    const wrapperClickProp = maskClosable && onClose ? {onClick: this.handleWrapperClick} : {}

    return (
      <TransitionPortal
        transitionName={prefixCls}
        {...others}
      >
        {shown &&
          <div
            key="modal"
            className={wrapperClassString}
            {...wrapperClickProp}
          >
            <div
              className={classString}
            >
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              {children}
              {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
            </div>
          </div>
        }
      </TransitionPortal>
    )
  }
}

Modal.propTypes = {
  prefixCls: PropTypes.string,
  shown: PropTypes.bool,
  fullPage: PropTypes.bool,
  modalWrapperClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  title: PropTypes.node,
  footer: PropTypes.node,
  closeBtnShown: PropTypes.bool,
  maskClosable: PropTypes.bool,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  prefixCls: 'pg-modal',
}
