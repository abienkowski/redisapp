// -- --
// -- delay.js
const express = require('express')
const router = express.Router()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

router.get('/delay/:seconds', (req, res, next) => {

  const seconds = req.params.seconds

  sleep(seconds * 1000).then(() => {
    const resp = {
      delay: seconds
    }

    res.json(resp)
  })
})

module.exports = router
