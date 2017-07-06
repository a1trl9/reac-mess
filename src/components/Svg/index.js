import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Svg extends Component {
  render() {
    const {
      src: {
        content,
        attributes,
      },
      title,
      ...props,
    } = this.props

    return (
      <svg
        {...attributes}
        {...props}
      >
        <title>{title}</title>
        <g
          dangerouslySetInnerHTML={{__html: content}}
        />
      </svg>
    )
  }
}

Svg.propTypes = {
  src: PropTypes.object,
  title: PropTypes.string,
}
