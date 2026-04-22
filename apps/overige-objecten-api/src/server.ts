import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { envAvailability, ErrorHandler } from '@frameless/utils';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import { config } from 'dotenv';
import express, { type NextFunction, type Request, type Response, type Express } from 'express';
import * as OpenApiValidator from 'express-openapi-validator';
import { load } from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

import { objects, objecttypes, openapi, preview } from './routers';
config();

type OpenOpenApiValidationError = {
  path: string;
  message: string;
  errorCode: string;
};
interface OpenApiValidationErrorTypes {
  errors: OpenOpenApiValidationError[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate environment variables
envAvailability({
  env: process.env,
  keys: ['STRAPI_PRIVATE_URL', 'OVERIGE_OBJECTEN_API_PORT'],
});

const swaggerDocument = load(fs.readFileSync(path.join(__dirname, './docs/openapi.yaml'), 'utf8')) as Record<
  string,
  unknown
>;
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

const app: Express = express();
app.use(express.json());

app.use('/public/vendor', express.static(path.resolve(__dirname, '../public/vendor')));

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
 * Swagger UI Setup
 * Type assertions needed because:
 * - swaggerUi.serve is typed as RequestHandler[] which causes conflicts when passed as middleware
 * - swaggerUi.setup() return type doesn't align perfectly with Express middleware expectations
 * This is a known limitation with the swagger-ui-express type definitions
 */

if (process.env.NODE_ENV === 'development') {
  const swaggerSetup = swaggerUi.setup(swaggerDocument as Record<string, unknown>) as any;
  app.use('/api/v2/api-docs', swaggerUi.serve as any, swaggerSetup);
}

/**
 * Objecttypes
 * /api/v2/objecttypes/:type
 */
app.use('/api/v2', objecttypes);
/**
 * Routes
 * /api/v2/preview
 * /api/v2/preview?slug=kennisartikelen or vac&secret=xxxx&status=DRAFT or PUBLISHED
 */
app.use('/api/v2', preview);
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
    apiSpec: swaggerDocument as any,
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
