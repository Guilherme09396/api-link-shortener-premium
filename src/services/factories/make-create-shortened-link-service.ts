import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'
import { CreateShortenedLink } from '../link/create-shortened-link'

export function makeCreateShortenedLinkService() {
  const linkRepository = new PrismaLinkRepository()
  return new CreateShortenedLink(linkRepository)
}
