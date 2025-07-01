import { LinkRepository } from '@/repositories/link-repository'
import { Links, Prisma } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteLinkByIdRequest {
    id: string
    userId: string
}
interface DeleteLinkByIdResponse {
  link: Links
}

export class DeleteLinkById {
  constructor(private linkRepository: LinkRepository) {}

  async execute({id, userId}: DeleteLinkByIdRequest): Promise<DeleteLinkByIdResponse> {
    let link = await this.linkRepository.findById(id)

    if(!link || link.user_id !== userId) {
        throw new ResourceNotFoundError()
    }
    
    link = await this.linkRepository.deleteById(id)
    return {link}
  }
}
