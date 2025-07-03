import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeCheckLinkService } from '@/services/factories/make-check-link-print-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function linkIsPrivate(req: Request, res: Response) {
  try {
    const linkIsPrivateSchema = z.object({
      slug: z.string(),
    })

    const {slug} = linkIsPrivateSchema.parse(req.params)
    const checkLinkService = makeCheckLinkService()
    const {isPrivate} = await checkLinkService.execute({customSlug: slug})

    res.status(200).json({isPrivate})
   
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
      return
    }

    throw e
  }
}
