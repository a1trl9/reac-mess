import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Menu, { MenuItem } from '../../components/Menu'
import './index.css'

export default class AppHeader extends Component {
  state = {
    shown: false
  }

  handleClick = e => {
    this.setState(({ shown }) => {
      return {
        shown: !shown
      }
    })
  }

  render() {
    const { metaMenuFunction } = this.props
    const { shown } = this.state
    const appHeaderMenu = (
      <Menu
        className="pg-app-header-menu"
        popNode={
          <Button
            type="plain"
            className="pg-app-header-menu-entry"
            onClick={this.handleClick}
          >
            Layout
          </Button>
        }
        popoverProps={{ shown, onClose: this.handleClick, align: 'center' }}
      >
        <MenuItem onClick={this.handleClick}>
          <Button
            className="pg-app-header-menu-item"
            type="plain"
            onClick={metaMenuFunction('list')}
          >
            List Layout
          </Button>
        </MenuItem>
        <MenuItem onClick={this.handleClick}>
          <Button
            className="pg-app-header-menu-item"
            type="plain"
            onClick={metaMenuFunction('grid')}
          >
            Grid Layout
          </Button>
        </MenuItem>
      </Menu>
    )
    return (
      <Header title="Unimelb MIS 2017 Semester 2" content={appHeaderMenu} />
    )
  }
}

AppHeader.PropTypes = {
  metaMenuFunction: PropTypes.func.isRequired
}
