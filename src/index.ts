import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import Database from './shared/database';
import { setupContainer } from './container';
import { swaggerSpec } from './shared/swagger';
import { Container } from 'typedi';
import peopleRoutes from './modules/people/routes/people.routes';
import filmRoutes from './modules/films/routes/film.routes';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT;

setupContainer();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logger = Container.get<any>('logger');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({}));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/people', peopleRoutes);
  app.use('/films', filmRoutes);
  return app;
}

const apiService = createApp();

async function startServer() {
  try {
    await Database.connect();
    console.log('Mongoose connection state:', mongoose.connection.readyState);
    logger.info('✅ Database connected successfully');

    const server = apiService.listen(PORT, () => {
      if (process.env.NODE_ENV === 'development') {
        logger.info(`🚀 Server is running on http://localhost:${PORT}`);
        logger.info(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
      } else {
        logger.info('🚀 Server is running');
      }
    });

    return server;
  } catch (error) {
    logger.error('❌ Error starting the server:', error);
    process.exit(1);
  }
}

const server = startServer();

export default apiService;
export { server };