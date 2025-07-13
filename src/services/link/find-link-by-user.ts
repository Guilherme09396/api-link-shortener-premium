import { LinkRepository } from '@/repositories/link-repository'
import { Links, Prisma } from 'generated/prisma'

type FinByLinkReturn = Prisma.LinksUncheckedUpdateInput & {clicks: number}
interface FindLinkByUserRequest {
    userId: string
    orderByCreatedAt: 'asc' | 'desc' | null
}
interface FindLinkByUserResponse {
  links: FinByLinkReturn[]
}

export class FindLinkByUser {
  constructor(private linkRepository: LinkRepository) {}

  async execute({userId, orderByCreatedAt}: FindLinkByUserRequest): Promise<FindLinkByUserResponse> {
    orderByCreatedAt = orderByCreatedAt ?? 'asc'
    const linksFindByUser = await this.linkRepository.findByUser(userId, orderByCreatedAt )
     const links = linksFindByUser.map(item => {
      const {_count, ...rest} = item
      const obj = {...rest, clicks: _count.Clicks}
      return obj
    })
    return {links}
  }
}
