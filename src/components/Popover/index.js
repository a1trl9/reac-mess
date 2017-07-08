import React, {Component, Children, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import omit from 'object.omit'
import TransitionPortal from '../TransitionPortal'
import './index.css'

const POPOVER_ARROW_HEIGHT = 5

export default class Popover extends Component {
  state = {
    direction: null,
    contentStyle: null,
  }

  componentWillReceiveProps(nextProps) {
    const {shown, onClose} = this.props
    if (!onClose) {
      return
    }
    const {shown: nextShown} = nextProps
    if (!shown && nextShown) {
      document.addEventListener('click', this.handleClose)
    } else if (shown && !nextShown) {
      document.removeEventListener('click', this.handleClose)
    }
  }

  componentDidUpdate(prevProps) {
    const {shown: prevShown} = prevProps
    const {shown} = this.props
    if (shown && !prevShown) {
      this.calcContentPosition()
    }
  }

  handleClose = (e) => {
    if (!findDOMNode(this.content).contains(e.target)) {
      this.props.onClose(e)
    }
  }

  calcContentPosition() {
    if (!this.content || !this.trigger) {
      return
    }
    const {type, align, margin} = this.props
    const contentDOM = findDOMNode(this.content)
    const triggerDOM = findDOMNode(this.trigger)
    const {
      top,
      right,
      bottom,
      left,
      width,
      height,
    } = triggerDOM.getBoundingClientRect()
    const contentWidth = contentDOM.offsetWidth
    const contentHeight = contentDOM.offsetHeight

    if (type === 'vertical') {
      let contentLeft = left + (width - contentWidth) / 2
      let transformOrigin = ''
      if (align === 'negative') {
        contentLeft = right - contentWidth
        transformOrigin = 'right'
      } else if (align === 'positive') {
        contentLeft = left
        transformOrigin = 'left'
      }

      if (top < contentHeight + margin + POPOVER_ARROW_HEIGHT) {
        this.setState({
          direction: 'down',
          contentStyle: {
            left: contentLeft,
            top: top + height + margin + POPOVER_ARROW_HEIGHT,
            transformOrigin: `${transformOrigin} top`,
          },
        })
      } else {
        this.setState({
          direction: 'up',
          contentStyle: {
            left: contentLeft,
            top: top - contentHeight - margin - POPOVER_ARROW_HEIGHT,
            transformOrigin: `${transformOrigin} bottom`,
          },
        })
      }
    } else {
      let contentTop = top + (height - contentHeight) / 2
      let transformOrigin = ''
      if (align === 'negative') {
        contentTop = bottom - contentHeight
        transformOrigin = 'bottom'
      } else if (align === 'positive') {
        contentTop = top
        transformOrigin = 'top'
      }

      if (window.innerWidth - right < contentWidth + margin + POPOVER_ARROW_HEIGHT) {
        this.setState({
          direction: 'left',
          contentStyle: {
            left: left - contentWidth - margin - POPOVER_ARROW_HEIGHT,
            top: contentTop,
            transformOrigin: `${transformOrigin} right`,
          },
        })
      } else {
        this.setState({
          direction: 'right',
          contentStyle: {
            left: left + width + margin + POPOVER_ARROW_HEIGHT,
            top: contentTop,
            transformOrigin: `${transformOrigin} left`,
          },
        })
      }
    }
  }

  render() {
    const {
      prefixCls,
      shown,
      className,
      content,
      trigger,
      onClose,
      children,
      transitionProps,
      align,
      type,
      ...others,
    } = this.props
    const {direction, contentStyle} = this.state

    const classString = cx(prefixCls, className)
    const childrenNode = cloneElement(Children.only(children), {
      className: `${prefixCls}-trigger`,
      ref: (el) => this.trigger = el,
    })
    const contentNode = (
      <div
        className={`${prefixCls}-content`}
        ref={(el) => this.content = el}
        style={{
          ...contentStyle,
        }}
      >
        <div
          className={cx(`${prefixCls}-content-arrow`, {
            [`${prefixCls}-content-arrow-${align}`]: align,
            [`${prefixCls}-content-arrow-${direction}`]: direction,
            [`${prefixCls}-content-arrow-${type}`]: type === 'horizontal',
            }
          )}
        ></div>
        {content}
      </div>
    )

    return (
      <div
        className={classString}
        {...omit(others, ['margin'])}
      >
        {childrenNode}
        <TransitionPortal
          transitionName={prefixCls}
          {...transitionProps}
        >
          {shown && contentNode}
        </TransitionPortal>
      </div>
    )
  }
}

Popover.propTypes = {
  prefixCls: PropTypes.string,
  shown: PropTypes.bool,
  content: PropTypes.node,
  trigger: PropTypes.oneOf(['hover', 'click']),
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  align: PropTypes.oneOf(['center', 'negative', 'positive']),
  margin: PropTypes.number,
  transitionProps: PropTypes.object,
  onClose: PropTypes.func,
}

Popover.defaultProps = {
  prefixCls: 'pg-popover',
  trigger: 'click',
  type: 'vertical',
  margin: 0,
}
