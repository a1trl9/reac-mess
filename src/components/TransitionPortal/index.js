import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Portal from '../Portal'

export default class TransitionPortal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shown: Children.toArray(props.children).length !== 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const {transitionLeaveTimeout, children} = this.props
    const {children: nextChildren} = nextProps
    const count = Children.toArray(children).length
    const nextCount = Children.toArray(nextChildren).length

    if (count === 0 && nextCount > 0) {
      clearTimeout(this.timeoutId)
      this.setState({
        shown: true,
      })
    }

    if (count > 0 && nextCount === 0) {
      if (transitionLeaveTimeout) {
        this.timeoutId = setTimeout(() => {
          this.setState({
            shown: false,
          })
        }, transitionLeaveTimeout)
      } else {
        this.setState({
          shown: false,
        })
      }
    }
  }

  render() {
    const {
      transitionName,
      transitionAppear,
      transitionEnter,
      transitionAppearTimeout,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      children,
      ...others
    } = this.props
    const {shown} = this.state

    if (shown) {
      return (
        <Portal>
          <ReactCSSTransitionGroup
            transitionName={{
              appear: `${transitionName}-appear`,
              enter: `${transitionName}-enter`,
              leave: `${transitionName}-leave`,
            }}
            transitionAppear={transitionAppear}
            transitionEnter={transitionEnter}
            transitionAppearTimeout={transitionAppearTimeout}
            transitionEnterTimeout={transitionEnterTimeout}
            transitionLeaveTimeout={transitionLeaveTimeout}
            {...others}
          >
            {children}
          </ReactCSSTransitionGroup>
        </Portal>
      )
    }
    return null
  }
}

TransitionPortal.propTypes = {
  ...ReactCSSTransitionGroup.propTypes,
}

TransitionPortal.defaultProps = {
  ...ReactCSSTransitionGroup.defaultProps,
  transitionAppear: true,
  transitionAppearTimeout: 400,
  transitionEnterTimeout: 400,
  transitionLeaveTimeout: 400,
}
