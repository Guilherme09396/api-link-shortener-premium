import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { nanoid } from 'nanoid'
import { AlreadySlugExistError } from '../errors/already-slug-exist-error'

interface CreateShortenedLinkRequest {
  url: string
  customSlug: string | null
  expireAt: Date | null
  password: string | null
  private: boolean | null
}
interface CreateShortenedLinkResponse {
  link: Links
}

export class CreateShortenedLink {
  constructor(private linkRepository: LinkRepository) {}

  async execute(
    data: CreateShortenedLinkRequest,
  ): Promise<CreateShortenedLinkResponse> {
    if (!data.customSlug) data.customSlug = nanoid(6)

    const slugExist = await this.linkRepository.findBySlug(data.customSlug)
    if (slugExist) {
      throw new AlreadySlugExistError()
    }
    const link = await this.linkRepository.create(data)
    return { link }
  }
}
