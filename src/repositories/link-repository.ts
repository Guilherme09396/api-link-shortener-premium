import { Links, Prisma } from 'generated/prisma'

type findByUserReturn = Prisma.LinksGetPayload<{
  omit: {private: true, user_id: true, password: true}
  include: {_count: true}
}>

export interface LinkRepository {
  create(data: Prisma.LinksUncheckedCreateInput): Promise<Links>
  findBySlug(slug: string): Promise<Links | null>
  findById(id: string): Promise<Links | null>
  findByUser(userId: string, orderByCreatedAt: 'asc' | 'desc'): Promise<findByUserReturn[]>
  deleteById(id: string): Promise<Links>
  linkIsPrivate(slug: string): Promise<boolean>
}
