import { getVacData } from './getVacData';
import type { VACSData } from '../strapi-product-type';

describe('getVacData', () => {
  const serverURL = 'http://localhost:4001';
  const vacSchemaURL = 'http://localhost:4001/api/v2/objecttypes/vac';

  it('should include contact_information_internal in antwoord when available', () => {
    const mockData: VACSData = {
      vacs: {
        data: [
          {
            id: '1',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              title: 'Test VAC',
              contact_information_internal: {
                data: [
                  {
                    attributes: {
                      contentBlock: [
                        {
                          id: '1',
                          content: 'Contact info: 123-456789',
                        },
                      ],
                    },
                  },
                  {
                    attributes: {
                      contentBlock: [
                        {
                          id: '2',
                          content: ' ',
                        },
                      ],
                    },
                  },
                ],
              },
              vac: {
                uuid: 'test-uuid',
                antwoord: [
                  {
                    content: 'Main answer content',
                    kennisartikelCategorie: undefined,
                  },
                ],
                status: 'actief',
                doelgroep: 'eu-burger',
                afdelingen: [],
                toelichting: undefined,
                keywords: 'test',
              },
              contact_information_public: {
                data: {
                  attributes: {
                    contentBlock: [],
                  },
                },
              },
            },
          },
        ],
      },
    };

    const result = getVacData({ data: mockData, serverURL, vacSchemaURL });

    expect(result).toHaveLength(1);
    expect(result[0].record.data.antwoord).toContain('Main answer content');
    expect(result[0].record.data.antwoord).toContain('Contact info: 123-456789');
  });

  it('should handle null contact_information_internal gracefully', () => {
    const mockData: VACSData = {
      vacs: {
        data: [
          {
            id: '1',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              title: 'Test VAC',
              contact_information_internal: {
                data: [],
              },
              vac: {
                uuid: 'test-uuid',
                antwoord: [
                  {
                    content: 'Main answer content',
                    kennisartikelCategorie: '',
                  },
                ],
                status: 'actief',
                doelgroep: 'eu-bedrijf',
                afdelingen: [],
                toelichting: undefined,
                keywords: 'test',
              },
              contact_information_public: {
                data: {
                  attributes: {
                    contentBlock: [],
                  },
                },
              },
            },
          },
        ],
      },
    };

    const result = getVacData({ data: mockData, serverURL, vacSchemaURL });

    expect(result).toHaveLength(1);
    expect(result[0].record.data.antwoord).toBe('Main answer content');
  });

  it('should include contact_information_public in antwoord when available', () => {
    const mockData: VACSData = {
      vacs: {
        data: [
          {
            id: '1',
            attributes: {
              createdAt: '2024-11-05T16:03:50.975Z',
              updatedAt: '2024-11-05T16:03:50.975Z',
              title: 'Test VAC',
              contact_information_internal: {
                data: [],
              },
              vac: {
                uuid: 'test-uuid',
                antwoord: [
                  {
                    content: 'Main answer content',
                    kennisartikelCategorie: undefined,
                  },
                ],
                status: 'actief',
                doelgroep: 'eu-burger',
                afdelingen: [],
                toelichting: undefined,
                keywords: 'test',
              },
              contact_information_public: {
                data: {
                  attributes: {
                    contentBlock: [
                      {
                        id: '1',
                        content: 'Public contact: info@example.com',
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
    };

    const result = getVacData({ data: mockData, serverURL, vacSchemaURL });

    expect(result).toHaveLength(1);
    expect(result[0].record.data.antwoord).toContain('Main answer content');
    expect(result[0].record.data.antwoord).toContain('info@example.com');
  });

  it('should return empty array when no VAC data', () => {
    const mockData: VACSData = {
      vacs: {
        data: [],
      },
    };

    const result = getVacData({ data: mockData, serverURL, vacSchemaURL });

    expect(result).toEqual([]);
  });
});
