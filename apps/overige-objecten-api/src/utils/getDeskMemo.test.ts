import { getDeskMemo } from './getDeskMemo';
import type { Section } from '../strapi-product-type';

describe('getDeskMemo', () => {
  it('should return the desk memo', () => {
    const sections: Section[] = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          data: {
            attributes: {
              content: {
                contentBlock: [
                  {
                    kennisartikelCategorie: 'inleiding',
                    content: '<h2>Inleiding - interne kop</h2> <p>Inhoud</p>',
                  },
                ],
                id: '1',
                uuid: 'C8C15769-A9F2-4F2C-89DB-544B98E91D2D',
              },
              title: 'Test Interne Content',
            },
            id: '1',
          },
        },
      },
    ];
    expect(getDeskMemo(sections)).toBe('<h2>Inleiding - interne kop</h2> <p>Inhoud</p>');
  });
  it('should return an empty string if no desk memo is found', () => {
    const sections: Section[] = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          data: {
            attributes: {
              content: {
                contentBlock: [],
                id: '1',
                uuid: '17B314FC-BDE5-4B5D-AEBA-7EEC6116AEEC',
              },
              title: 'Test Interne Content',
            },
            id: '1',
          },
        },
      },
    ];
    expect(getDeskMemo(sections)).toBe('');
  });
  it('should return concatenated values when provided multiple internal-fields', () => {
    const sections: Section[] = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          data: {
            attributes: {
              content: {
                contentBlock: [
                  {
                    kennisartikelCategorie: 'inleiding',
                    content: '<h2>Inleiding - interne kop - 1</h2> <p>Inhoud</p>',
                  },
                  {
                    kennisartikelCategorie: 'inleiding',
                    content: '<h2>Inleiding - interne kop - 2</h2> <p>Inhoud</p>',
                  },
                ],
                id: '1',
                uuid: '75A60558-A9AF-44A7-A7F1-89F7A3B788ED',
              },
              title: 'Test Interne Content',
            },
            id: '1',
          },
        },
      },
    ];
    expect(getDeskMemo(sections)).toBe(
      '<h2>Inleiding - interne kop - 1</h2> <p>Inhoud</p><h2>Inleiding - interne kop - 2</h2> <p>Inhoud</p>',
    );
  });
  it('should return an desk memo even if the kennisartikelCategorie is not provided', () => {
    const sections: Section[] = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          data: {
            attributes: {
              content: {
                contentBlock: [
                  {
                    kennisartikelCategorie: '',
                    content: '<h2>Inleiding - interne kop</h2> <p>Inhoud</p>',
                  },
                ],
                id: '1',
                uuid: 'C8C15769-A9F2-4F2C-89DB-544B98E91D2D',
              },
              title: 'Test Interne Content',
            },
            id: '1',
          },
        },
      },
    ];
    expect(getDeskMemo(sections)).toBe('<h2>Inleiding - interne kop</h2> <p>Inhoud</p>');
  });
});
