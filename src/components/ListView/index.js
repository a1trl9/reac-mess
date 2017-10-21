import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import InfiniteLoader from '../InfiniteLoader'
import ListItem from './ListItem'
import './index.css'

export default class ListView extends Component {
  render() {
    const {
      prefixCls,
      className,
      isInfinite,
      infiniteProps,
      children
    } = this.props
    const classString = cx(prefixCls, className)

    if (isInfinite) {
      return (
        <InfiniteLoader className={classString} {...infiniteProps}>
          {children}
        </InfiniteLoader>
      )
    }

    return <div className={classString}>{children}</div>
  }
}

ListView.propTypes = {
  prefixCls: PropTypes.string,
  isInfinite: PropTypes.bool,
  infiniteProps: PropTypes.object
}

ListView.defaultProps = {
  prefixCls: 'pg-listview',
  isInfinite: false,
  infiniteProps: {}
}

export { ListItem }
