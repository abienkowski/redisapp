// -- --
// -- cache.js
const express = require('express')
const router = express.Router()
const getRedisClient = require('../helpers/redis-helper')
const redisClient = getRedisClient(process.env.REDIS_URL)

router.get('/cache/:key', (req, res, next) => {
  const key = req.params.key

  console.log(`GET /cache key ${key} client ${redisClient.isReady}`)
  if (redisClient && redisClient.isReady) {
    redisClient.get(key)
      .then((value) => {
        console.log(`then value ${value}`)
        if (value) {
          const data = JSON.parse(value)
          res.json(data)
        } else {
          res.sendStatus(404)
        }
      })
      .catch(err => {
        res.status(503).send({
          message: `${err}`
        })
      })
  } else {
    res.json({
      code: 400,
      message: 'Redis is Offline'
    })
  }
})

router.post('/cache/:key', (req, res, next) => {
  const key = req.params.key
  const payload = req.body
  const strPayload = JSON.stringify(payload)

  console.log(`POST /cache key ${key} payload ${strPayload} client ${redisClient.isReady}`)
  if (redisClient && redisClient.isReady) {
    (async () => {
      console.log('post await')
      await redisClient.set(key, strPayload)
    })()
    console.log('post await send status')
    res.sendStatus(202)
  } else {
    res.json({
      code: 400,
      message: 'Redis is Offline'
    })
  }
})

router.put('/cache/:key', (req, res, next) => {
  const key = req.params.key
  const payload = req.body
  const strPayload = JSON.stringify(payload)

  console.log(`PUT /cache key ${key} payload ${strPayload} client ${redisClient.isReady}`)
  if (redisClient && redisClient.isReady) {
    (async () => {
      console.log('post await')
      await redisClient.set(key, payload)
    })()
    console.log('post await send status')
    res.sendStatus(202)
  } else {
    res.json({
      code: 400,
      message: 'Redis is Offline'
    })
  }
})

router.delete('/cache/:key', (req, res, next) => {
  const key = req.params.key

  console.log(`DELETE /cache key ${key} client ${redisClient.isReady}`)
  if (redisClient && redisClient.isReady) {
    (async () => {
      console.log('delete await')
      await redisClient.del(key)
    })()
    console.log('delete await send status')
    res.sendStatus(202)
  } else {
    res.json({
      code: 400,
      message: 'Redis is Offline'
    })
  }
})

module.exports = router
