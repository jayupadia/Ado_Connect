import express from 'express';
import { json } from 'body-parser';
import { authRoutes } from '../api/auth/auth.routes';
import { errorMiddleware } from '../middlewares/error.middleware';

const app = express();

app.use(json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorMiddleware as express.ErrorRequestHandler);

export default app;

