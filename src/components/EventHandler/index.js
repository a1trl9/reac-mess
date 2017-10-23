import EventEmitter from 'eventemitter3'
import throttle from 'lodash/throttle'
import register from './register'

class EventHandler {
  constructor(options) {
    this.connectTrottle(options)
  }

  connectTrottle = ({ trottledEvent, listener, context }) => {
    window.EE.on(trottledEvent, listener, context)
    const { connections, listeners, removers } = window.eventProps
    connections[trottledEvent] = (connections[event] || 0) + 1
    this._type = trottledEvent
    this._listener = listener
    this._context = context
    this.unsubscribe = () => {
      if (!this._type) {
        return
      }
      window.EE.removeListener(trottledEvent, listener, context)
      connections[trottledEvent]--
      if (connections[trottledEvent] === 0) {
        listeners[trottledEvent].remove()
        listeners[trottledEvent] = undefined
      }
      this._type = undefined
      this._callback = undefined
      this._context = undefined

      for (let i = removers.length - 1; i >= 0; i--) {
        const remover = removers[i]
        if (remover === this) {
          removers.splice(i, 1)
          break
        }
      }
    }
  }
}

let HASH_ID = 0

function initEventHandler() {
  if (typeof window !== 'undefined') {
    if (!window.EE) {
      window.EE = new EventEmitter()
    }
    if (!window.eventProps) {
      window.eventProps = {
        connections: {},
        listeners: [],
        removers: []
      }
    }
  }
}

export { initEventHandler }

export default function connectEvent(target, event) {
  return ({
    trottleRate = 300,
    listener,
    context = {},
    domTarget,
    threshold = 500
  }) => {
    const { listeners, removers } = window.eventProps
    const domID = domTarget && (domTarget.id || `target-id:${HASH_ID++}`)

    const trottledEvent = `${event}${domID ? `:${domID}` : ''}`

    const remover = new EventHandler({ trottledEvent, listener, context })
    removers.push(remover)

    if (listeners[trottledEvent]) {
      return remover
    }

    let timer

    function handler(e) {
      clearTimeout(timer)
      timer = setTimeout(
        throttle(() => window.EE.emit(trottledEvent, e), trottleRate),
        threshold
      )
    }

    listeners[trottledEvent] = register(domTarget || target, event, handler)
    return remover
  }
}
