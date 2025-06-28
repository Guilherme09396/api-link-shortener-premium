import { env } from '@/env'
import {
  createShortenedLinkSchema,
  createShortenedLinkSchemaLogged,
} from '@/repositories/schemas/create-shortened-link-schema'
import { AlreadySlugExistError } from '@/services/errors/already-slug-exist-error'
import { makeCreateShortenedLinkService } from '@/services/factories/make-create-shortened-link-service'
import { Request, Response } from 'express'

export async function createShortenedLink(req: Request, res: Response) {
  try {
    let schema
    if (req.userLogged) {
      schema = createShortenedLinkSchemaLogged
    } else {
      schema = createShortenedLinkSchema
    }
    console.log(req.userId)
    const data = schema.parse(req.body)
    const createShortenedLinkService = makeCreateShortenedLinkService()
    const { link } = await createShortenedLinkService.execute(data)
    const shortUrl = `${env.BASE_URL}/${link.customSlug}`
    res.status(201).json({ shortUrl })
  } catch (e) {
    if (e instanceof AlreadySlugExistError) {
      res.status(409).json({ error: e.message })
    } else {
      throw e
    }
  }
}
