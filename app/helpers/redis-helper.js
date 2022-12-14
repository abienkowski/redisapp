// -- --
// -- redis-helper.js
const redis = require('redis')

// -- create redis client singleton pattern
let client = null
function getRedisClient (url) {
  if (!client) {
    client = redis.createClient({ url })

    client.on('connect', () => {
      console.log('redis connected')
    })

    client.on('ready', () => {
      console.log('redis ready')
    })

    client.on('end', () => {
      console.log('redis disconnected')
    })

    client.on('reconnecting', () => {
      console.log('redis reconnecting')
    })

    client.on('error', (err) => {
      console.log(`redis error ${err}`)
    })
  }

  return client
}

module.exports = getRedisClient
