import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Svg from '../Svg'

export default class Icon extends Component {
  render() {
    const {
      prefixCls,
      className,
      name,
      width,
      height,
      fill,
    } = this.props
    const classString = cx(prefixCls, className)

    return (
      <Svg
        width={width}
        height={height}
        style={{
          fill,
        }}
        src={require(`../Svg/lib/${name}.svg`)}
      />
    )
  }
}

Icon.propTypes = {
  prefixCls: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
}

Icon.defaultProps = {
  prefixCls: 'pg-icon',
  width: 14,
  height: 14,
  fill: '#fff',
}
