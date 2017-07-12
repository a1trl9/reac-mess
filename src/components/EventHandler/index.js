import EventEmitter from 'eventemitter3'
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
    this.connectTrottle(event, listener, context)
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

  connectContinuousEvent = (target, mainEvent, event) => {
    return (trottleRate, listener, options) => {
      const { context, domTarget } = options
      const { removers } = window.eventProps
      const domID = domTarget && (domTarget.id || `target-id:${HASH_ID++}`)
      const targetFlag = domID ? `:${domID}` : ''

      const throttledStartEvent = `${mainEvent}Start:${trottleRate}${targetFlag}`
      const throttledEndEvent = `${mainEvent}End:${trottleRate}${targetFlag}`
      const throttledMainEvent = `${mainEvent}${trottleRate}${targetFlag}`
      const throttledEvent = `${event}${trottleRate}${targetFlag}`

      const remover = connectTrottle({ trottledEvent, trottledMainEvent, listener, context })
      removers.push(remover)

      if (listeners[trottledMainEvent]) {
        return remover
      }

      // TODO: argumentedEvent

      let timer

      function handler(e) {
        if (!timer) {
          augumentedEvent.start.update(e)
          window.EE.emit(trottledStartEvent, e, augumentedEvent.start)
        }
        clearTimeout(timer)
        augumentedEvent.main.update(e)
        window.EE.emit(throttledMainEvent, e, augumentedEvent.main)
        timer = setTimeout((e) => { endCallback(e) }, trottleRate)
      }

      function endCallback(e) {
        augumented.end.update(e)
        window.EE.emit(throttledEndEvent, e, augumentedEvent.end)
        timer = null
      }
    }
  }

  connectDiscreteEvent(target, event) => {
    return (trottleRate, listener, options) => {
      const { context, domTarget } = options
      const { listeners, removers } = window.eventProps
      const domID = domTarget && (domTarget.id || `target-id:${HASH_ID++}`)

      const trottledEvent = `${event}${domID ? `${:}${domID}` : ''}`

      const remover = connectTrottle({ trottledEvent, listener, context })
      removers.push(remover)

      if (listeners[trottledEvent]) {
        return remover
      }

      // TODO:

      function handler(e) {
        argumentedEvent.update(e)
        window.EE.emit(trottledEvent, e, argumentedEvent)
      }

      listeners[trottledEvent] = register(domTarget || target, event, handler)
      return remover
    }
  }
}
