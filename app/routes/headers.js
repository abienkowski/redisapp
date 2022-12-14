// -- --
// -- env.js
const express = require('express')
const router = express.Router()

router.get('/headers', (req, res, next) => {
  const headers = req.headers

  res.json(headers)
})

module.exports = router
