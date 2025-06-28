import { z } from 'zod'

export const createShortenedLinkSchema = z.object({
  url: z.string(),
  customSlug: z.string().nullish(),
  expireAt: z.string().nullish(),
})
