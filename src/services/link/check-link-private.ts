import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LinkHasExpiredError } from '../errors/link-has-expired-error'


interface CheckLinkPrivateRequest {
    customSlug: string
}
interface CheckLinkPrivateResponse {
    linkIsPrivate: boolean
}

export class CheckLinkPrivate {
    constructor(private linkRepository: LinkRepository) { }

    async execute(
        { customSlug }: CheckLinkPrivateRequest,
    ): Promise<CheckLinkPrivateResponse> {

        let link = await this.linkRepository.findBySlug(customSlug)
        if (!link) {
            throw new ResourceNotFoundError()
        }

        const linkHasExpired = dayjs().isAfter(dayjs(link.expireAt))

        if (linkHasExpired) {
            throw new LinkHasExpiredError()
        }

        const linkIsPrivate = await this.linkRepository.checkLinkPrivate(customSlug)

        return { linkIsPrivate }
    }
}
