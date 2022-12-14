// -- --
// -- env.js
const express = require('express')
const router = express.Router()

router.get('/env', (req, res, next) => {
  const env = Object.keys(process.env).map((key) => `${key}=${process.env[key]}`)

  res.json(env)
})

module.exports = router
