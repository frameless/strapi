import { setEnv } from './setEnv';
import { showErrorBasedOnENV } from './showErrorBasedOnENV';

describe('showErrorBasedOnENV', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('should throw an error when in test mode', () => {
    setEnv('NODE_ENV', 'test');
    expect(() => showErrorBasedOnENV('Test error')).toThrow('Test error');
  });

  it('should throw an error when in development mode', () => {
    setEnv('NODE_ENV', 'development');
    expect(() => showErrorBasedOnENV('Test error')).toThrow('Test error');
  });

  it('should throw an error when DEBUG is true', () => {
    setEnv('DEBUG', 'true');
    expect(() => showErrorBasedOnENV('Test error')).toThrow('Test error');
  });

  it('should not throw an error when in production mode', () => {
    setEnv('NODE_ENV', 'production');
    expect(showErrorBasedOnENV('Test error')).toBeUndefined();
  });
});
