import { getStrapiPluginName } from './index';

describe('getStrapiPluginName', () => {
  it('should return the plugin name without the @frameless/strapi-plugin- prefix', () => {
    expect(getStrapiPluginName('@frameless/strapi-plugin-example')).toBe('example');
  });
});
