import request from 'supertest';
import { OpenAPI } from './types';
import app from '../../server';

describe('openAPIController', () => {
  it('GET /api/v2/openapi.json return 200 and json', async () => {
    const response = await request(app).get('/api/v2/openapi.json');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
  it('GET /api/v2/openapi.yaml return 500 when an error occurs', async () => {
    const spy = jest.spyOn(require('../../utils/readFile'), 'readFile').mockImplementation(() => undefined);
    const response = await request(app).get('/api/v2/openapi.json');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An unexpected error occurred.' });
    expect(response.text).toEqual(JSON.stringify({ message: 'An unexpected error occurred.' }));
    spy.mockRestore();
  });
});
