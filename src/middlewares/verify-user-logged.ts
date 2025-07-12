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
      const payload = jwt.verify(token, env.JWT_SECRET) as {id: string, iat: number, exp: number}
      req.userId = payload.id
    }
  } catch (e) {
    console.error(e)
  } finally {
    next()
  }
}