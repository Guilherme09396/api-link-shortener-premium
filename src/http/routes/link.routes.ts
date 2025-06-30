import express from 'express'
import {
  blocksLinkCreationPerDay,
  blocksLinkCreationPerMinute,
} from '@/middlewares/verify-client-access-by-ip'
import { verifyUserLogged } from '@/middlewares/verify-user-logged'
import { createShortenedLink } from '../controllers/link/create-shortened-link'
import { findByLinkBySlug } from '../controllers/link/find-by-link-by-slug'
import { getIpClient } from '@/middlewares/get-ip-client'
const router = express.Router()

router.use(verifyUserLogged)

router.post(
  '/shorten',
  getIpClient,
  blocksLinkCreationPerMinute,
  blocksLinkCreationPerDay,
  createShortenedLink,
)
router.get('/:slug', getIpClient, findByLinkBySlug)

export default router
