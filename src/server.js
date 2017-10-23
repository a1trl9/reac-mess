import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app'
import express from 'express'
import path from 'path'
import fs from 'fs'

export default function server() {
  const app = express()
  app.use(express.static(path.join(__dirname)))

  app.use('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, data) => {
      if (err) throw err
      const content = ReactDOMServer.renderToString(<App />)
      const html = data.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${content}<\/div>`
      )
      res.status(200)
      res.send(html)
    })
  })
  app.listen('1763')
}

server()
