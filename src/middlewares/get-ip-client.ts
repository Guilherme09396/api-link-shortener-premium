import { NextFunction, Request, Response } from 'express'

export async function getIpClient(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress

  req.ipClient = ip
  next()
}
