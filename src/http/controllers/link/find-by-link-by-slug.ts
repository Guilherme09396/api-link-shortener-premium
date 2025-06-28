import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findByLinkBySlug(req: Request, res: Response) {
  try {
    const createShortenedLinkSchema = z.object({
      slug: z.string(),
    })

    const { slug } = createShortenedLinkSchema.parse(req.params)
    const createShortenedLinkService = makeFindByLinkSlugService()
    const { link } = await createShortenedLinkService.execute({ slug })
    res.status(200).redirect(link.url)
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
    } else {
      throw e
    }
  }
}
