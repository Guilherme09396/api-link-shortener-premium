import express from 'express'
import router from '@/http/routes'
import { errorHandler } from '@/middlewares/errorHandler'
/* import authRoutes from './src/routes/auth.routes';
import linkRoutes from './src/routes/link.routes';
import statsRoutes from './src/routes/stats.routes'; */

export const app = express()
app.use(express.json())
app.use(router)

app.use(errorHandler)

/* app.use('/auth', authRoutes);
app.use('/shorten', linkRoutes);
app.use('/stats', statsRoutes);

app.get('/:slug', linkRoutes); */
