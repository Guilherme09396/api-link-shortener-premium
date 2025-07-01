import { redisConnection } from '@/lib/redis'

export async function getCache(key: string) {
  const redis = await redisConnection
  const linkIsCached = await redis.get(key)

  return linkIsCached
}

export async function setCache(key: string, object: string, expiration: number) {
  const redis = await redisConnection
  await redis.set(key, object, {
    expiration: { type: 'EX', value: expiration },
  })
}
