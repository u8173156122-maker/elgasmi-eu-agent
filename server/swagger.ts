import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Elgasmi.e.U Agentic Systems API',
      version: '1.0.0',
      description: 'API publique pour intégrer les services agentiques d\'Elgasmi.e.U dans vos applications',
      contact: {
        name: 'Elgasmi.e.U Support',
        email: 'asmaewarter5@gmail.com',
        url: 'https://elgasmi.eu',
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: 'https://api.elgasmi.eu',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key',
          description: 'API Key for authentication',
        },
      },
      schemas: {
        ProcessRequest: {
          type: 'object',
          required: ['data', 'taskType'],
          properties: {
            data: {
              type: 'object',
              description: 'Input data to process',
              example: { orders: [{ id: 1, quantity: 5 }] },
            },
            taskType: {
              type: 'string',
              enum: ['order_processing', 'data_validation', 'batch_operation'],
              description: 'Type of processing task',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: 'medium',
              description: 'Task priority level',
            },
          },
        },
        ProcessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the operation was successful',
            },
            taskId: {
              type: 'string',
              description: 'Unique task identifier',
            },
            result: {
              type: 'object',
              description: 'Processing result',
            },
            metrics: {
              type: 'object',
              properties: {
                processingTime: {
                  type: 'number',
                  description: 'Processing time in milliseconds',
                },
                itemsProcessed: {
                  type: 'integer',
                  description: 'Number of items processed',
                },
                successRate: {
                  type: 'number',
                  description: 'Success rate percentage',
                },
              },
            },
          },
        },
        OptimizeRequest: {
          type: 'object',
          required: ['resources'],
          properties: {
            resources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  type: { type: 'string' },
                  utilization: { type: 'number' },
                },
              },
              description: 'List of resources to optimize',
            },
            constraints: {
              type: 'object',
              description: 'Optimization constraints',
            },
          },
        },
        AnomalyRequest: {
          type: 'object',
          required: ['dataStream'],
          properties: {
            dataStream: {
              type: 'array',
              items: { type: 'number' },
              description: 'Data stream for anomaly detection',
            },
            sensitivity: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              default: 0.8,
              description: 'Anomaly detection sensitivity (0-1)',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              description: 'Error message',
            },
            code: {
              type: 'string',
              description: 'Error code',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Error timestamp',
            },
          },
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['./server/routers.ts', './server/api/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
