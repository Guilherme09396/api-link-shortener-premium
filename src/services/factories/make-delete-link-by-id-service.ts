import { PrismaLinkRepository } from '@/repositories/prisma/prisma-link-repository'
import { DeleteLinkById } from '../link/delete-link-by-id'

export function makeDeleteLinkByIdService() {
  const linkRepository = new PrismaLinkRepository()
  return new DeleteLinkById(linkRepository)
}
