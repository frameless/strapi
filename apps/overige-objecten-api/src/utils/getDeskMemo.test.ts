import { Sections } from '../shared-types';

import { getDeskMemo } from './getDeskMemo';

describe('getDeskMemo', () => {
  it('should return the desk memo', () => {
    const sections: Sections | null = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          id: 'e51318b2-ddb3-4e85-b746-5f29f3762a82',
          contact_information_internal: null,
          contact_information_public: null,
          content: {
            id: 'e51318b2-ddb3-4e85-b746-5f29f3762a82',
            uuid: '75A60558-A9AF-44A7-A7F1-89F7A3B788ED',
            keywords: 'test,desk memo',
            contentBlock: [
              {
                kennisartikelCategorie: 'inleiding',
                content: '<h2>Inleiding - interne kop</h2> <p>Inhoud</p>',
              },
            ],
          },
          title: 'Test Interne Content',
        },
        id: '1',
      },
    ];
    expect(getDeskMemo(sections)).toBe('<h2>Inleiding - interne kop</h2> <p>Inhoud</p>');
  });
  it('should return an empty string if no desk memo is found', () => {
    const sections: Sections | null = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          contact_information_internal: null,
          contact_information_public: null,
          content: {
            id: '1',
            keywords: 'test,desk memo',
            contentBlock: [],
            uuid: '17B314FC-BDE5-4B5D-AEBA-7EEC6116AEEC',
          },
          title: 'Test Interne Content',
          id: '1',
        },
        id: '1',
      },
    ];
    expect(getDeskMemo(sections)).toBe('');
  });
  it('should return concatenated values when provided multiple internal-fields', () => {
    const sections: Sections | null = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          contact_information_internal: null,
          contact_information_public: null,
          content: {
            id: '2',
            uuid: '75A60558-A9AF-44A7-A7F1-89F7A3B788ED',
            keywords: 'test,desk memo',
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
          },
          title: 'Test Interne Content',
          id: '2',
        },
        id: '2',
      },
    ];
    expect(getDeskMemo(sections)).toBe(
      '<h2>Inleiding - interne kop - 1</h2> <p>Inhoud</p><h2>Inleiding - interne kop - 2</h2> <p>Inhoud</p>',
    );
  });
  it('should return an desk memo even if the kennisartikelCategorie is not provided', () => {
    const sections: Sections | null = [
      {
        component: 'ComponentComponentsInternalBlockContent',
        internal_field: {
          id: '3',
          contact_information_internal: null,
          contact_information_public: null,
          content: {
            id: '3',
            uuid: 'C8C15769-A9F2-4F2C-89DB-544B98E91D2D',
            keywords: 'test,desk memo',
            contentBlock: [
              {
                kennisartikelCategorie: null,
                content: '<h2>Inleiding - interne kop</h2> <p>Inhoud</p>',
              },
            ],
          },
          title: 'Test Interne Content',
        },
        id: '3',
      },
    ];
    expect(getDeskMemo(sections)).toBe('<h2>Inleiding - interne kop</h2> <p>Inhoud</p>');
  });
});
