import { LinkRepository } from '@/repositories/link-repository'
import { Links, Prisma } from 'generated/prisma'

interface FindLinkByUserRequest {
    userId: string
}
interface FindLinkByUserResponse {
  links: Prisma.LinksUncheckedUpdateInput[]
}

export class FindLinkByUser {
  constructor(private linkRepository: LinkRepository) {}

  async execute({userId}: FindLinkByUserRequest): Promise<FindLinkByUserResponse> {
    const links = await this.linkRepository.findByUser(userId)
    return {links}
  }
}
