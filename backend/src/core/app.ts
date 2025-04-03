import express from 'express';
import { json } from 'body-parser';
import cors from 'cors'; // Import cors
import { authRoutes } from '../api/auth/auth.routes';
import { errorMiddleware } from '../middlewares/error.middleware';
import { dashboardRoutes } from '../api/dashboard/dashboard.routes';

const app = express();

app.use(cors()); // Use cors middleware
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes); // Assuming you have a dashboard route as well

// Error handling middleware
app.use(errorMiddleware as express.ErrorRequestHandler);

export default app;

