import { LinkHasExpiredError } from '@/services/errors/link-has-expired-error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findByLinkBySlug(req: Request, res: Response) {
  try {
    const findByLinkBySlugSchema = z.object({
      slug: z.string(),
    })

    const { slug } = findByLinkBySlugSchema.parse(req.params)
    const finByLinkBySlugService = makeFindByLinkSlugService()

    const { link } = await finByLinkBySlugService.execute({ slug })
    res.status(200).redirect(link.url)
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
      return
    }

    if (e instanceof LinkHasExpiredError) {
      res.status(410).json({ error: e.message })
      return
    }

    throw e
  }
}
