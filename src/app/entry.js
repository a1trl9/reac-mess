import React from 'react'
import { hydrate } from 'react-dom'
import Router from './router'

hydrate(<Router />, document.getElementById('root'))
