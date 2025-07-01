import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeDeleteLinkByIdService } from '@/services/factories/make-delete-link-by-id-service'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deleteLink(req: Request, res: Response) {
  try {
    const deleteLinkSchema = z.object({
      id: z.string(),
    })

    const {id} = deleteLinkSchema.parse(req.params)
    const deleteLinkByIdService = makeDeleteLinkByIdService()
    await deleteLinkByIdService.execute({id, userId: req.userId!})

    res.status(200).json()
   
  } catch (e) {
    if (e instanceof ResourceNotFoundError) {
      res.status(404).json({ error: e.message })
      return
    }

    throw e
  }
}
