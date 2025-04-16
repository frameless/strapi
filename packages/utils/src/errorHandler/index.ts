export type Options = {
  statusCode: number;
};
export type ErrorTypes = 'http' | 'abort' | 'network' | 'unknown';
export class ErrorHandler extends Error {
  isOperational: boolean; //  this flag for custom error identification
  errorType: ErrorTypes;

  constructor(
    message?: string,
    public options?: Options,
    type: ErrorTypes = 'http',
  ) {
    super(message);
    this.name = 'ErrorHandler';
    this.options = options;
    this.errorType = type;
    this.isOperational = true; // Operational errors should be marked
  }
}
