import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Popover from '../Popover'
import MenuItem from './MenuItem'
import './index.css'

export default class Menu extends Component {
  render() {
    const {
      prefixCls,
      className,
      popoverProps,
      popNode,
      children,
      closeOnClickItem,
      ...others
    } = this.props

    let childList = children

    const menuContent = (
      <div className={cx(prefixCls, className)} {...others}>
        {childList}
      </div>
    )
    if (!popNode) {
      return menuContent
    }
    return (
      <Popover content={menuContent} {...popoverProps}>
        {popNode}
      </Popover>
    )
  }
}

Menu.propTypes = {
  prefixCls: PropTypes.string,
  popoverProps: PropTypes.object,
  popNode: PropTypes.node,
  closeOnClickItem: PropTypes.bool
}

Menu.defaultProps = {
  prefixCls: 'pg-menu',
  popoverProps: {},
  closeOnClickItem: true
}

export { MenuItem }
