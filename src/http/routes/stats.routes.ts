import express from 'express'
import {
  verifyUserLogged,
} from '@/middlewares/verify-user-logged'
import { getIpClient } from '@/middlewares/get-ip-client'
import { getStats } from '../controllers/stats/get-stats'
import { restrictedAccessLoggedInUser } from '@/middlewares/restricted-access-logged-in-user'
const router = express.Router()

router.use(verifyUserLogged)

router.get('/:slug', restrictedAccessLoggedInUser, getIpClient, getStats)

export default router
