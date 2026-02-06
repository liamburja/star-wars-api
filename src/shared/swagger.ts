import swaggerJsdoc from 'swagger-jsdoc';
import { allDocs } from '../docs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Motorbike Shop API',
      version: '1.0.0',
      description: 'API documentation for Motorbike Shop - Comprehensive API for managing vehicles and customers',
      contact: {
        name: 'Liam Verdejo'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server'
      }
    ],
    paths: allDocs
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);
