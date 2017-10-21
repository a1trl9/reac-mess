import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './index.css'

export default class MenuItem extends Component {
  state = {
    clicked: false
  }

  // handleClick = e => {
  //   const { onClick } = this.props
  //   if (typeof onClick === 'function') {
  //     onClick()
  //   }
  //   // do something, like set state
  // }

  render() {
    const { prefixCls, className, children, ...others } = this.props
    return (
      <div className={cx(prefixCls, className)} {...others}>
        {children}
      </div>
    )
  }
}

MenuItem.propTypes = {
  prefixCls: PropTypes.string,
  onClick: PropTypes.func
}

MenuItem.defaultProps = {
  prefixCls: 'pg-menuitem',
  onClick: null
}
