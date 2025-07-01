import express from 'express'
import {
  blocksLinkCreationPerDay,
  blocksLinkCreationPerMinute,
} from '@/middlewares/verify-client-access-by-ip'
import { restrictedAccessLoggedInUser, verifyUserLogged } from '@/middlewares/verify-user-logged'
import { createShortenedLink } from '../controllers/link/create-shortened-link'
import { findByLinkBySlug } from '../controllers/link/find-by-link-by-slug'
import { getIpClient } from '@/middlewares/get-ip-client'
import { findLinkByUser } from '../controllers/link/find-link-by-user'
import { deleteLink } from '../controllers/link/delete-link'
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

router.use(restrictedAccessLoggedInUser)
router.get("/shorten/user", findLinkByUser)
router.delete("/shorten/:id", deleteLink)

export default router
