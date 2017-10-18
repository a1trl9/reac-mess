import React, { Component } from 'react'
import ShowCardView from './ShowCardView'
import './index.css'

export default class App extends Component {
  render() {
    return <ShowCardView columnCount={3} rowMargin={20} elementMargin={20} />
  }
}
