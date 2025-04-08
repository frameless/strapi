import { getURL } from '../getURL';
import { setEnv } from '../setEnv';

describe('getURL', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return undefined if the environment variable is not defined', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env: {} });
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'No valid URL found in the required environment variable NON_EXISTENT_ENV_VAR',
      expect.any(Error),
    );
  });

  it('should return the origin if isOrigin is true', () => {
    const env = { NON_EXISTENT_ENV_VAR: 'https://example.com' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env, isOrigin: true });
    expect(result).toBe('https://example.com');
  });

  it('should return the URL object if isOrigin is false', () => {
    const env = { NON_EXISTENT_ENV_VAR: 'https://example.com' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env, isOrigin: false }) as URL;
    expect(result).toBeInstanceOf(URL);
    expect(result?.href).toBe('https://example.com/');
  });
  it('should return undefined if the URL is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env });
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'No valid URL found in the required environment variable NON_EXISTENT_ENV_VAR',
      expect.any(Error),
    );
  });
  it('should not throw an error message when the URL is invalid in production mode', () => {
    setEnv('NODE_ENV', 'production');
    const consoleSpy = jest.spyOn(console, 'error');
    const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env });
    expect(result).toBeUndefined();
    expect(consoleSpy).not.toThrow();
  });
  it('should throw an error message when the URL is invalid in development mode', () => {
    setEnv('NODE_ENV', 'development');
    const consoleSpy = jest.spyOn(console, 'error');
    const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env });
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      'No valid URL found in the required environment variable NON_EXISTENT_ENV_VAR',
      expect.any(Error),
    );
  });
  it('should throw an error message when the URL is invalid in test mode', () => {
    setEnv('NODE_ENV', 'test');
    const consoleSpy = jest.spyOn(console, 'error');
    const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env });
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      'No valid URL found in the required environment variable NON_EXISTENT_ENV_VAR',
      expect.any(Error),
    );
  });
  it('should throw an error message when the URL is invalid in debug mode', () => {
    setEnv('DEBUG', 'true');
    const consoleSpy = jest.spyOn(console, 'error');
    const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
    const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env });
    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      'No valid URL found in the required environment variable NON_EXISTENT_ENV_VAR',
      expect.any(Error),
    );
  });
});
