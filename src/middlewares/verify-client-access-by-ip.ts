import { redisConnection } from '@/lib/redis'
import { NextFunction, Request, Response } from 'express'

export async function blocksLinkCreationPerMinute(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const redis = await redisConnection
  const ipClient = req.ipClient
  const valueAccess = Number(await redis.get(`${ipClient}-minute`)) || 0
  const nextValue = valueAccess + 1

  if (nextValue > 3) {
    res.status(429).json({ error: 'Limit per minute exceeded' })
    return
  }

  await redis.set(`${ipClient}-minute`, nextValue, {
    expiration: { type: 'EX', value: 60 },
  })
  next()
}

export async function blocksLinkCreationPerDay(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const redis = await redisConnection
  const ipClient = req.ipClient
  const valueAccess = Number(await redis.get(`${ipClient}-day`)) || 0
  const nextValue = valueAccess + 1

  if (nextValue > 30) {
    res.status(429).json({ error: 'Limit per 24 hours exceeded' })
    return
  }

  await redis.set(`${ipClient}-day`, nextValue, {
    expiration: { type: 'EX', value: 60 * 60 * 24 },
  })
  next()
}
