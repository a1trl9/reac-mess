import React from 'react'
import {render} from 'react-dom'
import Button from '../components/button'
import Card from '../components/card'
import Modal from '../components/modal'
import './index.css'

const testElement = (
  <Modal
    shown
  >
    <Card
      title="This is a Title"
      extra={<Button type="danger" size="large" disabled>Delete</Button>}
    >
      <p>You cannot use a general expression as the React element type. If you do want to use a general expression to indicate the type of the element, just assign it to a capitalized variable first. This often comes up when you want to render a different component based on a prop:</p>
    </Card>
  </Modal>
)

render(testElement, document.getElementById('root'))
