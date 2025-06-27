// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(403).json({ error: 'Invalid format', issues: err.format() })
  } else {
    res.status(500).json({
      error: 'Erro interno do servidor',
    })
  }
}
