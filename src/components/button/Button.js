import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import omit from 'object.omit'
import './index.css'

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: props.loading,
      clicked: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {loading: currentLoading} = this.props
    const {loading} = nextProps

    if (currentLoading) {
      clearTimeout(this.delayTimeout)
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = setTimeout(() => {
        this.setState({
          loading,
        })
      }, loading.delay)
    } else {
      this.setState({
        loading,
      })
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout)
    }
  }

  handleMouseUp = () => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp()
    }
  }

  handleClick = () => {
    this.setState({clicked: true})
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({clicked: false})
    }, 500)
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    const {
      type,
      htmlType,
      size,
      icon,
      ghost,
      className,
      children,
      prefixCls,
      ...others,
    } = this.props
    const {loading, clicked} = this.state

    let sizeCls = ''
    if (size === 'large') {
      sizeCls = 'lg'
    } else if (size === 'small') {
      sizeCls = 'sm'
    }

    const classString = cx(prefixCls, className, {
      [`${prefixCls}-${type}`]: Boolean(type),
      [`${prefixCls}-${sizeCls}`]: Boolean(sizeCls),
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-ghost`]: ghost,
    })

    const iconType = loading ? 'loading' : icon
    const iconNode = iconType ? <Icon type={iconType} /> : null

    return (
      <button
        {...omit(others, ['loading'])}
        type={htmlType}
        className={classString}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
      >
        {iconNode}
        {children}
      </button>
    )
  }
}

Button.PropTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'danger', 'default']),
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  size: PropTypes.oneOf(['large', 'small', 'default']),
  icon: PropTypes.string,
  ghost: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  loading: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
}

Button.defaultProps = {
  prefixCls: 'pg-button',
  type: 'default',
  size: 'default',
  htmlType: 'button',
  loading: false,
  ghost: false,
}
