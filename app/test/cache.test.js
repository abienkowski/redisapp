// -- --
// -- app.test.js
const supertest = require('supertest')
jest.mock('redis', () => jest.requireActual('redis-mock'))
const getRedisClient = require('../helpers/redis-helper')
process.env.REDIS_URL = 'redis://fake:6379'
const redisClient = getRedisClient(process.env.REDIS_URL)
redisClient.isReady = true
redisClient.isOpen = true
console.log(`redis client ${redisClient.isReady}`)
const app = require('../app')

console.log(`keys: ${Object.keys(redisClient)}`)
console.log(`keys: ${Object.keys(redisClient._redisMock)}`)

describe('cache', () => {
  test('cache post', async () => {
    const payload = {
      unicorn: 'magic'
    }
    const resp = await supertest(app)
      .post('/cache/foo')
      .send(payload)

    expect(resp.status).toEqual(200)
  })
  test('cache get', async () => {
    const resp = await supertest(app)
      .get('/cache/foo')

    expect(resp.status).toEqual(200)
  })
  test('cache delete', async () => {
    const resp = await supertest(app)
      .delete('/cache/foo')

    expect(resp.status).toEqual(202)
  })
})
