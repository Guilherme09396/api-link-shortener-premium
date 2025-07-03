import { Links, Prisma } from 'generated/prisma'

export interface LinkRepository {
  create(data: Prisma.LinksUncheckedCreateInput): Promise<Links>
  findBySlug(slug: string): Promise<Links | null>
  findById(id: string): Promise<Links | null>
  findByUser(userId: string): Promise<Prisma.LinksUncheckedUpdateInput[]>
  deleteById(id: string): Promise<Links>
  linkIsPrivate(slug: string): Promise<boolean>
}
