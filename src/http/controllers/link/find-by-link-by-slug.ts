import { CredentialsInvalidError } from '@/services/errors/credentials-invalid-error'
import { LinkHasExpiredError } from '@/services/errors/link-has-expired-error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service'
import { getCacheLink, setCacheLink } from '@/utils/link/cache-link-util'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findByLinkBySlug(req: Request, res: Response) {
  try {
    const findByLinkBySlugSchema = z.object({
      slug: z.string(),
    })

    const { slug } = findByLinkBySlugSchema.parse(req.params)
    const passwordLink = req.header('password-link')
    const finByLinkBySlugService = makeFindByLinkSlugService()
    const linkInCache = await getCacheLink(slug)

    if (linkInCache) {
      res.status(200).redirect(linkInCache)
      return
    }

    const { link } = await finByLinkBySlugService.execute({
      slug,
      password: passwordLink,
    })
    await setCacheLink(slug, link.url)

    setTimeout(() => {
      res.status(200).redirect(link.url)
    }, 4000)
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
      return
    }

    if (e instanceof LinkHasExpiredError) {
      res.status(410).json({ error: e.message })
      return
    }

    if (e instanceof CredentialsInvalidError) {
      res.status(401).json({ error: e.message })
      return
    }

    throw e
  }
}
