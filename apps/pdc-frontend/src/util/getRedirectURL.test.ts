import { getRedirectURL } from './getRedirectURL';

describe('getRedirectURL', () => {
  it('should return null if data is not an array', () => {
    expect(
      getRedirectURL({
        data: undefined,
        url: new URL('https://example.com'),
        currentPathname: '/old-slug',
      }),
    ).toBeNull();
  });
  it('should return null if no matching slug is found', () => {
    expect(
      getRedirectURL({
        data: [{ attributes: { slug: 'old-slug', oldSlugs: ['old-slug'] } }],
        url: new URL('https://example.com'),
        currentPathname: '/new-slug',
      }),
    ).toBeNull();
  });
  it('should return the redirect url if a matching slug is found', () => {
    const redirectUrl = getRedirectURL({
      data: [{ attributes: { slug: 'new-slug', oldSlugs: ['old-slug'] } }],
      url: new URL('https://example.com/old-slug'),
      currentPathname: '/old-slug',
    });
    expect(redirectUrl?.pathname).toBe('/new-slug');
  });
  it('should handle multiple old slugs', () => {
    const redirectUrl = getRedirectURL({
      data: [{ attributes: { slug: 'new-slug', oldSlugs: ['old-slug', 'another-old-slug'] } }],
      url: new URL('https://example.com/another-old-slug'),
      currentPathname: '/another-old-slug',
    });
    expect(redirectUrl?.pathname).toBe('/new-slug');
  });
  it('should handle multiple data entries', () => {
    const redirectUrl = getRedirectURL({
      data: [
        { attributes: { slug: 'new-slug', oldSlugs: ['old-slug'] } },
        { attributes: { slug: 'another-new-slug', oldSlugs: ['another-old-slug'] } },
      ],
      url: new URL('https://example.com/another-old-slug'),
      currentPathname: '/another-old-slug',
    });
    expect(redirectUrl?.pathname).toBe('/another-new-slug');
  });
  it('should handle empty old slugs', () => {
    const redirectUrl = getRedirectURL({
      data: [{ attributes: { slug: 'new-slug', oldSlugs: [] } }],
      url: new URL('https://example.com/old-slug'),
      currentPathname: '/old-slug',
    });
    expect(redirectUrl).toBeNull();
  });
  it('should handle empty data', () => {
    const redirectUrl = getRedirectURL({
      data: [],
      url: new URL('https://example.com/old-slug'),
      currentPathname: '/old-slug',
    });
    expect(redirectUrl).toBeNull();
  });
});
