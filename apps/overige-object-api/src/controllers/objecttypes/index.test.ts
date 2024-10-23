import fetchMock from 'jest-fetch-mock';
import request from 'supertest';
import kennisartikelObjectTypes from '../../docs/kennisartikel.json';
import vacObjectTypes from '../../docs/vac.json';
import app from '../../server';

jest.mock('../../utils/getTheServerURL.ts', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));
fetchMock.enableMocks();
describe('objecttypesController', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('GET /api/v1/objecttypes/:type should return 200 and kennisartikel.json', async () => {
    const response = await request(app).get('/api/v1/objecttypes/kennisartikel');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(kennisartikelObjectTypes);
  });
  it('GET /api/v1/objecttypes/:type should return 200 and VAC.json', async () => {
    const response = await request(app).get('/api/v1/objecttypes/vac');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(vacObjectTypes);
  });
  it('GET /api/v1/objecttypes/:type should return 400 when type is invalid', async () => {
    const response = await request(app).get('/api/v1/objecttypes/invalid-type');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid type parameter' });
  });
  it('GET /api/v1/objecttypes/:type should return 404 when type is not found', async () => {
    const response = await request(app).get('/api/v1/objecttypes');
    expect(response.status).toBe(404);
  });
  it('GET /api/v1/objecttypes/:type should return 500 when an error occurs', async () => {
    const spy = jest.spyOn(require('../../utils/readFile'), 'readFile').mockImplementation(() => 'invalid-path');
    const response = await request(app).get('/api/v1/objecttypes/kennisartikel');
    expect(response.status).toBe(500);
    spy.mockRestore();
  });

  it('GET /api/v1/objecttypes/:type should return 500 when kennisartikel.json is not found', async () => {
    const spy = jest.spyOn(require('../../utils/readFile'), 'readFile').mockImplementation(() => false);
    const response = await request(app).get('/api/v1/objecttypes/kennisartikel');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An unexpected error occurred.' });
    spy.mockRestore();
  });
  it('GET /api/v1/objecttypes/:type should return 500 when VAC.json is not found', async () => {
    const spy = jest.spyOn(require('../../utils/readFile'), 'readFile').mockImplementation(() => false);
    const response = await request(app).get('/api/v1/objecttypes/vac');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An unexpected error occurred.' });
    spy.mockRestore();
  });
});
