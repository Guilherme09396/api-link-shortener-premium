import { LinkRepository } from '@/repositories/link-repository'
import { Links } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'


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

        const linkIsPrivate = await this.linkRepository.checkLinkPrivate(customSlug)

        return { linkIsPrivate }
    }
}
