export type Options = {
  statusCode: number;
};
export class ErrorHandler extends Error {
  isOperational: boolean; //  this flag for custom error identification

  constructor(
    message?: string,
    public options?: Options,
  ) {
    super(message);
    this.name = 'ErrorHandler';
    this.options = options;
    this.isOperational = true; // Operational errors should be marked
  }
}
