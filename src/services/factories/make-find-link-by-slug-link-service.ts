import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'
import { FindLinkBySlug } from '../link/find-link-by-slug'

export function makeFindByLinkSlugService() {
  const linkRepository = new PrismaLinkRepository()
  return new FindLinkBySlug(linkRepository)
}
