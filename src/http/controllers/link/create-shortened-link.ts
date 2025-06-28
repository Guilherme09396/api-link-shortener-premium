import { env } from '@/env'
import {
  createShortenedLinkSchema,
  createShortenedLinkSchemaLogged,
} from '@/repositories/schemas/create-shortened-link-schema'
import { AlreadySlugExistError } from '@/services/errors/already-slug-exist-error'
import { LinkPasswordIsRequiredError } from '@/services/errors/link-password-is-required-error'
import { makeCreateShortenedLinkService } from '@/services/factories/make-create-shortened-link-service'
import { Request, Response } from 'express'

export async function createShortenedLink(req: Request, res: Response) {
  try {
    let schema
    if (!req.userId) {
      schema = createShortenedLinkSchema
    } else {
      schema = createShortenedLinkSchemaLogged
    }
    const data = schema.parse(req.body)

    if (data.private && !data.password) {
      throw new LinkPasswordIsRequiredError()
    }

    const createShortenedLinkService = makeCreateShortenedLinkService()
    const { link } = await createShortenedLinkService.execute(data)
    const shortUrl = `${env.BASE_URL}/${link.customSlug}`
    res.status(201).json({ shortUrl })
  } catch (e) {
    if (e instanceof AlreadySlugExistError) {
      res.status(409).json({ error: e.message })
    } else if (e instanceof LinkPasswordIsRequiredError) {
      res.status(400).json({ error: e.message })
    } else {
      throw e
    }
  }
}
