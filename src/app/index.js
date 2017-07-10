import React, { Component } from 'react'
import Layout from '../components/Layout'
import './index.css'

export default class App extends Component {
  render() {
    return (
      <Layout
        header={<div>header</div>}
        content={<div>content</div>}
        footer={<div>footer</div>}
      />
    )
  }
}
