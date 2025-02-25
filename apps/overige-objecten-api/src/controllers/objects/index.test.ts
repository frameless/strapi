import fetchMock from 'jest-fetch-mock';
import request from 'supertest';
import {
  getStrapiKennisartikelData,
  getStrapiVacData,
  kennisartikelObject,
  objectsResponseData,
  vacObject,
} from '../../__mocks__';
import app from '../../server';
import type { Trefwoord } from '../openapi/types';

jest.mock('../../utils/getTheServerURL.ts', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));

jest.mock('../../utils/getPaginatedResponse.ts');

fetchMock.enableMocks();
describe('Objects controller', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/objects', () => {
    it('should return kennisartikel & VAC by default', async () => {
      const spy = jest
        .spyOn(require('../../utils/getPaginatedResponse'), 'getPaginatedResponse')
        .mockImplementation(() =>
          Promise.resolve({
            page: 1,
            pageSize: 10,
            count: 3,
            total: 2,
            next: null,
            previous: null,
          }),
        );
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
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
      spy.mockRestore();
    });
    describe('pagination', () => {
      it('should response the whole data by default', async () => {
        const spy = jest
          .spyOn(require('../../utils/getPaginatedResponse'), 'getPaginatedResponse')
          .mockImplementation(() =>
            Promise.resolve({
              page: 1,
              pageSize: 1,
              count: 2,
              total: 1,
              next: null,
              previous: null,
            }),
          );
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
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
        const spy = jest
          .spyOn(require('../../utils/getPaginatedResponse'), 'getPaginatedResponse')
          .mockImplementation(() =>
            Promise.resolve({
              page: 2,
              pageSize: 10,
              count: 1,
              total: 1,
              next: 'http://localhost:4001/api/v2/objects?page=2&pageSize=10',
              previous: null,
            }),
          );
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
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
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get(`/api/v2/objects?type=${encodeURIComponent('http://localhost:4001/api/v2/objecttypes/kennisartikel')}`)
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'kennisartikel' }));
    });
    it('should return vac objects when type is vac', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get(`/api/v2/objects?type=${encodeURIComponent('http://localhost:4001/api/v2/objecttypes/vac')}`)
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'vac' }));
    });
    it('should return 400 when type is not an encoded URL', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get('/api/v2/objects?type=http://localhost:4001/api/v2/objecttypes/vac')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 400 when type is empty', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app).get('/api/v2/objects?type=').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 400 when type is not a valid URL', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v2/objects?type=invalid')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 200 and empty array when no data is returned', async () => {
      const spy = jest
        .spyOn(require('../../utils/getPaginatedResponse'), 'getPaginatedResponse')
        .mockImplementation(() =>
          Promise.resolve({
            page: 1,
            pageSize: 10,
            count: 0,
            total: 0,
            next: null,
            previous: null,
          }),
        );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: {
            vacs: {
              meta: {
                pagination: {
                  total: 0,
                  page: 1,
                  pageSize: 0,
                  pageCount: 0,
                },
              },
              data: [],
            },
          },
        }),
      );
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: {
            kennisartikels: {
              meta: {
                pagination: {
                  total: 0,
                  page: 1,
                  pageSize: 0,
                  pageCount: 0,
                },
              },
              data: [],
            },
          },
        }),
      );
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
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
    it('should return 401 when authorization header is missing', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([{}]));

      const response = await request(app).get('/api/v2/objects');
      expect(response.status).toBe(401);
      expect(response.text).toBe(
        JSON.stringify([{ path: '/api/v2/objects', message: "'Authorization' header required" }]),
      );
      expect(response.ok).toBe(false);
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
    describe('validate fields with express-openapi-validator', () => {
      it('should log an error message when of the required fields are missing', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const kennisartikelData = getStrapiKennisartikelData().data.products.data.map((data) => {
          return {
            ...data,
            attributes: {
              ...data.attributes,
              title: null,
            },
          };
        });
        const vacData = getStrapiVacData().data.vacs.data.map((data) => {
          return {
            ...data,
            attributes: {
              ...data.attributes,
              vac: { ...data.attributes.vac, vraag: null },
            },
          };
        });
        const vacResponse = { data: { vacs: { data: vacData } } };
        fetchMock.mockResponseOnce(
          JSON.stringify({
            data: {
              products: {
                data: kennisartikelData,
                meta: {
                  pagination: {
                    total: 1,
                    page: 1,
                    pageSize: 1,
                    pageCount: 1,
                  },
                },
              },
            },
          }),
        );
        fetchMock.mockResponseOnce(JSON.stringify(vacResponse));
        await request(app).get('/api/v2/objects').set('Authorization', 'Token YOUR_API_TOKEN');
        const consoleSpyKennisartikelValue = consoleSpy.mock.calls[0][1].find(
          (item: any) => item.path === '/response/results/0/record/data/vertalingen/0/titel',
        );
        const consoleSpayVacValue = consoleSpy.mock.calls[0][1].find(
          (item: any) => item.path === '/response/results/0/record/data/vraag',
        );

        expect(consoleSpyKennisartikelValue).toEqual({
          path: '/response/results/0/record/data/vertalingen/0/titel',
          message: 'must be string',
          errorCode: 'type.openapi.validation',
        });
        expect(consoleSpayVacValue).toEqual({
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
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });
    it('should return kennisartikel object with trefwoorden', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      const kennisartikelResponse = response.body as ReturnType<typeof kennisartikelObject>;
      expect(kennisartikelResponse.record.data.vertalingen[0]).toStrictEqual(
        kennisartikelObject().record.data.vertalingen[0],
      );
    });
    it('should merge internal and kennisartikel trefwoorden', async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: {
            products: {
              meta: {
                pagination: {
                  total: 1,
                  page: 1,
                  pageSize: 1,
                  pageCount: 1,
                },
              },
              data: [
                {
                  id: '1',
                  attributes: {
                    title: 'Demo Product',
                    slug: 'demo-product',
                    uuid: 'b77a89a0-3ec2-467d-84b2-b484d5726ce3',
                    locale: 'nl',
                    updatedAt: '2024-11-06T12:05:42.541Z',
                    createdAt: '2024-11-05T16:03:50.975Z',
                    metaTags: {
                      keymatch: 'Demo, Page',
                      title: 'Demo Page Title',
                      description: 'Demo Page description',
                    },
                    sections: [
                      {
                        component: 'ComponentComponentsInternalBlockContent',
                        internal_field: {
                          data: {
                            attributes: {
                              content: {
                                id: '1',
                                uuid: '241eb316-d348-4304-b303-9aa5ebf431b4',
                                keywords: 'Intern keyword 1, Intern keyword 2, Intern keyword 3',
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        }),
      );
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
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
    it('should return 200 and vac object when uuid is valid', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get('/api/v2/objects/22D89EB2-2238-4885-A352-07C02CF8FCDF')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(vacObject());
    });
    it('should return 200 and Kennisartikel object when uuid is valid', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiVacData()));
      const response = await request(app)
        .get('/api/v2/objects/b77a89a0-3ec2-467d-84b2-b484d5726ceb')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });
    it('should return 404 when id is not found', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: { products: { data: [] } } }));
      fetchMock.mockResponseOnce(JSON.stringify({ data: { vacs: { data: [] } } }));
      const response = await request(app)
        .get('/api/v2/objects/not-exist-uuid')
        .set('Authorization', 'Token YOUR_API_TOKEN');

      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
      expect(response.body).toStrictEqual({ message: 'Object not found' });
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app)
        .get('/api/v2/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Token YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
  });
});
