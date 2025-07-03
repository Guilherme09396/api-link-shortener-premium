import { NextFunction, Request, Response } from 'express'

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
