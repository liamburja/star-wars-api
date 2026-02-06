import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';

// Load environment variables
dotenv.config();

// Configuration of MongoDB
const MONGODB_URL = process.env.MONGO_URI;

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      logger.info(`Connecting to MongoDB: ${MONGODB_URL}`);

      if (MONGODB_URL === undefined) {
        throw new Error('Need variable for connect to database');
      }
      
      await mongoose.connect(MONGODB_URL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        writeConcern: {
          w: 'majority',
          j: true,
          wtimeout: 10000
        },
        retryWrites: true
      });
      
      logger.info('✅ Successfully connected to MongoDB');
      
      // Log connection events
      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });
      
    } catch (error: any) {
      logger.error('❌ Error connecting to MongoDB:', error.message);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('✅ Disconnecting from MongoDB');
    } catch (error: any) {
      logger.error('❌ Error disconnecting from MongoDB:', error.message);
    }
  }

  public isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

export default Database.getInstance();