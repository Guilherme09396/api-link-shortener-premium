import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function verifyUserLogged(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const headers = req.headers.authorization
    req.userId = undefined
    if (headers) {
      const [_, token] = headers.split(' ')
      req.userId = jwt.verify(token, env.JWT_SECRET) as string
    }
  } catch (e) {
    console.error(e)
  } finally {
    next()
  }
}

export async function restrictedAccessLoggedInUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req
    if (userId) {
      next()
    } else {
      res.status(401).json({ error: 'Access restrict' })
    }
  } catch (e) {}
}
