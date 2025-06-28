import express from 'express'
import {
  blocksLinkCreationPerDay,
  blocksLinkCreationPerMinute,
} from '@/middlewares/verify-client-access-by-ip'
import { verifyUserLogged } from '@/middlewares/verify-user-logged'
import { createShortenedLink } from '../controllers/link/create-shortened-link'
import { findByLinkBySlug } from '../controllers/link/find-by-link-by-slug'
const router = express.Router()

router.use(verifyUserLogged)

router.post(
  '/',
  blocksLinkCreationPerMinute,
  blocksLinkCreationPerDay,
  createShortenedLink,
)
router.get('/:slug', findByLinkBySlug)

export default router
