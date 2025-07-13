import { makeFindLinkByUserService } from '@/services/factories/make-find-link-by-user-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findLinkByUser(req: Request, res: Response) {
  try {
    const findLinkByUserSchema = z.object({
      order: z.enum(['asc', 'desc']).nullish().default(null)
    })

    const {order} = findLinkByUserSchema.parse(req.query)
    const finLinkByUserService = makeFindLinkByUserService()

   const { links } = await finLinkByUserService.execute({userId: req.userId!, orderByCreatedAt: order})
   
    res.status(200).json({links})
  } catch (e) {
    throw e
  }
}
