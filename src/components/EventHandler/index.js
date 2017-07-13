import EventEmitter from 'eventemitter3'
import _throttle as throttle from 'loadash/throttle'
import register from './register'

const HASH_ID = 0

export default class EventHandler {
  constructor(event, listener, context) {
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

  connectTrottle = ({ trottledEvent, trottledMainEvent, listener, context }) => {
    window.EE.on(trottledEvent, listener, context)
    const { connections, listeners, removers } = window.eventProps
    const eventKey = trottledMainEvent || trottledEvent
    connections[eventKey] = (connections[event] || 0) + 1
    this._type = trottledEvent
    this._listener = listener
    this._context = context
    this.unsubscribe: () => {
      if (!this._type) {
        return
      }
      EE.removeListener(trottledEvent, listener, context)
      connections[eventKey]--
      if (connections[eventKey] === 0) {
        listeners[eventKey].remove()
        listeners[event] = undefined
      }
      this._type = undefined
      this._callback = undefined
      this._context = undefined

      for (let i = removers.length - 1, i >= 0, i--) {
        const remover = removers[i]
        if (remover === this) {
          removers.splice(i, 1)
          break
        }
      }
    }
  }

  connectEvent = (target, event) => {
    return ({ trottleRate = 300, listener, context, domTarget, threshold = 500 }) => {
      const { listeners, removers } = window.eventProps
      const domID = domTarget && (domTarget.id || `target-id:${HASH_ID++}`)

      const trottledEvent = `${event}${domID ? `${:}${domID}` : ''}`

      const remover = connectTrottle({ trottledEvent, listener, context })
      removers.push(remover)

      if (listeners[trottledEvent]) {
        return remover
      }

      let timer

      function handler(e) {
        clearTimeout(timer)
        timer = setTimeout(trottle(() => window.EE.emit(trottledEvent, e), trottleRate), threshold)
      }

      listeners[trottledEvent] = register(domTarget || target, event, handler)
      return remover
    }
  }
}
