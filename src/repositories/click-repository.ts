import { Clicks, Prisma } from 'generated/prisma'

export interface ClickRepository {
  create(data: Prisma.ClicksUncheckedCreateInput): Promise<Clicks>
}
