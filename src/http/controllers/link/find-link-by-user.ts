import { makeFindLinkByUserService } from '@/services/factories/make-find-link-by-user-service'
import { Request, Response } from 'express'

export async function findLinkByUser(req: Request, res: Response) {
  try {
    const finLinkByUserService = makeFindLinkByUserService()

   const { links } = await finLinkByUserService.execute({userId: req.userId!})
   
    res.status(200).json({links})
  } catch (e) {
    throw e
  }
}
