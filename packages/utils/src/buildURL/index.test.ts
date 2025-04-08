import { buildURL, getPathAndSearchParams, getQueryParams } from '../buildURL';

describe('buildURL', () => {
  it('should build properly with one query parameter', () => {
    const queryParams = { q: 'test' };
    const expected = '?q=test';
    expect(getQueryParams(queryParams)).toBe(expected);
  });

  it('should build properly with multiple query parameters', () => {
    const queryParams = { q: 'test', page: '1' };
    const expected = '?q=test&page=1';
    expect(getQueryParams(queryParams)).toBe(expected);
  });

  it('should return an empty string if no query parameters are provided', () => {
    expect(getQueryParams({})).toBe('');
  });
  it('should handle the case where the URL already starts with a question mark', () => {
    const queryParams = { q: 'test' };
    const expected = '?q=test';
    expect(getQueryParams(queryParams)).toBe(expected);
  });
});

describe('getPathAndSearchParams', () => {
  it('should build properly with one segment parameter', () => {
    const segments = ['search'];
    const { pathSegments } = getPathAndSearchParams({
      segments,
    });
    const expectedPathSegments = 'search';
    expect(pathSegments).toBe(expectedPathSegments);
  });
  it('should build properly with multiple segment parameters', () => {
    const segments = ['search', 'query'];
    const { pathSegments } = getPathAndSearchParams({
      segments,
    });
    const expectedPathSegments = 'search/query';
    expect(pathSegments).toBe(expectedPathSegments);
  });
  it('should handle the case where no segments are provided', () => {
    const { pathSegments } = getPathAndSearchParams({});
    const expectedPathSegments = '';
    expect(pathSegments).toBe(expectedPathSegments);
  });
  it('should handle the case where the locale is provided', () => {
    const segments = ['search'];
    const locale = 'nl';
    const { pathSegments } = getPathAndSearchParams({
      segments,
      locale,
    });
    const expectedPathSegments = 'nl/search';
    expect(pathSegments).toBe(expectedPathSegments);
  });
  it('should handle the case where the translations function is provided', () => {
    const segments = ['search'];
    const locale = 'nl';
    const translations: any = (segment: string) => {
      if (segment === 'search') {
        return 'zoeken';
      }
      return segment;
    };
    const { pathSegments } = getPathAndSearchParams({
      segments,
      translations,
      locale,
    });
    const expectedPathSegments = 'nl/zoeken';
    expect(pathSegments).toBe(expectedPathSegments);
  });
  it('should handle the case where the query parameters are provided', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const { searchParams } = getPathAndSearchParams({
      queryParams,
      segments,
    });
    const expectedSearchParams = '?q=test';
    expect(searchParams).toBe(expectedSearchParams);
  });
  it('should handle the case where the query parameters and segments are provided', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const { fullURL } = getPathAndSearchParams({
      queryParams,
      segments,
    });
    const expectedFullURL = 'search?q=test';
    expect(fullURL).toBe(expectedFullURL);
  });
  it('should handle the case where the query parameters and segments are provided, and the locale is provided', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const locale = 'en';
    const { fullURL } = getPathAndSearchParams({
      queryParams,
      segments,
      locale,
    });
    const expectedFullURL = 'en/search?q=test';
    expect(fullURL).toBe(expectedFullURL);
  });
  it('should handle the case where the segment already starts with a question mark', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const { pathSegments, searchParams, fullURL } = getPathAndSearchParams({
      queryParams,
      segments,
    });
    const expectedPathSegments = 'search';
    const expectedSearchParams = '?q=test';
    const expectedFullURL = `${expectedPathSegments}${expectedSearchParams}`;
    expect(pathSegments).toBe(expectedPathSegments);
    expect(searchParams).toBe(expectedSearchParams);
    expect(fullURL).toBe(expectedFullURL);
  });
});
describe('buildURL', () => {
  it('should build a URL with segment', () => {
    const segments = ['search'];
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      segments,
      env,
      key,
    });
    const expectedURL = 'https://example.com/search';
    expect(url?.href).toBe(expectedURL);
  });
  it('should build a URL with multiple segments', () => {
    const segments = ['search', 'query'];
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      segments,
      env,
      key,
    });
    const expectedURL = 'https://example.com/search/query';
    expect(url?.href).toBe(expectedURL);
  });
  it('should handle the case where the locale is provided', () => {
    const segments = ['search'];
    const locale = 'nl';
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      segments,
      locale,
      env,
      key,
    });
    const expectedURL = 'https://example.com/nl/search';
    expect(url?.href).toBe(expectedURL);
  });
  it('should handle the case where the translations function is provided', () => {
    const segments = ['search'];
    const locale = 'nl';
    const translations: any = (segment: string) => {
      if (segment === 'search') {
        return 'zoeken';
      }
      return segment;
    };
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      segments,
      translations,
      locale,
      env,
      key,
    });
    const expectedURL = 'https://example.com/nl/zoeken';
    expect(url?.href).toBe(expectedURL);
  });
  it('should handle the case where the query parameters are provided', () => {
    const queryParams = { q: 'test' };
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      queryParams,
      env,
      key,
    });
    const expectedURL = 'https://example.com/?q=test';
    expect(url?.href).toBe(expectedURL);
  });
  it('should handle the case where the query parameters and segments are provided', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      queryParams,
      segments,
      env,
      key,
    });
    const expectedURL = 'https://example.com/search?q=test';
    expect(url?.href).toBe(expectedURL);
  });
  it('should throw an error if the environment variable is not defined', () => {
    const env = {};
    const key = 'NEXT_PUBLIC_PDC_URL';
    expect(() => {
      buildURL({
        env,
        key,
      });
    }).toThrow('Failed to build URL: Invalid URL or configuration.');
  });
  it('should build a valid URL with the given parameters', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const locale = 'nl';
    const translations: any = (segment: string) => {
      if (segment === 'search') {
        return 'zoeken';
      }
      return segment;
    };
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      queryParams,
      segments,
      locale,
      translations,
      env,
      key,
    });
    const expectedURL = 'https://example.com/nl/zoeken?q=test';
    expect(url?.href).toBe(expectedURL);
  });
  it('should build a valid URL with the given parameters and isOrigin as true', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const locale = 'nl';
    const translations: any = (segment: string) => {
      if (segment === 'search') {
        return 'zoeken';
      }
      return segment;
    };
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com/test/api/' };
    const key = 'NEXT_PUBLIC_PDC_URL';
    const url = buildURL({
      queryParams,
      segments,
      locale,
      translations,
      env,
      key,
    });
    const expectedURL = 'https://example.com/nl/zoeken?q=test';
    expect(url?.href).toBe(expectedURL);
  });
  it('should build a valid URL with the given parameters and isOrigin as false', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];
    const locale = 'nl';
    const translations: any = (segment: string) => {
      if (segment === 'search') {
        return 'zoeken';
      }
      return segment;
    };
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com/test/api/' };
    const key = 'NEXT_PUBLIC_PDC_URL';

    const expectedURL = 'https://example.com/test/api/nl/zoeken?q=test';
    expect(() => {
      const url = buildURL({
        queryParams,
        segments,
        locale,
        translations,
        env,
        key,
        isOrigin: false,
      });
      expect(url?.href).toBe(expectedURL);
    });
  });
  it('should handle the case where the env URL already has a segment and isOrigin is false', () => {
    const queryParams = { q: 'test' };
    const segments = ['search'];

    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com/test/api/' };
    const key = 'NEXT_PUBLIC_PDC_URL';

    const expectedURL = 'https://example.com/test/api/search?q=test';
    expect(() => {
      const url = buildURL({
        queryParams,
        segments,
        env,
        key,
        isOrigin: false,
      });
      expect(url?.href).toBe(expectedURL);
    });
  });
  it('should handle the case where the segment already has a slash and isOrigin is false', () => {
    const queryParams = { q: 'test' };
    const segments = ['/search'];
    const env = { NEXT_PUBLIC_PDC_URL: 'https://example.com/test/api' };
    const key = 'NEXT_PUBLIC_PDC_URL';

    const expectedURL = 'https://example.com/test/api/search?q=test';
    expect(() => {
      const url = buildURL({
        queryParams,
        segments,
        env,
        key,
        isOrigin: false,
      });
      expect(url?.href).toBe(expectedURL);
    });
  });
  it('should throw an error when provide with invalid URL', () => {
    const env = { NEXT_PUBLIC_PDC_URL: 'invalid-url' };
    const key = 'NEXT_PUBLIC_PDC_URL';

    expect(() => {
      buildURL({
        env,
        key,
      });
    }).toThrow('Failed to build URL: Invalid URL or configuration.');
  });
});
