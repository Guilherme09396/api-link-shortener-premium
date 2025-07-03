import express from 'express'
import {
  blocksLinkCreationPerMinute,
} from '@/middlewares/blocks-link-creation-per-minute'
import { verifyUserLogged } from '@/middlewares/verify-user-logged'
import { createShortenedLink } from '../controllers/link/create-shortened-link'
import { findByLinkBySlug } from '../controllers/link/find-by-link-by-slug'
import { getIpClient } from '@/middlewares/get-ip-client'
import { findLinkByUser } from '../controllers/link/find-link-by-user'
import { deleteLink } from '../controllers/link/delete-link'
import { linkIsPrivate } from '../controllers/link/link-is-private'
import { blocksLinkCreationPerDay } from '@/middlewares/blocks-link-creation-per-day'
import { restrictedAccessLoggedInUser } from '@/middlewares/restricted-access-logged-in-user'
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
router.get("/check/:slug", linkIsPrivate)
router.use(restrictedAccessLoggedInUser)
router.get("/shorten/user", findLinkByUser)
router.delete("/shorten/:id", deleteLink)

export default router
