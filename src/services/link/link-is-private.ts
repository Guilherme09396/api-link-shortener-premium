import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LinkHasExpiredError } from '../errors/link-has-expired-error'


interface LinkIsPrivateRequest {
    customSlug: string
}
interface LinkIsPrivateResponse {
    isPrivate: boolean
}

export class LinkIsPrivate {
    constructor(private linkRepository: LinkRepository) { }

    async execute(
        { customSlug }: LinkIsPrivateRequest,
    ): Promise<LinkIsPrivateResponse> {

        let link = await this.linkRepository.findBySlug(customSlug)
        if (!link) {
            throw new ResourceNotFoundError()
        }

        const linkHasExpired = dayjs().isAfter(dayjs(link.expireAt))

        if (linkHasExpired) {
            throw new LinkHasExpiredError()
        }

        const isPrivate = await this.linkRepository.linkIsPrivate(customSlug)

        return { isPrivate }
    }
}
