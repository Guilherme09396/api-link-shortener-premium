import { CredentialsInvalidError } from '@/services/errors/credentials-invalid-error'
import { LinkHasExpiredError } from '@/services/errors/link-has-expired-error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeCreateClickService } from '@/services/factories/make-create-create-click-service'
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service'
import { getCache, setCache, } from '@/utils/cache-util'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function findByLinkBySlug(req: Request, res: Response) {
  try {
    const findByLinkBySlugSchema = z.object({
      slug: z.string(),
    })

    const { slug } = findByLinkBySlugSchema.parse(req.params)
    const passwordLink = req.headers['password-link'] || await getCache(`${slug}-slugPrivate`);
    const createClickService = makeCreateClickService()
    const finByLinkBySlugService = makeFindByLinkSlugService()
    const linkInCache = await getCache(slug)
    const ip = req.ipClient
    const userAgent = req.headers['user-agent']
    if (linkInCache) {
      const linkObject: { url: string; id: string } = JSON.parse(linkInCache)
      res.status(200).redirect(linkObject.url)
      createClickService.execute({ ip, userAgent, linkId: linkObject.id })
      return
    }

    const { link } = await finByLinkBySlugService.execute({
      slug,
      password: passwordLink,
    })
    await createClickService.execute({
      ip,
      userAgent,
      linkId: link.id,
    })

    await setCache(slug, JSON.stringify(link), 60)

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
