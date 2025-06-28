import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LinkHasExpiredError } from '../errors/link-has-expired-error'
import { compare } from 'bcryptjs'
import { CredentialsInvalidError } from '../errors/credentials-invalid-error'

interface FindLinkBySlugRequest {
  slug: string
  password?: string
}
interface FindLinkBySlugResponse {
  link: Links
}

export class FindLinkBySlug {
  constructor(private linkRepository: LinkRepository) {}

  async execute({
    slug,
    password,
  }: FindLinkBySlugRequest): Promise<FindLinkBySlugResponse> {
    const link = await this.linkRepository.findBySlug(slug)
    if (!link) {
      throw new ResourceNotFoundError()
    }

    const linkHasExpired = dayjs().isAfter(dayjs(link.expireAt))
    if (linkHasExpired) {
      throw new LinkHasExpiredError()
    }

    if (link.private) {
      if (!password || !link.password) {
        throw new CredentialsInvalidError()
      }

      const passwordIsCorrect = await compare(password, link.password)

      if (!passwordIsCorrect) {
        throw new CredentialsInvalidError()
      }
    }

    return { link }
  }
}
