import { CredentialsInvalidError } from '@/services/errors/credentials-invalid-error'
import { LinkHasExpiredError } from '@/services/errors/link-has-expired-error'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeCreateClickService } from '@/services/factories/make-create-create-click-service'
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service'
import { makeFindLinkByUserService } from '@/services/factories/make-find-link-by-user-service'
import { getCacheLink, setCacheLink } from '@/utils/link/cache-link-util'
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
