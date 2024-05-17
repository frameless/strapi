import { BLOB, EVAL, getCSP, INLINE, nonce, SELF, STRICT_DYNAMIC } from 'csp-header';
import mergeWith from 'lodash.mergewith';
import {
  chatWidgetDev,
  chatWidgetProd,
  cspBase,
  cspDevelopmentHeader,
  cspProductionHeader,
  formatURL,
  handelCSPEnv,
  map,
  matomoDev,
  matomoProd,
  mergeCustomizer,
  ogonePaymentServices,
  openFormsDev,
  openFormsProd,
  siteimproveanalyticsDev,
  siteimproveanalyticsProd,
  youtube,
} from './cspConfig';

describe('cspConfig', () => {
  // Test formatURL
  describe('formatURL', () => {
    it('should format the URL correctly', () => {
      expect(formatURL('example.com')).toBe('https://example.com');
    });
  });
  // Test mergeCustomizer
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
  // Test handelCSPEnv
  describe('handelCSPEnv', () => {
    it('should return the correct directives for development environment', () => {
      const expected = mergeWith(
        { 'script-src': [SELF, INLINE, EVAL], 'style-src': [SELF, INLINE] },
        chatWidgetDev,
        cspBase,
        map,
        matomoDev,
        ogonePaymentServices,
        openFormsDev,
        siteimproveanalyticsDev,
        youtube,
        mergeCustomizer,
      );
      expect(handelCSPEnv(undefined, 'development')).toEqual(expected);
    });

    it('should return the correct directives for production environment', () => {
      const nonceValue = '001496FD-C51E-43E8-B3FA-4082FA5E13A1';
      const expected = mergeWith(
        {
          'script-src': [SELF, nonce(nonceValue), STRICT_DYNAMIC, BLOB],
          'style-src': [SELF, nonce(nonceValue)],
        },
        chatWidgetProd,
        cspBase,
        map,
        matomoProd,
        ogonePaymentServices,
        openFormsProd,
        siteimproveanalyticsProd,
        youtube,
        mergeCustomizer,
      );
      expect(handelCSPEnv(nonceValue, 'production')).toEqual(expected);
    });
  });
  // Test cspDevelopmentHeader and cspProductionHeader
  describe('csp headers', () => {
    it('should return development CSP header', () => {
      process.env = Object.assign(process.env, { NODE_ENV: 'development' });

      const expectedDirectives = handelCSPEnv(undefined, 'development');
      const result = cspDevelopmentHeader();
      expect(result).toEqual(
        getCSP({
          directives: expectedDirectives,
        }),
      );
    });

    it('should return production CSP header with nonce', () => {
      const nonceValue = '001496FD-C51E-43E8-B3FA-4082FA5E13A1';
      process.env = Object.assign(process.env, { NODE_ENV: 'production' });
      const expectedDirectives = handelCSPEnv(nonceValue, 'production');
      const result = cspProductionHeader(nonceValue);
      expect(result).toEqual(
        getCSP({
          directives: expectedDirectives,
        }),
      );
    });
  });
});
