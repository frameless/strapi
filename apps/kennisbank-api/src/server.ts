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
import { envAvailability, ErrorHandler, getTheServerURL } from './utils';
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
  keys: ['STRAPI_PRIVATE_URL', 'PDC_STRAPI_API_TOKEN', 'FRONTEND_PUBLIC_URL', 'KENNIS_BANK_API_PORT'],
});

const swaggerDocument: any = yaml.load(fs.readFileSync(path.join(__dirname, './docs/openapi.yaml'), 'utf8'));
const whitelist = process.env.KENNIS_BANK_CORS?.split(', ') || [];
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

const port = process.env.KENNIS_BANK_API_PORT;
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
  app.use(
    '/api/v1/api-docs',
    (req: Request, _res: Response, next: NextFunction) => {
      const openapiComponents = {
        schemas: {
          kennisartikel: {
            $ref: new URL('api/v1/objecttypes/kennisartikel', getTheServerURL(req)),
          },
          vac: {
            $ref: new URL('api/v1/objecttypes/vac', getTheServerURL(req)),
          },
        },
      };

      (req as any).swaggerDoc = { ...swaggerDocument, components: openapiComponents };
      next();
    },
    swaggerUi.serveFiles(),
    swaggerUi.setup(),
  );
}
/**
 * Objecttypes
 * /api/v1/objecttypes/:type
 */
app.use('/api/v1', objecttypes);
/**
 * OpenAPI
 * Serve the OpenAPI documentation
 */
app.use('/api/v1', openapi);
/**
 * OpenAPI Validator
 * Validate requests and responses according to the OpenAPI specification
 */
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: true, // false by default
  }),
);
/**
 * CORS
 * Enable CORS with a whitelist of allowed origins
 */
app.use(cors(corsOption));
/**
 * Routes
 * /api/v1/objects
 * /api/v1/objects/:uuid
 */
app.use('/api/v1', objects);
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
    console.log(`kennisbank app listening on port ${port}!`);
  });
}

export default app;
