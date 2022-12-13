// -- --
// -- app.js
const express = require('express')
const healthz = require('./routes/healthz')
const app = express()

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/', healthz)

module.exports = app
