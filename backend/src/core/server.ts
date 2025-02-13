import app from './app';
import { config } from '../config/env';
import { logger } from '../config/logger';
import { connectToDatabase } from '../config/database';

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

export default startServer;

