import request from 'supertest';
import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import { fetchData, ErrorHandler } from '@frameless/utils';

vi.mock('@frameless/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@frameless/utils')>();
  return {
    ...actual,
    fetchData: vi.fn(),
    ErrorHandler: class ErrorHandler extends Error {
      options: { statusCode: number };
      isOperational: boolean = true;
      constructor(message: string, options = { statusCode: 500 }) {
        super(message);
        this.options = options;
        this.isOperational = true;
      }
    },
    envAvailability: vi.fn(),
  };
});

const mockedFetchData = fetchData as Mock;

import {
  getStrapiKennisartikelData,
  getStrapiVacData,
  kennisartikelObject,
  objectsResponseData,
  vacObject,
} from '../../__mocks__';
import app from '../../server';
import * as getPaginatedResponseUtils from '../../utils/getPaginatedResponse';
import type { Trefwoord } from '../openapi/types';
import { getStrapiKennisartikelDataByUUID } from '../../__mocks__/getStrapiKennisartikelDataByUUID';
import { getStrapiVacDataByUUID } from '../../__mocks__/getStrapiVacDataByUUID';
import { ContactInformationPublic, UtrechtRichText2 } from '../../shared-types';

vi.mock('../../utils/getTheServerURL.ts', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));
vi.mock('../../utils/getPaginatedResponse.ts');

describe('Objects controller', () => {
  beforeEach(() => {
    mockedFetchData.mockImplementation(() => ({ data: { products: [] }, vac: { data: [] } }));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET /api/objects', () => {
    it('should return kennisartikel & VAC by default', async () => {
      const spay = vi.spyOn(getPaginatedResponseUtils, 'getPaginatedResponse').mockImplementation(() =>
        Promise.resolve({
          page: 1,
          pageSize: 10,
          count: 3,
          total: 2,
          next: null,
          previous: null,
        }),
      );
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual({
        page: 1,
        pageSize: 10,
        count: 6,
        next: null,
        previous: null,
        total: 4,
        ...objectsResponseData({}),
      });
      spay.mockRestore();
    });

    describe('pagination', () => {
      it('should response the whole data by default', async () => {
        const spy = vi.spyOn(getPaginatedResponseUtils, 'getPaginatedResponse').mockImplementation(() =>
          Promise.resolve({
            page: 1,
            pageSize: 1,
            count: 2,
            total: 1,
            next: null,
            previous: null,
          }),
        );
        mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
        mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
        const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
        expect(response.status).toBe(200);
        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual({
          ...objectsResponseData({}),
          page: 1,
          pageSize: 1,
          count: 4,
          total: 2,
          next: null,
          previous: null,
        });
        spy.mockRestore();
      });

      it('should response the second page when page=2&pageSize=10', async () => {
        const spy = vi.spyOn(getPaginatedResponseUtils, 'getPaginatedResponse').mockImplementation(() =>
          Promise.resolve({
            page: 2,
            pageSize: 10,
            count: 1,
            total: 1,
            next: 'http://localhost:4001/api/v2/objects?page=2&pageSize=10',
            previous: null,
          }),
        );
        mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
        mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
        const response = await request(app)
          .get('/api/v2/objects?page=2&pageSize=10')
          .set('Authorization', 'Token YOUR_API_TOKEN');
        expect(response.status).toBe(200);
        expect(response.ok).toBe(true);
        expect(response.body).toStrictEqual({
          ...objectsResponseData({}),
          page: 2,
          pageSize: 10,
          count: 2,
          total: 2,
          next: 'http://localhost:4001/api/v2/objects?page=2&pageSize=10',
          previous: null,
        });
        spy.mockRestore();
      });
    });

    it('should return kennisartikel objects when type is kennisartikel', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      const response = await request(app)
        .get(`/api/v2/objects?type=${encodeURIComponent('http://localhost:4001/api/v2/objecttypes/kennisartikel')}`)
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'kennisartikel' }));
    });

    it('should return vac objects when type is vac', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get(`/api/v2/objects?type=${encodeURIComponent('http://localhost:4001/api/v2/objecttypes/vac')}`)
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'vac' }));
    });

    it('should include contact_information_internal in VAC antwoord', async () => {
      mockedFetchData.mockResolvedValueOnce(
        getStrapiVacData({
          contact_information_internal: [
            {
              contentBlock: [
                {
                  id: '1',
                  content:
                    'Voor het aanvragen van een paspoort kunt u contact opnemen met de gemeente via telefoonnummer 123-456789 or bezoek onze website voor meer informatie.',
                },
              ],
            },
          ],
        }),
      );
      const response = await request(app)
        .get(`/api/v2/objects?type=${encodeURIComponent('http://localhost:4001/api/v2/objecttypes/vac')}`)
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      const firstVac = response.body.results[0];
      expect(firstVac.record.data.antwoord).toContain('U moet een afspraak maken');
      expect(firstVac.record.data.antwoord).toContain('123-456789');
    });

    it('should return 400 when type is not an encoded URL', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects?type=http://localhost:4001/api/v2/objecttypes/vac')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });

    it('should return 400 when type is empty', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app).get('/api/v2/objects?type=').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });

    it('should return 400 when type is not a valid URL', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      const response = await request(app)
        .get('/api/v2/objects?type=invalid')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });

    it('should return 200 and empty array when no data is returned', async () => {
      const spy = vi.spyOn(getPaginatedResponseUtils, 'getPaginatedResponse').mockImplementation(() =>
        Promise.resolve({
          page: 1,
          pageSize: 10,
          count: 0,
          total: 0,
          next: null,
          previous: null,
        }),
      );
      mockedFetchData.mockResolvedValueOnce({
        data: { vacs: { meta: { pagination: { total: 0, page: 1, pageSize: 0, pageCount: 0 } }, data: [] } },
      });
      mockedFetchData.mockResolvedValueOnce({
        data: { kennisartikels: { meta: { pagination: { total: 0, page: 1, pageSize: 0, pageCount: 0 } }, data: [] } },
      });
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual({
        total: 0,
        count: 0,
        pageSize: 10,
        page: 1,
        next: null,
        previous: null,
        results: [],
      });
      spy.mockRestore();
    });

    it('should return 500 when fetch fails', async () => {
      mockedFetchData.mockRejectedValueOnce(() =>
        Promise.reject(new ErrorHandler('Fetch failed', { statusCode: 500 })),
      );
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
    });

    it('should return 500 when fetch fails with error message', async () => {
      mockedFetchData.mockRejectedValueOnce(new ErrorHandler('Fetch failed', { statusCode: 500 }));
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Fetch failed' });
    });

    it('should return 401 when authorization header is missing', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelData());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app).get('/api/v2/objects');
      expect(response.status).toBe(401);
      expect(response.text).toBe(
        JSON.stringify([{ path: '/api/v2/objects', message: "'Authorization' header required" }]),
      );
      expect(response.ok).toBe(false);
    });

    describe('validate fields with express-openapi-validator', () => {
      it('should log an error message when required fields are missing', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        const kennisartikelData = getStrapiKennisartikelData().data.products_connection.nodes.map((data) => ({
          ...data,
          title: null,
        }));

        const vacData = getStrapiVacData().data.vacs_connection?.nodes.map((data) => ({
          ...data,
          vac: { ...data.vac, vraag: null },
        }));
        mockedFetchData.mockResolvedValueOnce({
          data: {
            products_connection: {
              nodes: kennisartikelData,
              pageInfo: { total: 1, page: 1, pageSize: 1, pageCount: 1 },
            },
          },
        });
        mockedFetchData.mockResolvedValueOnce({
          data: {
            vacs_connection: {
              nodes: vacData,
              pageInfo: { total: 1, page: 1, pageSize: 1, pageCount: 1 },
            },
          },
        });
        await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
        const consoleSpyKennisartikelValue = consoleSpy.mock.calls[0][1].find(
          (item: any) => item.path === '/response/results/0/record/data/vertalingen/0/titel',
        );
        const consoleSpyVacValue = consoleSpy.mock.calls[0][1].find(
          (item: any) => item.path === '/response/results/0/record/data/vraag',
        );
        expect(consoleSpyKennisartikelValue).toEqual({
          path: '/response/results/0/record/data/vertalingen/0/titel',
          message: 'must be string',
          errorCode: 'type.openapi.validation',
        });
        expect(consoleSpyVacValue).toEqual({
          path: '/response/results/0/record/data/vraag',
          message: "must have required property 'vraag'",
          errorCode: 'required.openapi.validation',
        });
        consoleSpy.mockRestore();
      });
    });
  });

  describe('GET /api/objects/:id', () => {
    it('should return 200 and kennisartikel object when uuid is valid', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelDataByUUID());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });

    it('should return kennisartikel object with trefwoorden', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelDataByUUID());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      const kennisartikelResponse = response.body as ReturnType<typeof kennisartikelObject>;
      expect(kennisartikelResponse.record.data.vertalingen[0]).toStrictEqual(
        kennisartikelObject().record.data.vertalingen[0],
      );
    });

    it('should merge internal and kennisartikel trefwoorden', async () => {
      mockedFetchData.mockResolvedValueOnce({
        data: {
          products: [
            {
              id: '1',
              title: 'Demo Product',
              slug: 'demo-product',
              uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ce3',
              locale: 'nl',
              updatedAt: '2024-11-06T12:05:42.541Z',
              createdAt: '2024-11-05T16:03:50.975Z',
              metaTags: { keymatch: 'Demo, Page', title: 'Demo Page Title', description: 'Demo Page description' },
              sections: [
                {
                  component: 'ComponentComponentsInternalBlockContent',
                  internal_field: {
                    content: {
                      id: '1',
                      uuid: '241eb316-d348-4304-b303-9aa5ebf431b4',
                      keywords: 'Intern keyword 1, Intern keyword 2, Intern keyword 3',
                    },
                  },
                },
              ],
            },
          ],
        },
      });
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ce3')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      const responseKennisartikel = response.body as ReturnType<typeof kennisartikelObject>;
      const expectedTrefwoorden: Trefwoord[] = [
        { trefwoord: 'Demo' },
        { trefwoord: 'Page' },
        { trefwoord: 'Intern keyword 1' },
        { trefwoord: 'Intern keyword 2' },
        { trefwoord: 'Intern keyword 3' },
      ];
      expect(responseKennisartikel.record.data.vertalingen[0].trefwoorden).toStrictEqual(expectedTrefwoorden);
    });

    it('should deskMemo include contact_information_internal from internal block', async () => {
      mockedFetchData.mockResolvedValueOnce({
        data: {
          products: [
            {
              id: '1',
              title: 'Demo Product',
              slug: 'demo-product',
              uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ce4',
              locale: 'nl',
              updatedAt: '2024-11-06T12:05:42.541Z',
              createdAt: '2024-11-05T16:03:50.975Z',
              sections: [
                {
                  component: 'ComponentComponentsInternalBlockContent',
                  internal_field: {
                    content: { contentBlock: [{ id: '1', content: 'Contact info: 123-456789' }] },
                  },
                },
              ],
            },
          ],
        },
      });
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ce4')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      const responseKennisartikel = response.body as ReturnType<typeof kennisartikelObject>;
      expect(responseKennisartikel.record.data.vertalingen[0].deskMemo).toContain('Contact info: 123-456789');
    });

    it('should extract contact_information_public from sections and include in vertalingen', async () => {
      mockedFetchData.mockResolvedValueOnce({
        data: {
          products: [
            {
              id: '1',
              title: 'Demo Product',
              slug: 'demo-product',
              additional_information: null,
              price: null,
              metaTags: null,
              publicationState: 'PUBLISHED',
              kennisartikelMetadata: null,
              uuid: 'A555372B-EE1E-4432-8F90-51DAD214E1F4',
              locale: 'nl',
              updatedAt: '2024-11-06T12:05:42.541Z',
              createdAt: '2024-11-05T16:03:50.975Z',
              sections: [
                {
                  component: 'ComponentComponentsContactInformationPublic',
                  contact_information_public: {
                    contentBlock: [
                      { id: '1', content: '<p>Contact us at 123-456-7890</p>' },
                      { id: '2', content: '<p>Email: info@example.com</p>' },
                    ],
                  },
                } as ContactInformationPublic,
              ],
            },
          ],
        },
      });
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/A555372B-EE1E-4432-8F90-51DAD214E1F4')
        .set('Authorization', 'Token YOUR_API_TOKEN');

      expect(response.body?.record?.data?.vertalingen[0]?.contact).toContain('123-456-7890');
      expect(response.body?.record?.data?.vertalingen[0]?.contact).toContain('info@example.com');
    });

    it('should return the first contentBlock as inleiding category when provided', async () => {
      mockedFetchData.mockResolvedValueOnce({
        data: {
          products: [
            {
              id: '1',
              title: 'Demo Product',
              slug: 'demo-product',
              uuid: 'F555372B-EE1E-4432-8F90-51DAD214E1F3',
              content: '<h2>This is the first content block in the Product collection.</h2>',
              locale: 'nl',
              updatedAt: '2024-11-06T12:05:42.541Z',
              createdAt: '2024-11-05T16:03:50.975Z',
              sections: [
                {
                  id: '1',
                  content: '<h2>Inleiding  - 1</h2><p>Body text</p>',
                  categorie5: 'inleiding',
                  component: 'ComponentComponentsUtrechtRichText',
                } as UtrechtRichText2,
              ],
            },
          ],
        },
      });
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/F555372B-EE1E-4432-8F90-51DAD214E1F3')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      const responseKennisartikel = response.body as ReturnType<typeof kennisartikelObject>;
      expect(responseKennisartikel.record.data.vertalingen[0].tekst).toStrictEqual(
        '<h2>This is the first content block in the Product collection.</h2><h2>Inleiding  - 1</h2><p>Body text</p>',
      );
    });

    it('should return 200 and vac object when uuid is valid', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelDataByUUID());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacDataByUUID());
      const response = await request(app)
        .get('/api/v2/objects/22D89EB2-2238-4885-A352-07C02CF8FCDF')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(vacObject());
    });

    it('should return 200 and Kennisartikel object when uuid is valid', async () => {
      mockedFetchData.mockResolvedValueOnce(getStrapiKennisartikelDataByUUID());
      mockedFetchData.mockResolvedValueOnce(getStrapiVacData());
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });

    it('should return 404 when id is not found', async () => {
      mockedFetchData.mockResolvedValueOnce({ data: { products_connection: { nodes: [] } } });
      mockedFetchData.mockResolvedValueOnce({ data: { vacs_connection: { nodes: [] } } });
      const response = await request(app)
        .get('/api/v2/objects/not-exist-uuid')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
      expect(response.body).toStrictEqual({ message: 'Object not found' });
    });

    it('should return 500 when fetch fails with error message', async () => {
      mockedFetchData.mockImplementationOnce(() =>
        Promise.reject(new ErrorHandler('Fetch failed', { statusCode: 500 })),
      );
      const response = await request(app)
        .get('/api/v2/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: 'Fetch failed' });
    });
  });
});
