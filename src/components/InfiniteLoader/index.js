import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { scroll, resize } from '../EventHandler'

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
    this.containerDOM = this.props.container ? findDOMNode(this.props.container)
      : undefined
    this.elementDOM = findDOMNode(this.element)
  }

  addListeners = () => {
    if (!this.props.hasMore) {
      return
    }

    this.scrollRemover = scroll(this.containerDOM)({
      listener: this.handleScroll
    })

    this.resizeRemover = resize(this.containerDOM)({
      listener: this.handleScroll
    })
  }

  removeListeners = () => {
    this.scrollRemover.unsubscribe()
    this.resizeRemover.unsubscribe()
  }

  handleScroll = e => {
    const { bottom } = this.elementDOM.getBoundingClientRect()
    if (this.containerDOM) {
      const {
        bottom: containerBottom
      } = this.containerDOM.getBoundlingClientRect()
    } else {
      const containerBottom = window.innerHeight
    }

    if (containerBottom - bottom < this.props.threshold) {
      this.props.onLoad()
    }
  }
}

InfiniteLoader.propTypes = {
  onLoad: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  container: PropTypes.node
}

InfiniteLoader.defaultProps = {
  threshold: 100
}
