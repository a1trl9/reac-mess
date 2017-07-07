import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import TransitionPortal from '../TransitionPortal'
import './index.css'

export default class Popover extends Component {
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

    const classString = cx(prefixCls, className)
    const childrenNode = cloneElement(Children.only(children), {
      className: `${prefixCls}-trigger`,
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
          {shown && content}
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
}

Popover.defaultProps = {
  prefixCls: 'pg-popover',
  trigger: 'click',
}
