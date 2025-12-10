import { getParsOpenFormsEmbedData, processProductData } from './processProductData';

describe('getParsOpenFormsEmbedData', () => {
  describe('happy path', () => {
    it('parses valid openFormsEmbed string', () => {
      const result = getParsOpenFormsEmbedData('slug=test-form&uuid=123&label=Test Form');
      expect(result).toEqual({
        slug: 'test-form',
        uuid: '123',
        label: 'Test Form',
      });
    });

    it('handles missing parameters', () => {
      const result = getParsOpenFormsEmbedData('slug=test-form');
      expect(result).toEqual({
        slug: 'test-form',
        uuid: null,
        label: null,
      });
    });
  });

  describe('unhappy path', () => {
    it('returns empty data for null input', () => {
      const result = getParsOpenFormsEmbedData(null);
      expect(result).toEqual({ slug: null, uuid: null, label: null });
    });

    it('returns empty data for undefined input', () => {
      const result = getParsOpenFormsEmbedData(undefined);
      expect(result).toEqual({ slug: null, uuid: null, label: null });
    });

    it('returns empty data for empty string', () => {
      const result = getParsOpenFormsEmbedData('');
      expect(result).toEqual({ slug: null, uuid: null, label: null });
    });

    it('returns empty data for non-string input', () => {
      const result = getParsOpenFormsEmbedData(123 as any);
      expect(result).toEqual({ slug: null, uuid: null, label: null });
    });
  });
});

describe('processProductData', () => {
  const baseParams = {
    url: 'http://localhost:3000',
    priceData: {},
    locale: 'en',
  };

  describe('happy path', () => {
    it('processes utrecht-rich-text component', () => {
      const data = [{ __component: 'components.utrecht-rich-text', id: 1, content: 'Test' }];
      const result = processProductData({ ...baseParams, data });
      expect(result).toEqual([{ __component: 'components.utrecht-rich-text', id: 1, content: 'Test' }]);
    });

    it('processes utrecht-logo-button component', () => {
      const data = [
        {
          __component: 'components.utrecht-logo-button',
          id: 1,
          href: '/test',
          label: 'Test Button',
          textContent: 'Click me',
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('processes utrecht-link component', () => {
      const data = [
        {
          __component: 'components.utrecht-link',
          id: 1,
          href: '/test',
          textContent: 'Test Link',
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('processes utrecht-image component', () => {
      const data = [
        {
          __component: 'components.utrecht-image',
          id: 1,
          imageData: {
            url: '/image.jpg',
            width: 800,
            height: 600,
            alternativeText: 'Test image',
          },
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('processes utrecht-accordion component', () => {
      const data = [
        {
          __component: 'components.utrecht-accordion',
          id: 1,
          item: [{ id: 1, label: 'Question', body: 'Answer' }],
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('processes utrecht-multi-columns-button component', () => {
      const data = [
        {
          __component: 'components.utrecht-multi-columns-button',
          id: 1,
          column: [
            {
              title: 'Column 1',
              logoButton: [{ href: '/test', children: 'Button', label: 'Test' }],
            },
          ],
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('processes utrecht-spotlight component', () => {
      const data = [
        {
          __component: 'components.utrecht-spotlight',
          id: 1,
          type: 'info',
          content: 'Spotlight content',
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
      expect(result[0].id).toBe(1);
    });

    it('uses default locale when not provided', () => {
      const data = [
        {
          __component: 'components.utrecht-accordion',
          id: 1,
          item: [{ id: 1, label: 'Question', body: 'Answer' }],
        },
      ];
      const result = processProductData({ url: baseParams.url, data });
      expect(result[0]).toHaveProperty('content');
    });
  });

  describe('unhappy path', () => {
    it('throws error when url is missing', () => {
      expect(() => processProductData({ url: '', data: [] })).toThrow('url parameter is required');
    });

    it('returns empty array for non-array data', () => {
      const result = processProductData({ ...baseParams, data: null });
      expect(result).toEqual([]);
    });

    it('returns empty array for undefined data', () => {
      const result = processProductData({ ...baseParams, data: undefined });
      expect(result).toEqual([]);
    });

    it('returns null for unknown component type', () => {
      const data = [{ __component: 'components.unknown', id: 1 }];
      const result = processProductData({ ...baseParams, data });
      expect(result).toEqual([null]);
    });

    it('handles missing section properties gracefully', () => {
      const data = [{ __component: 'components.utrecht-rich-text' }];
      const result = processProductData({ ...baseParams, data });
      expect(result).toHaveLength(1);
    });

    it('handles accordion without items', () => {
      const data = [{ __component: 'components.utrecht-accordion', id: 1 }];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
    });

    it('handles multi-columns-button without columns', () => {
      const data = [{ __component: 'components.utrecht-multi-columns-button', id: 1 }];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
    });

    it('handles spotlight without logoButton', () => {
      const data = [{ __component: 'components.utrecht-spotlight', id: 1, type: 'info' }];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
    });
  });

  describe('openFormsEmbed processing', () => {
    it('processes openFormsEmbed in logo button', () => {
      const data = [
        {
          __component: 'components.utrecht-logo-button',
          id: 1,
          openFormsEmbed: 'slug=contact&uuid=456&label=Contact Form',
          label: 'Test',
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0].content).toContain('/form/contact');
    });

    it('processes openFormsEmbed in multi-columns-button', () => {
      const data = [
        {
          __component: 'components.utrecht-multi-columns-button',
          id: 1,
          column: [
            {
              title: 'Forms',
              logoButton: [
                {
                  openFormsEmbed: 'slug=test-form&label=Test',
                  children: 'Submit',
                  href: '',
                  label: 'Form',
                },
              ],
            },
          ],
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
    });

    it('handles invalid openFormsEmbed gracefully', () => {
      const data = [
        {
          __component: 'components.utrecht-logo-button',
          id: 1,
          openFormsEmbed: 'invalid',
          label: 'Test',
        },
      ];
      const result = processProductData({ ...baseParams, data });
      expect(result[0]).toHaveProperty('content');
    });
  });
});
