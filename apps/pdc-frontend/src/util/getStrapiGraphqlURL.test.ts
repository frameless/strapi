import { getStrapiGraphqlURL } from './getStrapiGraphqlURL';

describe('getStrapiGraphqlURL', () => {
  it('should return the strapi graphql url', () => {
    const expected = 'https://example.com/graphql';
    process.env.STRAPI_PRIVATE_URL = 'https://example.com';
    expect(getStrapiGraphqlURL()).toBe(expected);
  });

  it('should throw an error if no strapi url is provided', () => {
    delete process.env.STRAPI_PRIVATE_URL;
    expect(() => getStrapiGraphqlURL()).toThrow('Failed to build URL: Invalid URL or configuration.');
  });
});
