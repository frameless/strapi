import { CSPDirectives } from 'csp-header';
import {
  getContentSecurityPolicy,
  mergeCSPDirectives,
  mergeCustomizer,
  normalizeURL,
  subdomainWildcard,
} from './cspConfig';

describe('cspConfig', () => {
  describe('mergeCustomizer', () => {
    it('should concatenate arrays', () => {
      const objValue = [1, 2];
      const srcValue = [3, 4];
      expect(mergeCustomizer(objValue, srcValue)).toEqual([1, 2, 3, 4]);
    });

    it('should return undefined for non-arrays', () => {
      const objValue = { a: 1 };
      const srcValue = { b: 2 };
      expect(mergeCustomizer(objValue, srcValue)).toBeUndefined();
    });
  });

  describe('normalize URL', () => {
    it('should return normalized URLs as-is', () => {
      const url = 'https://example.com/foo?bar#quux';
      expect(normalizeURL(url)).toEqual(url);
    });
    it('should return normalized URLs', () => {
      const url = 'HTTPS://EXAMPLE.COM/';
      expect(normalizeURL(url)).toEqual('https://example.com/');
    });

    it("should block non URL values, such as 'unsafe-inline'", () => {
      const url = "'unsafe-inline";
      expect(normalizeURL(url)).toEqual(null);
    });
  });

  describe('subdomain URL', () => {
    it('should return the URLs with a wildcard subdomain', () => {
      const url = 'https://example.com/foo?bar#quux';
      expect(subdomainWildcard(url)).toEqual('https://*.example.com/foo?bar#quux');
    });
  });

  describe('mergeCSPDirectives', () => {
    it('should concatenate deeply nested arrays', () => {
      const configA = { 'font-src': ["'self'"] };
      const configB = { 'font-src': ['https://font.example.com/'] };
      const expected: Partial<CSPDirectives> = {
        'font-src': ["'self'", 'https://font.example.com/'],
      };
      expect(mergeCSPDirectives(configA, configB)).toEqual(expected);
    });

    it('should ignore undefined arguments', () => {
      const configA = { 'font-src': ["'self'"] };
      const configB = { 'font-src': ['https://font.example.com/'] };
      const expected: Partial<CSPDirectives> = {
        'font-src': ["'self'", 'https://font.example.com/'],
      };
      expect(mergeCSPDirectives(configA, undefined, configB)).toEqual(expected);
    });
  });

  describe('getContentSecurityPolicy', () => {
    describe('development CSP', () => {
      const csp = getContentSecurityPolicy({
        nonce: 'bb4c20ae-a1f1-4620-865c-88cb88e89727',
        node_env: 'development',
      });

      it('should return the correct directives for development environment', () => {
        expect(typeof csp).toBe('string');
        expect(csp).not.toBe('');
      });

      it('development CSP should not be the default', () => {
        const devCsp = getContentSecurityPolicy({
          node_env: 'development',
        });
        const defaultCsp = getContentSecurityPolicy({});
        expect(devCsp).not.toBe(defaultCsp);
      });
    });

    describe('production CSP', () => {
      const csp = getContentSecurityPolicy({
        nonce: '9b7d46bc-f64f-4063-8a1c-e8a85bc6817d',
        node_env: 'production',
      });

      it('production CSP should be the default', () => {
        const prodCsp = getContentSecurityPolicy({
          nonce: 'b7e29a49-3571-43f9-a645-c772cad9a516',
          node_env: 'production',
        });
        const defaultCsp = getContentSecurityPolicy({
          nonce: 'b7e29a49-3571-43f9-a645-c772cad9a516',
        });
        expect(prodCsp).toBe(defaultCsp);
      });
      it('should not include unsafe-eval', () => {
        expect(csp).not.toContain('unsafe-eval');
      });
      it('should not include unsafe-inline', () => {
        expect(csp).not.toContain('unsafe-inline');
      });
      it('should not include any http: values (unecrypted connections are not allowed)', () => {
        expect(csp).not.toContain('http:');
      });
      it('should not include any ws: values (unecrypted connections are not allowed)', () => {
        expect(csp).not.toContain('http:');
      });
    });
  });
});
