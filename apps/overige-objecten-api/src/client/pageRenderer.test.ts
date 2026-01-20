import { pageRenderer } from './pageRenderer';

describe('pageRenderer', () => {
  it('uses VAC title when vacData is provided', () => {
    const html = pageRenderer({
      vacData: {
        record: {
          data: {
            vraag: 'Test VAC',
            uuid: '',
            antwoord: '',
            status: null,
            doelgroep: '',
            afdelingen: [],
            toelichting: '',
            trefwoorden: [],
            url: '',
            gerelateerdeVACs: [],
            gerelateerdeProducten: [],
          },
          index: 0,
          startAt: '',
          typeVersion: 0,
          geometry: undefined,
          endAt: null,
          registrationAt: '',
        },
        type: 'http://example.com/api/v2/objecttypes/vac',
        uuid: '',
        url: '',
      },
      status: 'DRAFT',
    });

    expect(html).toContain('<title>Test VAC</title>');
  });

  it('renders kennisartikel title from vertalingen', () => {
    const html = pageRenderer({
      kennisartikelData: {
        record: {
          data: {
            vertalingen: [
              {
                titel: 'Test Artikel',
                taal: '',
                datumWijziging: '',
                trefwoorden: [],
              },
            ],
            uuid: '',
            url: '',
            publicatieDatum: '',
            beschikbareTalen: [],
          },
          index: 0,
          startAt: '',
          typeVersion: 0,
          geometry: undefined,
          endAt: null,
          registrationAt: '',
        },
        type: 'http://example.com/api/v2/objecttypes/kennisartikel',
        uuid: '',
        url: '',
      },
      status: 'PUBLISHED',
    });

    expect(html).toContain('<title>Test Artikel</title>');
  });
  it('embeds preview status in window.__STATUS__', () => {
    const html = pageRenderer({
      kennisartikelData: {
        record: {
          data: { vertalingen: [] },
        } as any,
        type: 'http://example.com/api/v2/objecttypes/kennisartikel',
        uuid: '',
        url: '',
      },
      status: 'PUBLISHED',
    });

    expect(html).toContain(`window.__STATUS__ = 'PUBLISHED'`);
  });
  it('embeds kennisartikel preview data in window object', () => {
    const kennisartikelData = {
      record: { data: { vertalingen: [] } },
      uuid: '123',
      url: '/test',
    } as any;

    const html = pageRenderer({
      kennisartikelData,
      status: 'DRAFT',
    });

    expect(html).toContain(`window.__KENNISARTIKEL_PREVIEW_DATA__ = ${JSON.stringify(kennisartikelData)}`);
  });
});
