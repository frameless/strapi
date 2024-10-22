import fetchMock from 'jest-fetch-mock';
import request from 'supertest';
import { getStrapiKennisartikelData, kennisartikelObject, objectsResponseData, vacObject } from '../../__mocks__';
import app from '../../server';

jest.mock('../../utils/getTheServerURL.ts', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));

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
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');

      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({}));
    });
    it('should return kennisartikel objects when type is kennisartikel', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get(`/api/v1/objects?type=${encodeURIComponent('http://localhost:4001/api/v1/objecttypes/kennisartikel')}`)
        .set('Authorization', 'Bearer YOUR_API_TOKEN');

      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'kennisartikel' }));
    });
    it('should return kennisartikel objects when type is vac', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get(`/api/v1/objects?type=${encodeURIComponent('http://localhost:4001/api/v1/objecttypes/vac')}`)
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(objectsResponseData({ type: 'vac' }));
    });
    it('should return 400 when type is not an encoded URL', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects?type=http://localhost:4001/api/v1/objecttypes/vac')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 400 when type is empty', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app).get('/api/v1/objects?type=').set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 400 when type is not a valid URL', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects?type=invalid')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(400);
      expect(response.ok).toBe(false);
    });
    it('should return 200 and empty array when no data is returned', async () => {
      const spy = jest.spyOn(require('../../utils/vacData.ts'), 'vacData').mockImplementation(() => []);
      fetchMock.mockResponseOnce(JSON.stringify([{}]));
      const response = await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');

      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual({ results: [] });
      spy.mockRestore();
    });
    it('should return 500 when fetch fails', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
    it('should return 401 when authorization header is missing', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([{}]));

      const response = await request(app).get('/api/v1/objects');
      expect(response.status).toBe(401);
      expect(response.text).toBe(
        JSON.stringify([{ path: '/api/v1/objects', message: 'Authorization header required' }]),
      );
      expect(response.ok).toBe(false);
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
    describe('validate kennisartikel fields with express-openapi-validator', () => {
      it('should return 500 and error message when of the required fields are missing', async () => {
        const data = getStrapiKennisartikelData().data.products.data.map((data) => {
          return {
            ...data,
            attributes: {
              ...data.attributes,
              title: null,
            },
          };
        });
        fetchMock.mockResponseOnce(JSON.stringify({ data: { products: { data } } }));
        const consoleSpy = jest.spyOn(console, 'log');
        await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
        expect(consoleSpy).toHaveBeenCalledWith('Response body fails validation: ', [
          { errorCode: 'type.openapi.validation', message: 'must be array', path: '/response' },
          { errorCode: 'type.openapi.validation', message: 'must be array', path: '/response' },
          { errorCode: 'type.openapi.validation', message: 'must be array', path: '/response' },
          {
            errorCode: 'type.openapi.validation',
            message: 'must be string',
            path: '/response/results/0/vertalingen/0/titel',
          },
          {
            errorCode: 'required.openapi.validation',
            message: "must have required property 'vraag'",
            path: '/response/results/0/vraag',
          },
          {
            errorCode: 'oneOf.openapi.validation',
            message: 'must match exactly one schema in oneOf',
            path: '/response/results/0',
          },
          {
            errorCode: 'oneOf.openapi.validation',
            message: 'must match exactly one schema in oneOf',
            path: '/response',
          },
        ]);
        consoleSpy.mockRestore();
      });
    });
    describe('validate VAC fields with express-openapi-validator', () => {
      it('should return 500 and error message when of the required fields are missing', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
        const spy = jest.spyOn(require('../../utils/vacData.ts'), 'vacData').mockImplementation(() => [
          {
            url: 'http://localhost:4001/api/v1/objecttypes/vac',
            uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
            vraag: 'Wat is het proces om een paspoort aan te vragen?',
            antwoord:
              'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
            doelgroep: 'eu-burger',
          },
        ]);
        await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
        expect(consoleSpy).toHaveBeenCalledWith('Response body fails validation: ', [
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          {
            path: '/response/results/1/upnUri',
            message: "must have required property 'upnUri'",
            errorCode: 'required.openapi.validation',
          },
          {
            path: '/response/results/1/status',
            message: "must have required property 'status'",
            errorCode: 'required.openapi.validation',
          },
          {
            path: '/response/results/1',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
          {
            path: '/response',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
        ]);
        spy.mockRestore();
        consoleSpy.mockRestore();
      });
    });
  });
  describe('GET /api/objects/:id', () => {
    it('should return 200 and kennisartikel object when uuid is valid', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });
    it('should return 200 and vac object when uuid is valid', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(vacObject());
    });
    it('should return 200 and Kennisartikel object when uuid is valid', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toStrictEqual(kennisartikelObject());
    });
    it('should return 404 when id is not found', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
      const response = await request(app)
        .get('/api/v1/objects/not-exist-uuid')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
      expect(response.body).toStrictEqual({ message: 'Object not found' });
    });
    it('should return 500 when fetch fails with error message', async () => {
      fetchMock.mockRejectOnce(new Error('Fetch failed'));
      const response = await request(app)
        .get('/api/v1/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
      expect(response.text).toBe(JSON.stringify({ message: 'Fetch failed' }));
    });
    it('should return 404 when no data is returned', async () => {
      fetchMock.mockResponseOnce(JSON.stringify([]));
      const response = await request(app)
        .get('/api/v1/objects/a9058a3e-6dd9-480c-a074-e38026bd4ffd')
        .set('Authorization', 'Bearer YOUR_API_TOKEN');

      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
      expect(response.body).toStrictEqual({ message: 'Object not found' });
    });
    describe('validate kennisartikel fields with express-openapi-validator', () => {
      it('should return 500 and error message when of the required fields are missing', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const data = getStrapiKennisartikelData().data.products.data.map((data) => {
          return {
            ...data,
            attributes: {
              ...data.attributes,
              title: null,
            },
          };
        });
        fetchMock.mockResponseOnce(JSON.stringify({ data: { products: { data } } }));
        await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');
        expect(consoleSpy).toHaveBeenCalledWith('Response body fails validation: ', [
          {
            path: '/response',
            message: 'must be array',
            errorCode: 'type.openapi.validation',
          },
          {
            path: '/response',
            message: 'must be array',
            errorCode: 'type.openapi.validation',
          },
          {
            path: '/response',
            message: 'must be array',
            errorCode: 'type.openapi.validation',
          },
          {
            path: '/response/results/0/vertalingen/0/titel',
            message: 'must be string',
            errorCode: 'type.openapi.validation',
          },
          {
            path: '/response/results/0/vraag',
            message: "must have required property 'vraag'",
            errorCode: 'required.openapi.validation',
          },
          {
            path: '/response/results/0',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
          {
            path: '/response',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
        ]);
        consoleSpy.mockRestore();
      });
    });
    describe('validate VAC fields with express-openapi-validator', () => {
      it('should return 500 and error message when of the required fields are missing', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        fetchMock.mockResponseOnce(JSON.stringify(getStrapiKennisartikelData()));
        const spy = jest.spyOn(require('../../utils/vacData.ts'), 'vacData').mockImplementation(() => [
          {
            url: 'http://localhost:4001/api/v1/objecttypes/vac',
            uuid: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
            vraag: 'Wat is het proces om een paspoort aan te vragen?',
            antwoord:
              'U moet een afspraak maken bij de gemeente, uw identiteitsbewijs meenemen en een recente pasfoto aanleveren.',
            doelgroep: 'eu-burger',
          },
        ]);
        await request(app).get('/api/v1/objects').set('Authorization', 'Bearer YOUR_API_TOKEN');

        expect(consoleSpy).toHaveBeenCalledWith('Response body fails validation: ', [
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          { path: '/response', message: 'must be array', errorCode: 'type.openapi.validation' },
          {
            path: '/response/results/1/upnUri',
            message: "must have required property 'upnUri'",
            errorCode: 'required.openapi.validation',
          },
          {
            path: '/response/results/1/status',
            message: "must have required property 'status'",
            errorCode: 'required.openapi.validation',
          },
          {
            path: '/response/results/1',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
          {
            path: '/response',
            message: 'must match exactly one schema in oneOf',
            errorCode: 'oneOf.openapi.validation',
          },
        ]);
        consoleSpy.mockRestore();
        spy.mockRestore();
      });
    });
  });
});
