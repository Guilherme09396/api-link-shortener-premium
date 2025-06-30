import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeGetStatsService } from '@/services/factories/make-create-get-stats-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function getStats(req: Request, res: Response) {
  try {
    const getStatsSchema = z.object({
      slug: z.string(),
    })

    const { slug } = getStatsSchema.parse(req.params)

    const getStatsService = makeGetStatsService()
    const stats = await getStatsService.execute({ slug, userId: req.userId! })
    res.json(stats)
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
      return
    }

    throw e
  }
}
