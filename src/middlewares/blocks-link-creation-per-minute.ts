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


