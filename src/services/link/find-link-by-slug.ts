import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

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
    return { link }
  }
}
