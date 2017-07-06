import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.css'

export default class ButtonGroup extends Component {
  render() {
    const {prefixCls, layout, children} = this.props
    const classString = cx(prefixCls, `${prefixCls}-${layout}`)

    return (
      <div
        className={classString}
      >
        {children}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  prefixCls: PropTypes.string,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
}

ButtonGroup.defaultProps = {
  prefixCls: 'pg-buttongroup',
  layout: 'horizontal',
}
