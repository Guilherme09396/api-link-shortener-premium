import { redisConnection } from '@/lib/redis'
import { NextFunction, Request, Response } from 'express'

export async function blocksLinkCreationPerDay(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const redis = await redisConnection
  const ipClient = req.ipClient
  const valueAccess = Number(await redis.get(`${ipClient}-day`)) || 0
  const nextValue = valueAccess + 1
  const exists = await redis.exists(`${ipClient}-day`);

  if (nextValue > 30) {
    res.status(429).json({ error: 'Limit per 24 hours exceeded' })
    return
  }

  if (!exists) {
    await redis.set(`${ipClient}-day`, nextValue, {
      expiration: { type: 'EX', value: 60 * 60 * 24 },
    })
  } else {
    await redis.set(`${ipClient}-day`, nextValue, {
      expiration: "KEEPTTL"
    })
  }
  next()
}