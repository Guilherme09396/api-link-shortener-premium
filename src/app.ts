import express from 'express'
import { errorHandler } from '@/middlewares/errorHandler'
import linkRoutes from '@/http/routes/link.routes'
import userRoutes from '@/http/routes/user.routes'
import statsRouter from '@/http/routes/stats.routes'
import cors from "cors"
import { getIpClient } from './middlewares/get-ip-client'
import { findByLinkBySlug } from './http/controllers/link/find-by-link-by-slug'
import { linkIsPrivate } from './http/controllers/link/link-is-private'
import { verifyUserLogged } from './middlewares/verify-user-logged'
/* import authRoutes from './src/routes/auth.routes';
import linkRoutes from './src/routes/link.routes';
import statsRoutes from './src/routes/stats.routes'; */

export const app = express()
app.use(cors())

app.use(express.json())
app.get("/", (req, res) => {
    res.json()
    return
})

app.use(verifyUserLogged)

app.get('/:slug', getIpClient, findByLinkBySlug)
app.get("/check/:slug", linkIsPrivate)

app.use('/auth', userRoutes)
app.use(linkRoutes)
app.use('/stats', statsRouter)

app.use(errorHandler)
