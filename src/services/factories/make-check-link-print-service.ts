import { LinkIsPrivate } from '../link/link-is-private'
import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'

export function makeCheckLinkService() {
  const linkRepository = new PrismaLinkRepository()
  return new LinkIsPrivate(linkRepository)
}
