import { Prisma, Links } from 'generated/prisma'
import { LinkRepository } from '../link-repository'
import { prisma } from '@/lib/prisma'

export class PrismaLinkRepository implements LinkRepository {
  async findBySlug(slug: string): Promise<Links | null> {
    const link = await prisma.links.findFirst({
      where: { customSlug: slug },
    })
    return link
  }

  async create(data: Prisma.LinksUncheckedCreateInput): Promise<Links> {
    const link = await prisma.links.create({
      data,
    })
    return link
  }
}
