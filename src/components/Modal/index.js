import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button, {ButtonGroup} from '../Button'
import Icon from '../Icon'
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
      closeBtnShown,
      ...others
    } = this.props

    const wrapperClassString = cx(`${prefixCls}-wrapper`, modalWrapperClassName)
    const classString = cx(prefixCls, modalClassName, {
      [`${prefixCls}-fullpage`]: fullPage,
    })
    const wrapperCloseProp = maskClosable && onClose ? {onClick: this.handleWrapperClick} : {}
    const buttonCloseProp = onClose ? {onClick: onClose} : {}
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
            {...buttonCloseProp}
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
            {...wrapperCloseProp}
          >
            <div
              className={classString}
            >
              {closeBtnShown &&
                  <Button
                    className={`${prefixCls}-close-button`}
                    type="plain"
                    {...buttonCloseProp}
                  >
                    <Icon
                      name="close"
                      width={18}
                      height={18}
                    />
                  </Button>
              }
              <div
                className={`${prefixCls}-inner-containter`}
              >
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                {children}
                {footerNode && <div className={`${prefixCls}-footer`}>{footerNode}</div>}
              </div>
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
