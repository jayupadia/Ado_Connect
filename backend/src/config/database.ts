import mongoose from 'mongoose';
import { config } from './env';
import { logger } from './logger';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

