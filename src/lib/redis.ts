import { env } from '@/env'
import { createClient } from 'redis'

export const redisConnection = createClient({
  url: env.URL_REDIS
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()
