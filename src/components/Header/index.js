import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Icon from '../Icon'
import './index.css'

export default class Header extends Component {
  render() {
    const {
      className,
      title,
      icon,
      content,
      prefixCls,
      titleProps,
      iconProps
    } = this.props
    const titleNode =
      title && typeof title === 'string' ? (
        <h1 className={`${prefixCls}-title`} {...titleProps}>
          {title}
        </h1>
      ) : (
        title
      )
    const iconNode = icon ? <Icon name={icon} {...iconProps} /> : null

    return (
      <div className={cx(prefixCls, className)}>
        <div className={`${prefixCls}-fixed`}>
          {iconNode}
          {titleNode}
          {content}
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  prefixCls: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleProps: PropTypes.object,
  // provide the name of svg
  icon: PropTypes.string,
  iconProps: PropTypes.object,
  content: PropTypes.node
}

Header.defaultProps = {
  prefixCls: 'pg-header',
  title: null,
  titleProps: {},
  icon: null,
  iconProps: {},
  content: null
}
