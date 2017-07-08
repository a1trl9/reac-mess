import React, {Component, Children, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import omit from 'object.omit'
import TransitionPortal from '../TransitionPortal'
import './index.css'

export default class Popover extends Component {
  state = {
    contentStyle: null,
  }

  componentDidUpdate(prevProps) {
    const {shown: prevShown} = prevProps
    const {shown} = this.props
    if (shown && !prevShown) {
      this.calcContentPosition()
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
        transformOrigin = 'left'
      } else if (align === 'positive') {
        contentLeft = left
        transformOrigin = 'right'
      }

      if (top < contentHeight + margin) {
        this.setState({
          contentStyle: {
            left: contentLeft,
            top: top + height + margin,
            transformOrigin: `${transformOrigin} top`,
          },
        })
      } else {
        this.setState({
          contentStyle: {
            left: contentLeft,
            top: top - contentHeight - margin,
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

      if (window.innerWidth - right < contentWidth + margin) {
        this.setState({
          contentStyle: {
            left: left - contentWidth - margin,
            top: contentTop,
            transformOrigin: `${transformOrigin} right`,
          },
        })
      } else {
        this.setState({
          contentStyle: {
            left: left + width + margin,
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
      ...others,
    } = this.props
    const {contentStyle} = this.state

    const classString = cx(prefixCls, className)
    const childrenNode = cloneElement(Children.only(children), {
      className: `${prefixCls}-trigger`,
      ref: (el) => this.trigger = el,
    })
    const contentNode = cloneElement(content, {
      className: `${prefixCls}-content`,
      ref: (el) => this.content = el,
      style: {
        ...contentStyle,
      },
    })

    return (
      <div
        className={classString}
        {...omit(others, ['align', 'type', 'margin'])}
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
}

Popover.defaultProps = {
  prefixCls: 'pg-popover',
  trigger: 'click',
  type: 'vertical',
  align: 'center',
  margin: 0,
}
