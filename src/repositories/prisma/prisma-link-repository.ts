import { Prisma, Links } from 'generated/prisma'
import { LinkRepository } from '../link-repository'
import { prisma } from '@/lib/prisma'

export class PrismaLinkRepository implements LinkRepository {
  async create(data: Prisma.LinksCreateInput): Promise<Links> {
    const link = await prisma.links.create({
      data,
    })
    return link
  }
}
