import { Prisma, Clicks } from 'generated/prisma'
import { prisma } from '@/lib/prisma'
import { ClickRepository } from '../click-repository'

export class PrismaClickRepository implements ClickRepository {
  async findClicksByLinkId(linkId: string): Promise<Prisma.ClicksUncheckedUpdateInput[]> {
    const clicks = await prisma.clicks.findMany({
      where: { link_id: linkId },
      omit: {id: true, link_id: true}
    })
    return clicks
  }

  async create(data: Prisma.ClicksUncheckedCreateInput): Promise<Clicks> {
    const click = await prisma.clicks.create({
      data,
    })

    return click
  }
}
