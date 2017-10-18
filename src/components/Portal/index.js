import React, { Component } from 'react'
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'

export default class Portal extends Component {
  componentDidMount() {
    this.element = document.createElement('div')
    document.body.appendChild(this.element)
    this.renderPortal(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps)
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.element)
    document.body.removeChild(this.element)
  }

  renderPortal = props => {
    renderSubtreeIntoContainer(this, <div {...props} />, this.element)
  }

  render() {
    return null
  }
}
