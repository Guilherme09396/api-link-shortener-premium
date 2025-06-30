import { ClickRepository } from '@/repositories/click-repository'
import { LinkRepository } from '@/repositories/link-repository'
import { UserRepository } from '@/repositories/user-repository'
import { Prisma } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetStatsRequest {
  slug: string,
  userId: string
}
interface GetStatsResponse {
  totalAccesses: number
  clicks: Prisma.ClicksUncheckedUpdateInput[]
}

export class GetStats {
  constructor(
    private clickRepository: ClickRepository,
    private linkRepository: LinkRepository,
  ) {}

  async execute({ slug, userId }: GetStatsRequest): Promise<GetStatsResponse> {
    const link = await this.linkRepository.findBySlug(slug)
    if (!link) {
      throw new ResourceNotFoundError()
    }

    if(link.user_id !== userId) {
        throw new ResourceNotFoundError()
    }

    const clicks = await this.clickRepository.findClicksByLinkId(link.id)
    return {
      totalAccesses: clicks.length,
      clicks,
    }
  }
}
