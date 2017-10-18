import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.css'

export default class Card extends Component {
  render() {
    const {
      prefixCls,
      className,
      title,
      extra,
      bordered,
      loading,
      bodyStyle,
      ...others
    } = this.props
    let { children } = this.props
    const classString = cx(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered
    })

    if (loading) {
      // TODO: loading rendering
    }

    let head = null
    if (title) {
      const Tag = typeof title === 'string' ? 'h3' : 'div'
      head = (
        <div className={`${prefixCls}-head`}>
          <Tag className={`${prefixCls}-head-title`}>{title}</Tag>
        </div>
      )
    }

    return (
      <div {...others} className={classString}>
        {head}
        {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {children}
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.node,
  extra: PropTypes.node,
  bordered: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
  bodyStyle: PropTypes.object
}

Card.defaultProps = {
  prefixCls: 'pg-card',
  bordered: true
}
