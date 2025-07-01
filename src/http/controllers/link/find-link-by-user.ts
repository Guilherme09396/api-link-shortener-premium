import { makeFindLinkByUserService } from '@/services/factories/make-find-link-by-user-service'
import { getCache, setCache } from '@/utils/cache-util'
import { Request, Response } from 'express'

export async function findLinkByUser(req: Request, res: Response) {
  try {
    const finLinkByUserService = makeFindLinkByUserService()
    const linksInCache = await getCache(req.userId!)

    if (linksInCache) {
      const links = JSON.parse(linksInCache)
      res.status(200).json({links})
      return
    }
   
   const { links } = await finLinkByUserService.execute({userId: req.userId!})
   
   await setCache(req.userId!, JSON.stringify(links), 60 * 5)
   setTimeout(() => {
    res.status(200).json({links})
   }, 4000);
  } catch (e) {
    throw e
  }
}
