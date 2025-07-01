import { CheckLinkPrivate } from '../link/check-link-private'
import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'

export function makeCheckLinkService() {
  const linkkRepository = new PrismaLinkRepository()
  return new CheckLinkPrivate(linkkRepository)
}
