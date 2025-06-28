import { redisConnection } from '@/lib/redis'

export async function getCacheLink(slug: string) {
  const redis = await redisConnection
  const linkIsCached = await redis.get(slug)

  return linkIsCached
}

export async function setCacheLink(slug: string, url: string) {
  const redis = await redisConnection
  await redis.set(slug, url, {
    expiration: { type: 'EX', value: 60 },
  })
}
