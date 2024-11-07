/* eslint-disable no-undef */
import type { CorsOptions } from 'cors';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { objects, objecttypes, openapi } from './routers';
import { envAvailability, ErrorHandler } from './utils';
config();

type OpenOpenApiValidationError = {
  path: string;
  message: string;
  errorCode: string;
};
interface OpenApiValidationErrorTypes {
  errors: OpenOpenApiValidationError[];
}

// Validate environment variables
envAvailability({
  env: process.env,
  keys: ['STRAPI_PRIVATE_URL', 'OVERIGE_OBJECTEN_API_PORT'],
});

const swaggerDocument: any = yaml.load(fs.readFileSync(path.join(__dirname, './docs/openapi.yaml'), 'utf8'));
const whitelist = process.env.OVERIGE_OBJECTEN_API_CORS?.split(', ') || [];
const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new ErrorHandler('Not allowed by CORS', {
          statusCode: 403,
        }),
      );
    }
  },
  optionsSuccessStatus: 200,
};
const apiSpec = path.join(__dirname, './docs/openapi.yaml');
const app = express();
app.use(express.json());

const port = process.env.OVERIGE_OBJECTEN_API_PORT;
// Centralized error handler middleware
const globalErrorHandler = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorHandler || (err as ErrorHandler)?.isOperational) {
    // Send the proper error response with status code and message
    return res.status(err?.options?.statusCode || 500).json({
      message: err.message,
    });
  }

  const isOpenApiValidatorError = (err as OpenApiValidationErrorTypes)?.errors;
  if (isOpenApiValidatorError) {
    return res.status((err as any)?.status || 400).json((err as OpenApiValidationErrorTypes).errors);
  }
  // If it's an unknown error (not an operational error), log it and send a generic response
  // eslint-disable-next-line no-console
  console.error('Unexpected error:', err);
  return res.status(500).json({
    message: 'An unexpected error occurred.',
  });
};
/**
 * Swagger
 * Serve the Swagger UI for testing and documentation
 * This is only available in development mode
 */
if (process.env.NODE_ENV === 'development') {
  app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

/**
 * Objecttypes
 * /api/v2/objecttypes/:type
 */
app.use('/api/v2', objecttypes);
/**
 * OpenAPI
 * Serve the OpenAPI documentation
 */
app.use('/api/v2', openapi);
/**
 * OpenAPI Validator
 * Validate requests and responses according to the OpenAPI specification
 */
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: {
      onError: (error, _body, _req) => {
        // Log the error from express-openapi-validator instead of returning the error and blocking the response.
        // eslint-disable-next-line no-console
        console.log(`Response body fails validation: `, error.errors);
      },
    },
  }),
);
/**
 * CORS
 * Enable CORS with a whitelist of allowed origins
 */
app.use(cors(corsOption));
/**
 * Routes
 * /api/v2/objects
 * /api/v2/objects/:uuid
 */
app.use('/api/v2', objects);
// handle non existing routes
app.use((_req, res) => {
  res.status(404).send('Route not found');
});
// Use global error handler middleware
app.use(globalErrorHandler);
/**
 * Start the server
 */
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Overige Objecten app listening on port ${port}!`);
  });
}

export default app;
