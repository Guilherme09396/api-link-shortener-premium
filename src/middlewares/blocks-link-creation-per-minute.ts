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
  const exists = await redis.exists(`${ipClient}-minute`);

  if (nextValue > 3) {
    res.status(429).json({ error: 'Limit per minute exceeded' })
    return
  }

  if (!exists) {
    await redis.set(`${ipClient}-minute`, nextValue, {
      expiration: { type: 'EX', value: 60 },
    })
    
  } else {
    await redis.set(`${ipClient}-minute`, nextValue, {
      expiration: "KEEPTTL",
    })
  }
  next()
}


