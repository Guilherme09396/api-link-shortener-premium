import { createShortenedLinkSchema } from '@/repositories/schemas/create-shortened-link-schema'
import { createShortenedLinkSchemaLogged } from '@/repositories/schemas/create-shortened-link-schema-logged'

export const createLinkSchema = (userId: string | undefined) => {
  let schema
  if (!userId) {
    schema = createShortenedLinkSchema
  } else {
    schema = createShortenedLinkSchemaLogged
  }
  return schema
}
