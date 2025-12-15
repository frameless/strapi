jest.mock('../components', () => ({
  Markdown: ({ children }: { children?: string }) => {
    return children || null;
  },
}));

jest.mock('@frameless/ui', () => {
  const React = require('react');
  return {
    LogoButton: ({ children, href, label, appearance, logo }: any) =>
      React.createElement(
        'a',
        {
          className: 'logo-button',
          href: href,
          'aria-label': label || '',
          'data-appearance': appearance || '',
          'data-logo': logo || '',
        },
        children,
      ),
    AdvancedLink: ({ children, href, external, icon, lang, dir }: any) =>
      React.createElement(
        'a',
        {
          href: href,
          rel: external ? 'external' : undefined,
          'data-icon': icon || undefined,
          lang: lang || undefined,
          dir: dir || undefined,
        },
        children,
      ),
    Img: ({ src, alt, width, height, figure }: any) =>
      React.createElement(
        'figure',
        null,
        figure && React.createElement('figcaption', null, figure),
        React.createElement('img', {
          src: src,
          alt: alt || '',
          width: width || undefined,
          height: height || undefined,
        }),
      ),
    MultiColumnsButton: ({ columns }: any) =>
      React.createElement('div', { className: 'multi-columns', 'data-columns': JSON.stringify(columns) }),
  };
});

jest.mock('@utrecht/component-library-react', () => {
  const React = require('react');
  return {
    ButtonGroup: ({ children, className }: any) =>
      React.createElement('div', { className: className || 'button-group' }, children),
    SpotlightSection: ({ children, type }: any) =>
      React.createElement('section', { className: 'spotlight', 'data-type': type }, children),
  };
});

jest.mock('@frameless/utils', () => ({
  getDirectionFromLanguageCode: (lang: string) => (lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'),
}));

import React from 'react';
import { processProductData, type SectionData } from './processProductData';
import { PriceType } from '../components/Content';

describe('processProductData', () => {
  const locale = 'nl';
  const priceData: PriceType[] = [
    {
      label: 'Test Price',
      currency: 'EUR',
      value: '20',
      uuid: 'b958a41e-aba6-4253-8e61-d8af948971cb',
    },
  ];

  describe('rich-text component', () => {
    it('should pass through rich-text content unchanged', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-rich-text',
          id: '1',
          content: '<p><strong>Bold text</strong> and normal text.</p>',
          kennisartikelCategorie: 'inleiding',
        },
      ];

      const result = processProductData({ data: data, priceData, locale, url: null });

      expect(Array.isArray(result)).toBe(true);
      if (Array.isArray(result)) {
        expect(result[0]).toEqual(data[0]);
      }
    });

    it('should preserve price span attributes in rich-text', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-rich-text',
          id: '1',
          content:
            '<p><span data-strapi-idref="b958a41e-aba6-4253-8e61-d8af948971cb" data-strapi-category="price"></span></p>',
          kennisartikelCategorie: 'inleiding',
        },
      ];

      const result = processProductData({ data: data as any, priceData, locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('data-strapi-idref="b958a41e-aba6-4253-8e61-d8af948971cb"');
        expect(result[0].content).toContain('data-strapi-category="price"');
      }
    });
  });

  describe('logo-button component', () => {
    it('should render normal logo button with href', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          href: 'https://www.example.nl',
          textContent: 'Click me',
          label: 'Button label',
          logo: 'digid',
          appearance: 'primary-action-button',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('10');
        expect(result[0].content).toContain('href="https://www.example.nl"');
        expect(result[0].content).toContain('Click me');
        expect(result[0].content).toContain('aria-label="Button label"');
        expect(result[0].content).toContain('data-logo="digid"');
        expect(result[0].content).toContain('data-appearance="primary-action-button"');
      }
    });

    it('should generate absolute URL for openFormsEmbed with base URL', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'uuid=85c48eae-e823-404a-9ae4-6d9a022244fc&slug=demo-form&label=Demo+form',
          textContent: 'Submit form',
          label: 'Form button',
          appearance: 'primary-action-button',
        },
      ];

      const result = processProductData({ data: data, priceData: [], locale, url: baseUrl });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('https://example.com.nl/form/demo-form');
        expect(result[0].content).toContain('Submit form');
      }
    });

    it('should generate relative URL for openFormsEmbed without base URL', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'uuid=85c48eae&slug=demo-form&label=Demo+form',
          textContent: 'Submit form',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('/form/demo-form');
        expect(result[0].content).not.toContain('https://');
      }
    });

    it('should use label from openFormsEmbed when textContent is missing', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'uuid=85c48eae&slug=demo-form&label=Form+Label+From+Embed',
          label: 'Aria Label',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: baseUrl });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('Form Label From Embed');
      }
    });

    it('should URL-encode slug properly', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'slug=klacht-over-de-gemeente-doorgeven&label=Complaint',
          textContent: 'Submit complaint',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: baseUrl });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('https://example.com.nl/form/klacht-over-de-gemeente-doorgeven');
      }
    });

    it('should return empty content when openFormsEmbed has no slug', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'uuid=85c48eae&label=No+Slug',
          textContent: 'Button text',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        // Should render empty or minimal content since no valid href
        expect(result[0].content).toBe('');
      }
    });
  });

  describe('link component', () => {
    it('should render internal link', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-link',
          id: '20',
          href: '/about',
          textContent: 'About us',
          kennisartikelCategorie: 'navigation',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('20');
        expect(result[0].content).toContain('href="/about"');
        expect(result[0].content).toContain('About us');
        expect(result[0].content).not.toContain('rel="external"');
      }
    });

    it('should render external link with external attribute', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-link',
          id: '20',
          href: 'https://external.com',
          textContent: 'External link',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('href="https://external.com"');
        expect(result[0].content).toContain('rel="external"');
      }
    });

    it('should include icon when specified', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-link',
          id: '20',
          href: '/back',
          textContent: 'Go back',
          icon: 'chevronLeft',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('data-icon="chevronLeft"');
      }
    });

    it('should include language and direction attributes', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-link',
          id: '20',
          href: '/ar-page',
          textContent: 'Arabic page',
          language: 'ar',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('lang="ar"');
        expect(result[0].content).toContain('dir="rtl"');
      }
    });
  });

  describe('image component', () => {
    it('should render image with all attributes', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-image',
          id: '30',
          imageData: {
            url: 'https://example.com/image.jpg',
            width: 800,
            height: 600,
            alternativeText: 'A beautiful image',
            caption: 'Image caption text',
          },
          kennisartikelCategorie: 'media',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('30');
        expect(result[0].content).toContain('src="https://example.com/image.jpg"');
        expect(result[0].content).toContain('alt="A beautiful image"');
        expect(result[0].content).toContain('width="800"');
        expect(result[0].content).toContain('height="600"');
        expect(result[0].content).toContain('Image caption text');
      }
    });

    it('should handle missing optional image properties', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-image',
          id: '30',
          imageData: {
            url: 'https://example.com/image.jpg',
          },
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('src="https://example.com/image.jpg"');
        expect(result[0].content).toContain('<img');
      }
    });
  });

  describe('accordion component', () => {
    it('should render multiple accordion items', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-accordion',
          id: '40',
          item: [
            {
              id: 'acc-1',
              label: 'First accordion',
              body: '## Heading\n\nSome content here.',
            },
            {
              id: 'acc-2',
              label: 'Second accordion',
              body: 'Plain text content.',
            },
          ],
          kennisartikelCategorie: 'faq',
        },
      ];

      const result = processProductData({ data, priceData, locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('40');
        expect(result[0].content).toContain('<details');
        expect(result[0].content).toContain('<summary>First accordion</summary>');
        expect(result[0].content).toContain('<summary>Second accordion</summary>');
        expect(result[0].content).toContain('## Heading');
        expect(result[0].content).toContain('Some content here.');
        expect(result[0].content).toContain('Plain text content.');
      }
    });

    it('should handle accordion item without body', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-accordion',
          id: '40',
          item: [
            {
              id: 'acc-1',
              label: 'Empty accordion',
            },
          ],
        },
      ];

      const result = processProductData({ data, priceData, locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('<summary>Empty accordion</summary>');
        expect(result[0].content).toContain('</details>');
      }
    });

    it('should return empty string for accordion with no items', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-accordion',
          id: '40',
          item: [],
        },
      ];

      const result = processProductData({ data, priceData, locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toBe('');
      }
    });
  });

  describe('multi-columns-button component', () => {
    it('should process columns with logo buttons', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-multi-columns-button',
          id: '50',
          column: [
            {
              logoButton: [
                {
                  label: 'Button 1',
                  href: '/page1',
                  textContent: 'Click here',
                  appearance: 'primary-action-button',
                },
              ],
            },
            {
              logoButton: [
                {
                  openFormsEmbed: 'slug=form-1&label=Form+Button',
                  textContent: 'Submit form',
                },
              ],
            },
          ],
          kennisartikelCategorie: 'cta',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: baseUrl });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('50');
        expect(result[0].content).toContain('multi-columns');

        // Extract the data-columns attribute
        const match = result[0].content.match(/data-columns="([^"]+)"/);
        expect(match).toBeTruthy();

        if (match) {
          // Decode HTML entities
          const decodedJson = match[1]
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

          const parsedColumns = JSON.parse(decodedJson);
          expect(parsedColumns).toHaveLength(2);
          expect(parsedColumns[0].logoButton[0].href).toBe('/page1');
          expect(parsedColumns[1].logoButton[0].href).toContain('https://example.com.nl/form/form-1');
        }
      }
    });

    it('should filter out invalid logo buttons', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-multi-columns-button',
          id: '50',
          column: [
            {
              logoButton: [
                {
                  openFormsEmbed: 'label=No+Slug', // no slug, should be filtered
                },
                {
                  href: '/valid-link',
                  textContent: 'Valid button',
                },
              ],
            },
          ],
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        const match = result[0].content.match(/data-columns="([^"]+)"/);
        if (match) {
          const decodedJson = match[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&');

          const parsedColumns = JSON.parse(decodedJson);
          expect(parsedColumns[0].logoButton).toHaveLength(1);
          expect(parsedColumns[0].logoButton[0].href).toBe('/valid-link');
        }
      }
    });
  });

  describe('spotlight component', () => {
    it('should render spotlight with markdown content', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-spotlight',
          id: '60',
          content: '**Bold** content here.',
          type: 'info',
          kennisartikelCategorie: 'highlight',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].id).toBe('60');
        expect(result[0].content).toContain('class="spotlight"');
        expect(result[0].content).toContain('data-type="info"');
        expect(result[0].content).toContain('**Bold** content here.');
      }
    });

    it('should render spotlight with logo buttons', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-spotlight',
          id: '60',
          content: 'Some content',
          type: 'info',
          logoButton: [
            {
              label: 'Normal button',
              href: '/about',
              textContent: 'About us',
            },
            {
              openFormsEmbed: 'slug=contact-form&label=Contact',
              textContent: 'Contact form',
            },
          ],
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: baseUrl });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('href="/about"');
        expect(result[0].content).toContain('About us');
        expect(result[0].content).toContain('https://example.com.nl/form/contact-form');
        expect(result[0].content).toContain('Contact form');
      }
    });

    it('should handle spotlight without content', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-spotlight',
          id: '60',
          type: 'warning',
          logoButton: [
            {
              href: '/action',
              textContent: 'Take action',
            },
          ],
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].content).toContain('class="spotlight"');
        expect(result[0].content).toContain('data-type="warning"');
        expect(result[0].content).toContain('href="/action"');
      }
    });

    it('should filter out invalid logo buttons in spotlight', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-spotlight',
          id: '60',
          type: 'info',
          logoButton: [
            {
              href: '/valid',
              textContent: 'Valid button',
            },
            {
              openFormsEmbed: 'label=Invalid', // no slug
            },
          ],
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        // Should only contain the valid button
        expect(result[0].content).toContain('href="/valid"');
        expect(result[0].content).toContain('Valid button');
        // Count logo-button occurrences
        const buttonMatches = result[0].content.match(/class="logo-button"/g);
        expect(buttonMatches?.length).toBe(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should return empty object for non-array data', () => {
      const result = processProductData({ data: null as any, priceData: [], locale, url: null });
      expect(result).toEqual({});
    });

    it('should return null for unknown component types', () => {
      const data: SectionData[] = [
        {
          __component: 'components.unknown-component',
          id: '999',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0]).toBeNull();
      }
    });

    it('should handle null sections in array', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-rich-text',
          id: '1',
          content: '<p>Valid content</p>',
        },
        null as any,
        undefined,
        {
          __component: 'components.utrecht-rich-text',
          id: '2',
          content: '<p>Another valid content</p>',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0]).toEqual(data[0]);
        expect(result[1]).toBeNull();
        expect(result[2]).toBeNull();
        expect(result[3]).toEqual(data[3]);
      }
    });

    it('should preserve kennisartikelCategorie in transformed sections', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          href: '/test',
          textContent: 'Test',
          kennisartikelCategorie: 'actions',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].kennisartikelCategorie).toBe('actions');
      }
    });

    it('should handle sections without kennisartikelCategorie', () => {
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          href: '/test',
          textContent: 'Test',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: null });
      if (Array.isArray(result)) {
        expect(result[0].kennisartikelCategorie).toBeUndefined();
      }
    });
  });

  describe('URL handling', () => {
    it('should handle URL encoding for special characters in slugs', () => {
      const baseUrl = new URL('https://example.com.nl');
      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'slug=form-with-special-chars-@#$&label=Form',
          textContent: 'Form',
        },
      ];

      const result = processProductData({ data, priceData: [], locale, url: baseUrl });

      if (Array.isArray(result)) {
        // Should contain encoded slug
        expect(result[0].content).toContain('/form/form-with-special-chars-%40%23%24');
      }
    });

    it('should construct absolute URLs correctly with different base URLs', () => {
      const baseUrl1 = new URL('https://example.com');
      const baseUrl2 = new URL('https://example.nl/subdirectory');

      const data: SectionData[] = [
        {
          __component: 'components.utrecht-logo-button',
          id: '10',
          openFormsEmbed: 'slug=test-form&label=Test',
          textContent: 'Test',
        },
      ];

      const result1 = processProductData({ data, priceData: [], locale, url: baseUrl1 });
      const result2 = processProductData({ data, priceData: [], locale, url: baseUrl2 });
      if (Array.isArray(result1) && Array.isArray(result2)) {
        expect(result1[0].content).toContain('https://example.com/form/test-form');
        expect(result2[0].content).toContain('https://example.nl/form/test-form');
      }
    });
  });
});
