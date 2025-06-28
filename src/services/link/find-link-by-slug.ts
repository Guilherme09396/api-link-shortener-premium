import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LinkHasExpiredError } from '../errors/link-has-expired-error'

interface FindLinkBySlugRequest {
  slug: string
}
interface FindLinkBySlugResponse {
  link: Links
}

export class FindLinkBySlug {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    slug,
  }: FindLinkBySlugRequest): Promise<FindLinkBySlugResponse> {
    const link = await this.linkRepository.findBySlug(slug)
    if (!link) {
      throw new ResourceNotFoundError()
    }
    const linkHasExpired = dayjs().isAfter(dayjs(link.expireAt))

    if (linkHasExpired) {
      throw new LinkHasExpiredError()
    }

    return { link }
  }
}
