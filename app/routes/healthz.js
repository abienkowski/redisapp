// -- --
// -- healthz.js
const express = require('express');
const router = express.Router();

router.get('/healthz', (req, res, next) => {
  const statusOK = {
    "status": "OK"
  }

  res.json(statusOK);
});

router.get('/readyz', (req, res, next) => {
  const statusOK = {
    "status": "OK"
  }

  res.json(statusOK);
});

module.exports = router;
