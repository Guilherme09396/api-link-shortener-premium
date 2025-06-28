import express from 'express'
import { createShortenedLink } from './controllers/link/create-shortened-link'
import { findByLinkBySlug } from './controllers/link/find-by-link-by-slug'
import {
  blocksLinkCreationPerDay,
  blocksLinkCreationPerMinute,
} from '@/middlewares/verify-client-access-by-ip'
const router = express.Router()

router.post('/', createShortenedLink)
router.get(
  '/:slug',
  blocksLinkCreationPerMinute,
  blocksLinkCreationPerDay,
  findByLinkBySlug,
)

export default router
