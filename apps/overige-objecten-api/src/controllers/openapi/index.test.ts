import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';

import app from '../../server';
import * as docUtils from '../../utils/resolveDoc';

describe('openAPIController', () => {
  it('GET /api/v2/openapi.json return 200 and json', async () => {
    const response = await request(app).get('/api/v2/openapi.json');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
  it('GET /api/v2/openapi.yaml return 500 when an error occurs', async () => {
    const spy = vi.spyOn(docUtils, 'resolveDoc').mockImplementation(() => {
      throw new Error('Test error');
    });
    const response = await request(app).get('/api/v2/openapi.json');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An unexpected error occurred.' });
    expect(response.text).toEqual(JSON.stringify({ message: 'An unexpected error occurred.' }));
    spy.mockRestore();
  });
});
