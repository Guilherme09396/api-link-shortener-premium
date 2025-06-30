import express from 'express'
import { errorHandler } from '@/middlewares/errorHandler'
import linkRoutes from '@/http/routes/link.routes'
import userRoutes from '@/http/routes/user.routes'
import statsRouter from '@/http/routes/stats.routes'
import cors from "cors"
/* import authRoutes from './src/routes/auth.routes';
import linkRoutes from './src/routes/link.routes';
import statsRoutes from './src/routes/stats.routes'; */

export const app = express()
app.use(cors())

app.use(express.json())
app.use(linkRoutes)
app.use('/user', userRoutes)
app.use('/stats', statsRouter)

app.use(errorHandler)

/* app.use('/auth', authRoutes);
app.use('/shorten', linkRoutes);
app.use('/stats', statsRoutes);

app.get('/:slug', linkRoutes); */
