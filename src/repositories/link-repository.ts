import { Links, Prisma } from 'generated/prisma'

export interface LinkRepository {
  create(data: Prisma.LinksCreateInput): Promise<Links>
  findBySlug(slug: string): Promise<Links | null>
}
