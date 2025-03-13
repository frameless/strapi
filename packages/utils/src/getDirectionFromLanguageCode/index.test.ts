import { getDirectionFromLanguageCode } from './index';

describe('getDirectionFromLanguageCode', () => {
  it('should return "ltr" for English', () => {
    expect(getDirectionFromLanguageCode('en')).toBe('ltr');
  });

  it('should return "rtl" for Arabic', () => {
    expect(getDirectionFromLanguageCode('ar')).toBe('rtl');
  });

  it('should return "ltr" for Dutch', () => {
    expect(getDirectionFromLanguageCode('de')).toBe('ltr');
  });

  it('should return "ltr" for a non-existent language code', () => {
    expect(getDirectionFromLanguageCode('xx')).toBe('ltr');
  });
});
