import { getVertalingen } from './getVertalingen';

describe('getVertalingen', () => {
  it('should return an array with a single object containing the expected properties', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
      priceData: [{ uuid: '01C87F1D-2F84-4768-98D9-90BA10263B1D', currency: 'EUR', label: 'label', value: '10' }],
      attributes: {
        title: 'title',
        slug: 'test',
        uuid: 'uuid',
        createdAt: 'createdAt',
        metaTags: {
          keymatch: 'test',
          title: 'title',
          description: 'description',
        },
        locale: 'nl',
        updatedAt: 'updatedAt',
        sections: [],
        kennisartikelMetadata: {
          afdelingen: [
            {
              afdelingId: '7A6703DD-A49D-4D20-B98A-E0D807EBB4CD',
              afdelingNaam: 'Demo afdeling',
            },
          ],
          doelgroep: 'eu-bedrijf',
          productAanwezig: false,
          productValtOnder: null,
          upnUri: 'https://example.com',
          uuid: '',
          verantwoordelijkeOrganisatie: {
            owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
            owmsPrefLabel: 'Gemeente Utrecht',
            owmsEndDate: '2025-02-10T23:00:00.000Z',
          },
        },
        kennisartikel: {
          data: {
            attributes: {
              internalSections: [],
            },
          },
        },
        vac: {
          data: [],
        },
        price: {
          data: {
            attributes: {
              price: [],
            },
          },
        },
        additional_information: {
          data: {
            attributes: {
              title: '',
              content: {
                id: '',
                uuid: '',
                contentBlock: [],
              },
            },
            id: '1',
          },
        },
      },
      trefwoorden: [{ trefwoord: 'trefwoord' }],
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: [{ trefwoord: 'trefwoord' }],
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
    expect(result[0].deskMemo).toContain('<p>deskMemo</p>');
  });

  it('should handle missing optional properties', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
      attributes: {
        title: 'title',
        slug: 'test',
        uuid: 'uuid',
        createdAt: 'createdAt',
        metaTags: {
          keymatch: 'test',
          title: 'title',
          description: 'description',
        },
        locale: 'nl',
        updatedAt: 'updatedAt',
        sections: [],
        kennisartikelMetadata: {
          afdelingen: [
            {
              afdelingId: '7A6703DD-A49D-4D20-B98A-E0D807EBB4CD',
              afdelingNaam: 'Demo afdeling',
            },
          ],
          doelgroep: 'eu-bedrijf',
          productAanwezig: false,
          productValtOnder: null,
          upnUri: 'https://example.com',
          uuid: '',
          verantwoordelijkeOrganisatie: {
            owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
            owmsPrefLabel: 'Gemeente Utrecht',
            owmsEndDate: '2025-02-10T23:00:00.000Z',
          },
        },
        kennisartikel: {
          data: {
            attributes: {
              internalSections: [],
            },
          },
        },
        vac: {
          data: [],
        },
        price: {
          data: {
            attributes: {
              price: [],
            },
          },
        },
        additional_information: {
          data: {
            attributes: {
              title: '',
              content: {
                id: '',
                uuid: '',
                contentBlock: [],
              },
            },
            id: '1',
          },
        },
      },
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
  });

  it('should handle empty bothContentBlock', () => {
    const result = getVertalingen({
      bothContentBlock: {},
      deskMemo: 'deskMemo',
      attributes: {
        title: 'title',
        slug: 'test',
        uuid: 'uuid',
        createdAt: 'createdAt',
        metaTags: {
          keymatch: 'test',
          title: 'title',
          description: 'description',
        },
        locale: 'nl',
        updatedAt: 'updatedAt',
        sections: [],
        kennisartikelMetadata: {
          afdelingen: [
            {
              afdelingId: '7A6703DD-A49D-4D20-B98A-E0D807EBB4CD',
              afdelingNaam: 'Demo afdeling',
            },
          ],
          doelgroep: 'eu-bedrijf',
          productAanwezig: false,
          productValtOnder: null,
          upnUri: 'https://example.com',
          uuid: '',
          verantwoordelijkeOrganisatie: {
            owmsIdentifier: 'http://standaarden.overheid.nl/owms/terms/Utrecht_(gemeente)',
            owmsPrefLabel: 'Gemeente Utrecht',
            owmsEndDate: '2025-02-10T23:00:00.000Z',
          },
        },
        kennisartikel: {
          data: {
            attributes: {
              internalSections: [],
            },
          },
        },
        vac: {
          data: [],
        },
        price: {
          data: {
            attributes: {
              price: [],
            },
          },
        },
        additional_information: {
          data: {
            attributes: {
              title: '',
              content: {
                id: '',
                uuid: '',
                contentBlock: [],
              },
            },
            id: '1',
          },
        },
      },
    });
    expect(result).toEqual([
      {
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
  });

  it('should handle missing attributes', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
      attributes: {} as any,
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: undefined,
        titel: undefined,
        datumWijziging: undefined,
      },
    ]);
  });
});
