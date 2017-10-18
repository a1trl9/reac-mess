import React, { Component, Children } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { scroll, resize } from '../EventHandler'

class ReuseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coldSlot: false,
      startIndex: 0,
      displayCount: props.children.length
    }
  }

  componentDidMount() {
    this.addListeners()
    this.updateChildrenState()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  handleScoll = () => {
    if (this.state.coldSlot) {
      this.setState({ coldSlot: false })
    } else {
      this.updateChildrenState()
    }
  }

  addListeners = () => {
    this.scrollRemover = scroll(document)({
      listener: this.handleScoll
    })

    // this.resizeRemover = resize()({
    //   listener: this.handleScroll
    // })
  }

  removeListeners = () => {
    this.scrollRemover.unsubscribe()
    this.resizeRemover.unsubscribe()
  }

  updateChildrenState = () => {
    this.setState({
      ...this.updateChildrenOnScreen()
    })
  }

  calcScreenHeight() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight
    )
  }

  calcScrollTop() {
    return (
      document.documentElement.scrollTop ||
      document.getElementsByTagName('body')[0].scrollTop
    )
  }

  updateChildrenOnScreen = () => {
    const { startIndex, displayCount } = this.state
    const screenHeight = this.calcScreenHeight()
    const scrollTop = this.calcScrollTop()
    const newStartIndex = Math.floor(scrollTop / this.props.itemHeight)
    const newDisplayCount =
      Math.ceil((screenHeight + scrollTop) / this.props.itemHeight) -
      newStartIndex

    return {
      coldSlot:
        startIndex !== newStartIndex || displayCount !== newDisplayCount,
      startIndex: newStartIndex,
      displayCount: newDisplayCount
    }
  }

  render() {
    const { startIndex, displayCount } = this.state
    const childrenArray = Children.toArray(this.props.children)
    const renderedChildren = childrenArray.slice(
      startIndex,
      startIndex + displayCount
    )

    return <div>{renderedChildren}</div>
  }
}

ReuseList.propTypes = {
  itemHeight: PropTypes.number.isRequired
}

export default ReuseList
