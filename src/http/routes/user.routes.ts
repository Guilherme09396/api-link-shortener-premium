import express from 'express'
import { createUser } from '../controllers/user/create-user'
import { loginUser } from '../controllers/user/login-user'

const router = express.Router()

router.post('/', createUser)
router.post('/login', loginUser)

export default router
