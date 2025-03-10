import { envAvailability, ErrorHandler } from '@frameless/utils';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { importRoute, openapiRoute } from './routers';
config();

// Validate environment variables
envAvailability({
  env: process.env,
  keys: ['OVERIGE_OBJECTEN_API_URL', 'STRAPI_ADMIN_EXTENSIONS_PORT'],
});

const whitelist = process.env.STRAPI_ADMIN_EXTENSIONS_CORS?.split(', ') || [];
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
const app = express();
// Multer file upload middleware.
// The order is important, so this should be before the express.json() middleware to parse the file.
app.use('/api/v1', importRoute);
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// log HTTP requests
app.use(morgan('dev'));

const port = process.env.STRAPI_ADMIN_EXTENSIONS_PORT;
// Centralized error handler middleware
const globalErrorHandler = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorHandler || (err as ErrorHandler)?.isOperational) {
    // Send the proper error response with status code and message
    return res.status(err?.options?.statusCode || 500).json({
      message: err.message,
    });
  }

  // If it's an unknown error (not an operational error), log it and send a generic response
  // eslint-disable-next-line no-console
  console.error('Unexpected error:', err);
  return res.status(500).json({
    message: 'An unexpected error occurred.',
  });
};

/**
 * OpenAPI
 * Serve the OpenAPI documentation
 */
app.use('/api/v2', openapiRoute);

/**
 * CORS
 * Enable CORS with a whitelist of allowed origins
 */
app.use(cors(corsOption));
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
    console.log(`Strapi Admin extension app listening on port ${port}!`);
  });
}

export default app;
