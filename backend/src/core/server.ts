import app from './app';
import { config } from '../config/env';
import { connectToDatabase } from '../config/database';

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

export default startServer;

