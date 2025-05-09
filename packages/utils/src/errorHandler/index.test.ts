import { ErrorHandler } from './index';

describe('ErrorHandler', () => {
  it('should create an instance of ErrorHandler', () => {
    const error = new ErrorHandler('Test error', { statusCode: 500 });
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('Test error');
    expect(error.options?.statusCode).toBe(500);
  });
  it('should create an instance of ErrorHandler with isOperational', () => {
    const error = new ErrorHandler('Test error', { statusCode: 500 });
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('Test error');
    expect(error.options?.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
  });
  it('should log the error message and status code', () => {
    const error = new ErrorHandler('Test error', { statusCode: 500 });
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('Test error');
    expect(error.options?.statusCode).toBe(500);
  });
  it('should create an instance of ErrorHandler without options', () => {
    const error = new ErrorHandler('Test error');
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('Test error');
    expect(error.options).toBeUndefined();
  });
  it('should create an instance of ErrorHandler without message and options', () => {
    const error = new ErrorHandler();
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('');
    expect(error.options).toBeUndefined();
  });
  it('should create an instance of ErrorHandler with only message', () => {
    const error = new ErrorHandler('Test error');
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('Test error');
    expect(error.options).toBeUndefined();
  });
  it('should create an instance of ErrorHandler with only options', () => {
    const error = new ErrorHandler(undefined, { statusCode: 500 });
    expect(error).toBeInstanceOf(ErrorHandler);
    expect(error.message).toBe('');
    expect(error.options?.statusCode).toBe(500);
  });
  describe('errorType', () => {
    it("should default errorType to 'http'", () => {
      const error = new ErrorHandler('Test error', { statusCode: 500 });
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('Test error');
      expect(error.options?.statusCode).toBe(500);
      expect(error.errorType).toBe('http');
    });
    it('should create an instance of ErrorHandler with errorType', () => {
      const error = new ErrorHandler('Test error', { statusCode: 408 }, 'abort');
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('Test error');
      expect(error.options?.statusCode).toBe(408);
      expect(error.errorType).toBe('abort');
    });
    it('should create an instance of ErrorHandler with errorType', () => {
      const error = new ErrorHandler('Test error', { statusCode: 500 }, 'network');
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('Test error');
      expect(error.options?.statusCode).toBe(500);
      expect(error.errorType).toBe('network');
    });
    it('should create an instance of ErrorHandler with errorType', () => {
      const error = new ErrorHandler('Test error', { statusCode: 500 }, 'unknown');
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe('Test error');
      expect(error.options?.statusCode).toBe(500);
      expect(error.errorType).toBe('unknown');
    });
  });
});
