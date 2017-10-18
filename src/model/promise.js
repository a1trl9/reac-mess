class Promise {
  constructor(func) {
    this.promiseState = 'pending'
    this.resolveResult = undefined
    this.rejectResult = undefined
    this.thenFunc = null
    this.errFunc = null
    func(this.resolve, this.reject)
  }

  then = thenFunc => {
    return new Promise((resolve, reject) => {
      this.thenFunc = result => {
        const value = thenFunc(result)
        resolve(value)
      }
      if (this.resolveResult !== undefined) {
        this.thenFunc(this.resolveResult)
      }
    })
  }

  err = errFunc => {
    return new Promise((resolve, reject) => {
      this.errFunc = err => {
        const value = errFunc(err)
        reject(value)
      }
      if (this.rejectResult !== undefined) {
        this.errFunc(this.rejectResult)
      }
    })
  }

  resolve = value => {
    this.resolveResult = value || null
    if (this.thenFunc) {
      this.thenFunc(this.resolveResult)
    }
  }

  reject = err => {
    this.rejectResult = err || null
    if (this.errFunc) {
      this.errFunc(this.rejectResult)
    }
  }
}

Promise.all = promiseList => {
  const resultList = []
  const errList = []
  let unifiedResolve = null
  let unifiedReject = null
  const p = new Promise((resolve, reject) => {
    unifiedResolve = resolve
    unifiedReject = reject
    checkIfAllFinish()
  })

  function checkIfAllFinish() {
    if (resultList.length + errList.length == promiseList.length) {
      if (resultList.length) {
        unifiedResolve(resultList)
      }
      if (errList.length) {
        unifiedReject(errList)
      }
    }
  }

  promiseList.forEach(promise => {
    promise
      .then(value => resultList.push(value) && checkIfAllFinish())
      .err(err => errList.push(err) && checkIfAllFinish())
  })

  return p
}

export default Promise
