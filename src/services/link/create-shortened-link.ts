import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { nanoid } from 'nanoid'

interface CreateShortenedLinkRequest {
  id?: string
  url: string
  customSlug?: string
  expireAt?: string
  password?: string
  private?: boolean
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
    if (!data.private) {
      data.private = false
      data.password = ''
    }

    const link = await this.linkRepository.create(data)
    return { link }
  }
}
