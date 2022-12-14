// -- --
// -- healthz.js
const express = require('express')
const router = express.Router()

router.get('/healthz', (req, res, next) => {
  const statusOK = {
    status: 'OK'
  }

  res.json(statusOK)
})

router.get('/readyz', (req, res, next) => {
  const statusOK = {
    status: 'OK'
  }

  res.json(statusOK)
})

router.get('/readyz/enable', (req, res, next) => {
  res.sendStatus(202)
})

router.get('/readyz/disable', (req, res, next) => {
  res.sendStatus(202)
})

module.exports = router
