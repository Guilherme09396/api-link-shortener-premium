import { CredentialsInvalidError } from '@/services/errors/credentials-invalid-error';
import { LinkHasExpiredError } from '@/services/errors/link-has-expired-error';
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error';
import { makeFindByLinkSlugService } from '@/services/factories/make-find-link-by-slug-link-service';
import { getCache, setCache } from '@/utils/cache-util';
import { Request, Response } from 'express'
import { z } from 'zod';

export async function validateLinkPrivate(req: Request, res: Response) {
    try {
        const findByLinkBySlugSchema = z.object({
            slug: z.string(),
        })

        const { slug } = findByLinkBySlugSchema.parse(req.params)
        const password = req.headers['password-link'];

        const finByLinkBySlugService = makeFindByLinkSlugService()
        await finByLinkBySlugService.execute({ slug, password })
        await setCache(`${slug}-slugPrivate`, `${password}`, 60)

        res.status(200).json();

    } catch (e) {
        if (e instanceof ResourceNotFoundError) {
            res.status(404).json({ error: e.message })
            return
        }

        if (e instanceof LinkHasExpiredError) {
            res.status(410).json({ error: e.message })
            return
        }

        if (e instanceof CredentialsInvalidError) {
            res.status(401).json({ error: e.message })
            return
        }

        throw e
    }
}
