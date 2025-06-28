import { createClient } from 'redis'

export const redisConnection = createClient()
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
