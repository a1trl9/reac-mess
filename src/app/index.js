import React, { Component } from 'react'
import Layout from '../components/Layout'
import InfiniteLoader from '../components/InfiniteLoader'
import './index.css'

export default class App extends Component {
  render() {
    return (
      <InfiniteLoader
        onLoad={() => {
          console.log('load more!!')
        }}
        style={{ height: '2000px' }}
        hasMore
      >
        <Layout
          header={<div>header</div>}
          content={<div>content</div>}
          footer={<div>footer</div>}
        />
      </InfiniteLoader>
    )
  }
}
