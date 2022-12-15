// -- --
// -- app.js
const express = require('express')
const app = express()
const getRedisClient = require('./helpers/redis-helper')

// -- create redis client
const redisClient = getRedisClient(process.env.REDIS_URL)
console.log(`redis client ${redisClient.isReady} @ ${process.env.REDIS_URL}`)
while (!redisClient.isOpen) {
  console.log(`connecting to redis @ ${process.env.REDIS_URL} ready: ${redisClient.isReady} connected: ${redisClient.isOpen}`);

  (async () => {
    await redisClient.connect()
    await new Promise(resolve => setTimeout(resolve, 100))
  })()
}

const cache = require('./routes/cache')
const delay = require('./routes/delay')
const env = require('./routes/env')
const healthz = require('./routes/healthz')
const headers = require('./routes/headers')

// -- configure middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// -- add routes
app.use('/', cache)
app.use('/', delay)
app.use('/', env)
app.use('/', healthz)
app.use('/', headers)

// -- export app
module.exports = app
