import React, { Component } from 'react'
import AppHeader from './AppHeader'
import ShowCardView from './ShowCardView'
import './index.css'

export default class App extends Component {
  state = {
    showCardType: 'grid'
  }

  buildHandleSwitchShowCard = type => {
    return e => {
      this.setState(({ showCardType }) => {
        if (showCardType !== type) {
          return {
            showCardType: type
          }
        }
      })
    }
  }

  render() {
    const { showCardType } = this.state

    return (
      <div>
        <AppHeader metaMenuFunction={this.buildHandleSwitchShowCard} />
        <div className="pg-app-main">
          <ShowCardView
            type={showCardType}
            columnCount={3}
            rowMargin={20}
            elementMargin={20}
          />
        </div>
      </div>
    )
  }
}
