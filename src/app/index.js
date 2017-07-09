import React, {Component} from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Popover from '../components/Popover'
import Layout from '../components/Layout'
import './index.css'

export default class App extends Component {
  state = {
    shown: false,
    popShown: false,
  }

  render() {
    const {shown, popShown} = this.state

    return (
      <Layout
        header={<div>header</div>}
        content={<div>content</div>}
        footer={<div>footer</div>}
      />
    )
  }
}
