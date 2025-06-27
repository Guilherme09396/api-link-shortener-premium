import express from 'express'
import { createShortenedLink } from './controllers/link/create-shortened-link'
const router = express.Router()

router.post('/', createShortenedLink)

export default router
