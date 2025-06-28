import { Links, Prisma } from 'generated/prisma'

export interface LinkRepository {
  create(data: Prisma.LinksUncheckedCreateInput): Promise<Links>
  findBySlug(slug: string): Promise<Links | null>
}
