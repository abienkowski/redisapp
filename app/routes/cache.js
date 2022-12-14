// -- --
// -- cache.js
const express = require('express')
const router = express.Router()
const getRedisClient = require('../helpers/redis-helper')

// --
const redisClient = getRedisClient(process.env.REDIS_URL)

router.get('/cache/:key', (req, res, next) => {
  const key = req.params.key

  if (redisClient) {
    // let pong
    let value

    (async () => {
      // pong = await redisClient.ping()
      value = await redisClient.get(key)
    })()

    res.json(value)
  } else {
    res.status(503).send({
      message: 'redis not connected'
    })
  }
})

router.post('/cache/:key', (req, res, next) => {
  const key = req.params.key

  console.log(`post cache ${key} client ${redisClient}`)
  if (redisClient) {
    // let pong
    let value

    (async () => {
      // pong = await redisClient.ping()
      value = await redisClient.set(key, req.body)
    })()

    res.json(value)
  } else {
    res.status(503).send({
      message: 'redis not connected'
    })
  }
})

router.delete('/cache/:key', (req, res, next) => {
  const key = req.params.key

  if (redisClient) {
    (async () => {
      await redisClient.del(key)
    })()

    res.sendStatus(202)
  } else {
    res.status(503).send({
      message: 'redis not connected'
    })
  }
})

module.exports = router
