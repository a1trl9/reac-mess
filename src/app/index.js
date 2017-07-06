import React, {Component} from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import './index.css'

export default class App extends Component {
  state = {
    shown: false,
  }

  render() {
    const {shown} = this.state

    return (
      <div>
        <Button
          onClick={() => this.setState(({shown}) => {
            return {
              shown: !shown,
            }
          })}
        >
          switch
        </Button>
        <Modal
          title="Modal Title"
          shown={shown}
          maskClosable
          onClose={() => this.setState({shown: false})}
          fullPage
        >
          <Card
            title="This is a Title"
            extra={<Button type="danger" size="large" disabled>Delete</Button>}
          >
            <p>You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:</p>
          </Card>
        </Modal>
      </div>
    )
  }
}
