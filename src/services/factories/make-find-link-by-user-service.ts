import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'
import { FindLinkByUser } from '../link/find-link-by-user'

export function makeFindLinkByUserService() {
  const linkRepository = new PrismaLinkRepository()
  return new FindLinkByUser(linkRepository)
}
