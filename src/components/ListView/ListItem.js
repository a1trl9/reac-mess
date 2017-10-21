import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './index.css'

export default function ListItem(props) {
  const { prefixCls, className, children } = props
  return <div className={cx(prefixCls, className)}>{children}</div>
}

ListItem.propTypes = {
  prefixCls: PropTypes.string
}

ListItem.defaultProps = {
  prefixCls: 'pg-listitem'
}
