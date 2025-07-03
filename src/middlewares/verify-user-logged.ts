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