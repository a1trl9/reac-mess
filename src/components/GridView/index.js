import React, { Children, cloneElement } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import './index.css'

function buildGridLayout(props) {
  const {
    children,
    columnCount,
    prefixRowCls,
    rowCls,
    prefixElementCls,
    rowMargin,
    elementMargin
  } = props

  if (!children) {
    return null
  }

  const childList = Children.map(children, (child, index) => {
    const attr = {
      key: index,
      className: cx(prefixElementCls, child.props.className),
      style: !((index + 1) % columnCount)
        ? null
        : {
            marginRight: elementMargin
          }
    }
    return cloneElement(child, attr)
  })

  const childLength = childList.length
  const emptyCount =
    childLength % columnCount ? columnCount - childLength % columnCount : 0

  for (let i = 0; i < emptyCount; i++) {
    const emptyBlock = (
      <div
        key={childLength + i}
        className="pg-gridelement-empty"
        style={{ marginRight: i + 1 === emptyCount ? null : elementMargin }}
      />
    )
    childList.push(emptyBlock)
  }

  const rowList = []

  for (let i = 0; i < childLength; i += 3) {
    const rowStyle = { marginBottom: i + 3 >= childLength ? null : rowMargin }
    const row = (
      <div
        key={Math.random()}
        className={cx(prefixRowCls, rowCls)}
        style={rowStyle}
      >
        {childList.slice(i, i + 3)}
      </div>
    )
    rowList.push(row)
  }

  return rowList
}

const GridView = props => {
  const { prefixCls, className } = props
  const rowList = buildGridLayout(props)

  if (!rowList) {
    return null
  }

  return <div className={cx(prefixCls, className)}>{rowList}</div>
}

GridView.propTypes = {
  // prefix className
  prefixCls: PropTypes.string,
  prefixRowCls: PropTypes.string,
  prefixElementCls: PropTypes.string,
  // other props
  rowCls: PropTypes.string,
  columnCount: PropTypes.number.isRequired,
  rowMargin: PropTypes.number,
  elementMargin: PropTypes.number
}

GridView.defaultProps = {
  prefixCls: 'pg-gridview',
  prefixRowCls: 'pg-gridrow',
  prefixElementCls: 'pg-gridelement',
  rowMargin: 0,
  elementMargin: 0
}

export default GridView
