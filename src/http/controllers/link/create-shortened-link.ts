import { env } from '@/env'
import { AlreadySlugExistError } from '@/services/errors/already-slug-exist-error'
import { LinkPasswordIsRequiredError } from '@/services/errors/link-password-is-required-error'
import { makeCreateShortenedLinkService } from '@/services/factories/make-create-shortened-link-service'
import { createLinkSchema } from '@/utils/link/create-shortened-link-util'
import { Request, Response } from 'express'

export async function createShortenedLink(req: Request, res: Response) {
  try {
    const schema = createLinkSchema(req.userId)
    const data = schema.parse(req.body)

    if (data.private && !data.password) {
      throw new LinkPasswordIsRequiredError()
    }
    const linkSave = { ...data, user_id: req.userId }

    const createShortenedLinkService = makeCreateShortenedLinkService()
    const { link } = await createShortenedLinkService.execute(linkSave)

    const shortUrl = `${env.BASE_URL}/${link.customSlug}`

    res.status(201).json({ shortUrl })
  } catch (e) {
    if (e instanceof AlreadySlugExistError) {
      res.status(409).json({ error: e.message })
      return
    }
    
    if (e instanceof LinkPasswordIsRequiredError) {
      res.status(400).json({ error: e.message })
      return
    }

    throw e
  }
}
