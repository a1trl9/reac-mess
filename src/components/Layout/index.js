import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.css'

export default class Layout extends Component {
  render() {
    const {
      prefixCls,
      header,
      content,
      sider,
      siderWidth,
      footer,
      className,
    } = this.props

    return (
      <div
        className={cx(prefixCls, className, {
          [`${prefixCls}-hasSider`]: sider,
        })}
      >
        {sider && <div className={cx(`${prefixCls}-sider`)}>{sider}</div>}
        <div
          className={`${prefixCls}-wrapper`}
        >
          {header && <div className={cx(`${prefixCls}-header`)}>{header}</div>}
          {content && <div className={cx(`${prefixCls}-content`)}>{content}</div>}
          {footer && <div className={cx(`${prefixCls}-footer`)}>{footer}</div>}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  prefixCls: PropTypes.string,
  header: PropTypes.node,
  content: PropTypes.node,
  sider: PropTypes.node,
  siderWidth: PropTypes.number,
  footer: PropTypes.node,
}

Layout.defaultProps = {
  prefixCls: 'pg-layout',
  siderWidth: 200,
}
