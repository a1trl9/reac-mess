import React, { Component, Children, cloneElement } from 'react'
import Transition from 'react-transition-group/Transition'
import PropTypes from 'prop-types'
import cx from 'classnames'
import omit from 'object.omit'
import Portal from '../Portal'

export default class TransitionPortal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      innerShown: props.shown
    }
  }

  componentWillReceiveProps(nextProps) {
    const { transitionTimeout, shown } = this.props
    const { shown: nextShown } = nextProps

    if (!shown && nextShown) {
      clearTimeout(this.timeoutId)
      this.setState({
        innerShown: true
      })
    }

    if (shown && !nextShown) {
      if (transitionTimeout) {
        this.timeoutId = setTimeout(() => {
          this.setState({
            innerShown: false
          })
        }, transitionTimeout)
      } else {
        this.setState({
          innerShown: false
        })
      }
    }
  }

  render() {
    const {
      transitionName,
      shown,
      timeout,
      children,
      onTransitionEnter,
      onTransitionLeave,
      ...others
    } = this.props
    const { innerShown } = this.state

    if (innerShown) {
      return (
        <Portal>
          <Transition
            timeout={timeout}
            in={shown}
            appear
            onEntered={onTransitionEnter}
            onExisted={onTransitionLeave}
            {...omit(others, ['transitionTimeout'])}
          >
            {status => {
              return cloneElement(children, {
                className: cx(
                  children.props.className,
                  `${transitionName}-${status}`
                )
              })
            }}
          </Transition>
        </Portal>
      )
    }
    return null
  }
}

TransitionPortal.propTypes = {
  shown: PropTypes.bool,
  transitionName: PropTypes.string.isRequired,
  onTransitionEnter: PropTypes.func,
  onTransitionLeave: PropTypes.func,
  timeout: PropTypes.number,
  transitionTimeout: PropTypes.number
}

TransitionPortal.defaultProps = {
  shown: false,
  onTransitionEnter: null,
  onTransitionLeave: null,
  timeout: 0,
  transitionTimeout: 300
}
