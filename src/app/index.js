import React, { Component } from 'react'
import Layout from '../components/Layout'
import { scroll } from '../components/EventHandler'
import './index.css'

export default class App extends Component {
  render() {
    scroll()({ listener: () => console.log('scroll'), context: {} })
    return (
      <Layout
        header={<div>header</div>}
        content={<div>content</div>}
        footer={<div>footer</div>}
      />
    )
  }
}
