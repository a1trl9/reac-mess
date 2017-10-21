import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './index'

export default function PgRouter() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  )
}
