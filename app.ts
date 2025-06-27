import express from 'express'
import { env } from './src/env'
/* import authRoutes from './src/routes/auth.routes';
import linkRoutes from './src/routes/link.routes';
import statsRoutes from './src/routes/stats.routes'; */

const app = express()
app.use(express.json())

/* app.use('/auth', authRoutes);
app.use('/shorten', linkRoutes);
app.use('/stats', statsRoutes);

app.get('/:slug', linkRoutes); */

const PORT = env.PORT
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
