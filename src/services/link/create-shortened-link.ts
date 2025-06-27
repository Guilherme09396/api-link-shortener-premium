import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { nanoid } from 'nanoid'

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

    const link = await this.linkRepository.create(data)
    return { link }
  }
}
