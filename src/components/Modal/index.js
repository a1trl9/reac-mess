import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button, {ButtonGroup} from '../Button'
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
      onSubmit,
      onClose,
      maskClosable,
      ...others
    } = this.props

    const wrapperClassString = cx(`${prefixCls}-wrapper`, modalWrapperClassName)
    const classString = cx(prefixCls, modalClassName, {
      [`${prefixCls}-fullpage`]: fullPage,
    })
    const onCloseProp = maskClosable && onClose ? {onClick: this.handleWrapperClick} : {}
    const onSubmitProp = onSubmit ? {onClick: onSubmit} : {}

    let footerNode = null
    if (footer) {
      footerNode = footer
    } else if (footer === undefined) {
      footerNode = (
        <ButtonGroup>
          <Button
            type="primary"
            {...onSubmitProp}
          >
            Submit
          </Button>
          <Button
            {...onCloseProp}
          >
            Cancel
          </Button>
        </ButtonGroup>
      )
    }

    return (
      <TransitionPortal
        transitionName={prefixCls}
        {...others}
      >
        {shown &&
          <div
            key="modal"
            className={wrapperClassString}
            {...onCloseProp}
          >
            <div
              className={classString}
            >
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              {children}
              {footerNode && <div className={`${prefixCls}-footer`}>{footerNode}</div>}
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
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  prefixCls: 'pg-modal',
}
