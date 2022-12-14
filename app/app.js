// -- --
// -- app.js
const express = require('express')
const app = express()
const redis = require('redis')

// -- create redis client
const redisClient = redis.createClient({ url: process.env.REDIS_URL })
redisClient.connect()

const delay = require('./routes/delay')
const env = require('./routes/env')
const healthz = require('./routes/healthz')
const headers = require('./routes/headers')

// -- configure middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// -- add routes
app.use('/', delay)
app.use('/', env)
app.use('/', healthz)
app.use('/', headers)

// -- export app
module.exports = app
