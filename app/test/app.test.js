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

test('liveness probe', async () => {
  const resp = await supertest(app).get('/healthz')

  expect(resp.status).toEqual(200)
  expect(resp.body.status).toBe('OK')
})

test('readiness probe', async () => {
  const resp = await supertest(app).get('/readyz')

  expect(resp.status).toEqual(200)
  expect(resp.body.status).toBe('OK')
})

test('kubernetes lb enable signal', async () => {
  const resp = await supertest(app).get('/readyz/enable')

  expect(resp.status).toEqual(202)
  expect(resp.body).toStrictEqual({})
})

test('kubernetes lb disable signal', async () => {
  const resp = await supertest(app).get('/readyz/disable')

  expect(resp.status).toEqual(202)
  expect(resp.body).toStrictEqual({})
})

test('get env ', async () => {
  const resp = await supertest(app).get('/env')

  expect(resp.status).toEqual(200)
  expect(resp.body.length).toBeGreaterThan(0)
})

test('get headers ', async () => {
  const resp = await supertest(app).get('/headers')

  expect(resp.status).toEqual(200)
})

test('get delay ', async () => {
  const resp = await supertest(app).get('/delay/1')

  expect(resp.status).toEqual(200)
  expect(resp.body).toStrictEqual({ delay: '1' })
})
