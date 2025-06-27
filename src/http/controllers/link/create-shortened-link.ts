import { env } from '@/env'
import { makeCreateShortenedLinkService } from '@/services/factories/make-create-shortened-link-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createShortenedLink(req: Request, res: Response) {
  const createShortenedLinkSchema = z.object({
    url: z.string(),
    customSlug: z.string().nullish().default(null),
    expireAt: z.date().nullish().default(null),
    password: z.string().nullish().default(null),
    private: z.boolean().nullish().default(null),
  })

  const data = createShortenedLinkSchema.parse(req.body)
  const createShortenedLinkService = makeCreateShortenedLinkService()
  const { link } = await createShortenedLinkService.execute(data)
  const shortUrl = `${env.BASE_URL}/${link.customSlug}`
  res.status(201).json({ shortUrl })
}
