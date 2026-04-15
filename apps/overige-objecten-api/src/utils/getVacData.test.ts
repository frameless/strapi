import { getStrapiVacData } from '../__mocks__';

import { getVacData } from './getVacData';

const serverURL = 'http://localhost:4001';
const vacSchemaURL = 'http://localhost:4001/api/v2/objecttypes/vac';

describe('getVacData', () => {
  it('should include contact_information_internal in antwoord when available', () => {
    const { data } = getStrapiVacData({
      contact_information_internal: [
        {
          contentBlock: [
            {
              id: '1',
              content: 'Contact info: 123-456789',
            },
          ],
        },
      ],
    });
    const [result] = getVacData({ data, serverURL, vacSchemaURL });
    expect(result.record.data.antwoord).toContain('U moet een afspraak maken');
    expect(result.record.data.antwoord).toContain('Contact info: 123-456789');
  });

  it('should handle null contact_information_internal gracefully', () => {
    const { data } = getStrapiVacData();
    const [result] = getVacData({ data, serverURL, vacSchemaURL });

    expect(result.record.data.antwoord).toContain('U moet een afspraak maken');
  });

  it('should include contact_information_public in antwoord when available', () => {
    const { data } = getStrapiVacData({
      contact_information_public: {
        contentBlock: [
          {
            id: '1',
            content: 'Public contact: info@example.com',
          },
        ],
      },
    });
    const [result] = getVacData({ data, serverURL, vacSchemaURL });

    expect(result.record.data.antwoord).toContain('U moet een afspraak maken');
    expect(result.record.data.antwoord).toContain('info@example.com');
  });

  it('should return empty array when no VAC data', () => {
    const result = getVacData({
      data: { vacs_connection: { nodes: [], pageInfo: { total: 0, page: 1, pageSize: 1, pageCount: 0 } } },
      serverURL,
      vacSchemaURL,
    });

    expect(result).toEqual([]);
  });
});
