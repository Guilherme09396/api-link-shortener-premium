import { env } from '@/env'
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Invalid format', issues: err.format() })
  } else {
    res.status(500).json({
      error: 'Erro interno do servidor',
    })

    if (env.NODE_ENV !== 'production') {
      console.error(err)
    }
  }
}
