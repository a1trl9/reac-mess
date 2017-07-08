import React, {Component} from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Popover from '../components/Popover'
import './index.css'

export default class App extends Component {
  state = {
    shown: false,
    popShown: false,
  }

  render() {
    const {shown, popShown} = this.state

    return (
      <div>
        <Button
          onClick={() => this.setState(({shown}) => {
            return {
              shown: !shown,
            }
          })}
        >
          modalSwitch
        </Button>
        <Modal
          title="Modal Title"
          shown={shown}
          maskClosable
          closeBtnShown
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
        <Popover
          content={<Card bordered={false}>Popover content</Card>}
          shown={popShown}
          align="positive"
          type="horizontal"
          onClose={() => this.setState({popShown: false})}
        >
          <Button
            style={{marginLeft: '600px'}}
            onClick={() => this.setState(({popShown}) => {
              return {
                popShown: !popShown,
              }
            })}
          >
            popoverSwitch
          </Button>
        </Popover>
      </div>
    )
  }
}
