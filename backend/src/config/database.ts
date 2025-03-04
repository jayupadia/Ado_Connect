import mongoose from 'mongoose';
import { config } from './env';

export const connectToDatabase = async () => {
  if (!config.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    process.exit(1);
  }
};

