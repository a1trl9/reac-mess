import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import omit from 'object.omit'
import { connectEvent } from '../EventHandler'

export default class InfiniteLoader extends Component {
  componentDidMount() {
    this.initiateDOM()
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  componentWillReceiverProps(nextProps) {
    const { hasMore } = this.props
    const { hasMore: nextHasMore } = nextProps
    if (hasMore && !nextHasMore) {
      this.removeListeners()
    }

    if (!hasMore && nextHasMore) {
      this.addListeners()
    }
  }

  initiateDOM = () => {
    this.containerDOM = this.props.container
      ? findDOMNode(this.props.container)
      : undefined
    this.elementDOM = findDOMNode(this.element)
  }

  addListeners = () => {
    if (!this.props.hasMore) {
      return
    }

    this.scrollRemover = connectEvent(this.containerDOM, 'scroll')({
      listener: this.handleScroll
    })

    this.resizeRemover = connectEvent(this.containerDOM, 'resize')({
      listener: this.handleScroll
    })
  }

  removeListeners = () => {
    this.scrollRemover.unsubscribe()
    this.resizeRemover.unsubscribe()
  }

  handleScroll = e => {
    const { bottom } = this.elementDOM.getBoundingClientRect()
    let containerBottom = window.innerHeight
    if (this.containerDOM) {
      containerBottom = this.containerDOM.getBoundlingClientRect().bottom
    }

    if (bottom - containerBottom < this.props.threshold) {
      this.props.onLoad()
    }
  }

  render() {
    const { prefixCls, className, children, ...others } = this.props
    const classNameString = cx(prefixCls, className)

    return (
      <div
        className={classNameString}
        ref={el => (this.element = el)}
        {...omit(others, ['threshold', 'hasMore'])}
      >
        {children}
      </div>
    )
  }
}

InfiniteLoader.propTypes = {
  prefixCls: PropTypes.string,
  onLoad: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  container: PropTypes.node,
  hasMore: PropTypes.bool
}

InfiniteLoader.defaultProps = {
  prefixCls: 'pg-infiniteloader',
  threshold: 100
}
