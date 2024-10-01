import { config } from 'dotenv';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import { kennisartikel } from './routers';
import { envAvailability, ErrorHandler } from './utils';

config();
// Validate environment variables
envAvailability({
  env: process.env,
  keys: ['STRAPI_PRIVATE_URL', 'PDC_STRAPI_API_TOKEN', 'FRONTEND_PUBLIC_URL', 'KENNIS_BANK_API_PORT'],
});

const app = express();

const port = process.env.KENNIS_BANK_API_PORT;
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
// Use global error handler middleware
app.use(globalErrorHandler);
/**
 * Routes
 * /api/v1/kennisartikel
 */
app.use('/api/v1', kennisartikel);
// handle non existing routes
app.use((_req, res) => {
  res.status(404).send('Route not found');
});
// Use global error handler middleware
app.use(globalErrorHandler);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`kennisbank app listening on port ${port}!`);
});
