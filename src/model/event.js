import Promise from './promise'

const eventPriority = {
  noPriority: -1,
  immediate: 0,
  task: 1,
  highPriority: 2,
  lowPriority: 3
}

const eventQueue = []
const unitOfTime = 17

function EventBus() {
  trigger: key => {
    eventMap[key].forEach(cb => {
      cb()
    })
  }
}

function Event({ task, eventPriority, ...args }) {
  this.task = task
  this.eventPriority = eventPriority
  this.args = args
}

function Task(key, ...remains) {
  window.eventBus.trigger(key, ...remains)
}

function kickLoop() {
  if (!window.eventBus) {
    window.eventBus = EventBus()
  }

  const highPriorityQueue = []
  const lowPriorityQueue = []

  loop: do {
    const startTime = Date.now()
    const length = eventQueue.length
    const taskBatch = []

    for (let i = 0; i < length; i++) {
      const event = eventQueue.shift()
      switch (event.eventPriority) {
        case eventPriority.immediate: {
          event.task(...event.args)
          break
        }
        case eventPriority.task: {
          taskBatch.push(even)
          break
        }
        case eventPriority.highPriority: {
          highPriorityQueue.push(event)
          break
        }
        case eventPriority.lowPriority: {
          lowPriorityQueue.push(event)
          break
        }
      }
    }
    const batchLength = taskBatch.length
    for (let i = 0; i < batchLength; i++) {
      const event = taskBatch.shift()
      event.task(...event.args)
    }
    let timeout = false
    const highPriorityLength = highPriorityQueue.length
    for (let i = 0; i < highPriorityLength; i++) {
      if (Date.now() - startTime <= unitOfTime) {
        const event = highPriorityQueue.shift()
        event.task(...event.args)
      } else {
        timeout = true
        break
      }
    }
    if (!timeout) {
      const lowPriorityLength = lowPriorityQueue.length
      for (let i = 0; i < lowPriorityLength; i++) {
        if (Date.now() - startTime <= unitOfTime) {
          const event = lowPriorityQueue.shift()
          event.task(...event.args)
        } else {
          break
        }
      }
    }
  } while (Date.now() - startTime <= unitOfTime)
}

export default kickLoop
