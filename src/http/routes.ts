import express from 'express'
import { createShortenedLink } from './controllers/link/create-shortened-link'
import { findByLinkBySlug } from './controllers/link/find-by-link-by-slug'
const router = express.Router()

router.post('/', createShortenedLink)
router.get('/:slug', findByLinkBySlug)

export default router
