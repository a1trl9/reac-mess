export default function register(target, event, handler) {
  let add = 'addEventListener'
  let remove = 'removeEventListener'
  let eventType = event

  if (!target.addEventListener && this.attachEvent) {
    add = 'attachEvent'
    remove = 'detachEvent'
    eventType = `on${event}`
  }

  target[add](eventType, handler)

  return {
    remove: () => {
      target[remove](eventType, handler)
    }
  }
}
