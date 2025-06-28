import { z } from 'zod'

export const createShortenedLinkSchemaLogged = z.object({
  url: z.string(),
  customSlug: z.string().nullish(),
  expireAt: z.string().nullish(),
  password: z.string().nullish(),
  private: z.boolean().nullish(),
})
