import { Prisma, Clicks } from 'generated/prisma'
import { prisma } from '@/lib/prisma'
import { ClickRepository } from '../click-repository'

export class PrismaClickRepository implements ClickRepository {
  async create(data: Prisma.ClicksUncheckedCreateInput): Promise<Clicks> {
    const click = await prisma.clicks.create({
      data,
    })

    return click
  }
}
