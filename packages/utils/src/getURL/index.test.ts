import { getURL } from '../getURL';

describe('getURL', () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  describe('missing environment variable', () => {
    it('should throw if the env var is missing and required=true (default)', () => {
      expect(() => getURL({ key: 'NON_EXISTENT_ENV_VAR', env: {} })).toThrow(
        'Environment variable "NON_EXISTENT_ENV_VAR" is not defined',
      );
    });

    it('should return undefined if the env var is missing and required=false', () => {
      const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env: {}, required: false });
      expect(result).toBeUndefined();
    });
  });

  describe('invalid URL', () => {
    it('should throw if the env var contains an invalid URL and required=true (default)', () => {
      const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
      expect(() => getURL({ key: 'NON_EXISTENT_ENV_VAR', env })).toThrow(
        '"NON_EXISTENT_ENV_VAR" contains an invalid URL: "invalid-url"',
      );
    });

    it('should throw if the env var contains an invalid URL even when required=false', () => {
      // An invalid URL is always a misconfiguration — optional only skips missing vars
      const env = { NON_EXISTENT_ENV_VAR: 'invalid-url' };
      expect(() => getURL({ key: 'NON_EXISTENT_ENV_VAR', env, required: false })).toThrow(
        '"NON_EXISTENT_ENV_VAR" contains an invalid URL: "invalid-url"',
      );
    });
  });

  describe('valid URL', () => {
    it('should return the origin string if isOrigin=true (default)', () => {
      const env = { NON_EXISTENT_ENV_VAR: 'https://example.com' };
      const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env, isOrigin: true });
      expect(result).toBe('https://example.com');
    });

    it('should return a URL instance if isOrigin=false', () => {
      const env = { NON_EXISTENT_ENV_VAR: 'https://example.com' };
      const result = getURL({ key: 'NON_EXISTENT_ENV_VAR', env, isOrigin: false }) as URL;
      expect(result).toBeInstanceOf(URL);
      expect(result.href).toBe('https://example.com/');
    });
  });
});
