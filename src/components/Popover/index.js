import React, {Component, Children, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
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
    const {
      width: contentWidth,
      height: contentHeight,
    } = contentDOM.getBoundingClientRect()


    if (type === 'vertical') {
      let contentLeft = left + (width - contentWidth) / 2
      if (align === 'negative') {
        contentLeft = right - contentWidth
      } else if (align === 'positive') {
        contentLeft = left
      }

      if (top < contentHeight + margin) {
        this.setState({
          contentStyle: {
            left: contentLeft,
            top: top + height + margin,
          },
        })
      } else {
        this.setState({
          contentStyle: {
            left: contentLeft,
            top: top - contentHeight - margin,
          },
        })
      }
    } else {
      let contentTop = top + (height - contentHeight) / 2
      if (align === 'negative') {
        contentTop = bottom - contentHeight
      } else if (align === 'position') {
        contentTop = top
      }

      if (window.innerWidth - right < contentWidth + margin) {
        this.setState({
          contentStyle: {
            left: left - contentWidth - margin,
            top: contentTop,
          },
        })
      } else {
        this.setState({
          contentStyle: {
            left: left + width + margin,
            top: contentTop,
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
        {...others}
      >
        {childrenNode}
        <TransitionPortal
          transitionName={prefixCls}
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
}

Popover.defaultProps = {
  prefixCls: 'pg-popover',
  trigger: 'click',
  type: 'vertical',
  align: 'center',
  margin: 0,
}
