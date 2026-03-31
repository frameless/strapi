import request from 'supertest';
import { describe, it, expect, vi, beforeAll, afterEach, type Mock } from 'vitest';

import { pageRenderer } from '../../client/pageRenderer';
import app from '../../server';
import { getObjectByUUID } from '../../service/object';

vi.mock('../../service/object');
vi.mock('../../client/pageRenderer');
vi.mock('../../utils/getTheServerURL', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));

describe('previewController', () => {
  beforeAll(() => {
    vi.resetAllMocks();
    process.env.PREVIEW_SECRET_TOKEN = 'secret123';
    process.env.Strapi_API_TOKEN = 'token';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 when required query params are missing', async () => {
    const response = await request(app).get('/api/v2/preview');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing query parameters');
  });

  it('should return 401 when secret is invalid', async () => {
    const response = await request(app).get('/api/v2/preview').query({
      slug: 'vac',
      secret: 'wrong',
      status: 'DRAFT',
      apiToken: 'token',
    });

    expect(response.status).toBe(401);
    expect(response.text).toBe('Unauthorized');
  });

  it('should render VAC preview page', async () => {
    const vacObject = {
      publicationState: 'DRAFT',
      record: {
        data: {
          vraag: 'What is this?',
          antwoord: 'This is a test',
        },
      },
    };

    (getObjectByUUID as Mock).mockResolvedValue(vacObject);
    (pageRenderer as Mock).mockReturnValue('<html>VAC PAGE</html>');

    const response = await request(app).get('/api/v2/preview').query({
      slug: 'vac',
      secret: 'secret123',
      status: 'DRAFT',
      apiToken: 'token',
      uuid: 'uuid-1',
    });

    expect(response.status).toBe(200);
    expect(response.text).toContain('VAC PAGE');
    expect(pageRenderer).toHaveBeenCalledWith({
      vacData: vacObject,
      status: 'DRAFT',
    });
  });

  it('should render kennisartikel preview page', async () => {
    const kennisartikelObject = {
      publicationState: 'PUBLISHED',
      record: {
        data: {
          vertalingen: [{ titel: 'Test artikel' }],
        },
      },
    };

    (getObjectByUUID as Mock).mockResolvedValue(kennisartikelObject);
    (pageRenderer as Mock).mockReturnValue('<html>KA PAGE</html>');

    const response = await request(app).get('/api/v2/preview').query({
      slug: 'kennisartikelen',
      secret: 'secret123',
      status: 'PUBLISHED',
      apiToken: 'token',
      uuid: 'uuid-2',
    });

    expect(response.status).toBe(200);
    expect(response.text).toContain('KA PAGE');
    expect(pageRenderer).toHaveBeenCalledWith({
      kennisartikelData: kennisartikelObject,
      status: 'PUBLISHED',
    });
  });

  it('should return 404 page when object is not found', async () => {
    (getObjectByUUID as Mock).mockRejectedValue(new Error('Object not found'));

    const response = await request(app).get('/api/v2/preview').query({
      slug: 'vac',
      secret: 'secret123',
      status: 'DRAFT',
      apiToken: 'token',
      uuid: 'missing',
    });

    expect(response.status).toBe(404);

    expect(response.text).toContain('404 – Object niet gevonden');
    expect(response.text).toContain('Het object dat je probeert te previewen bestaat niet.');

    expect(response.text).toContain(
      'window.__ERROR_PAGE_DATA__ = {"message":"Het object dat je probeert te previewen bestaat niet.","title":"404 – Object niet gevonden"}',
    );
  });

  it('should return 500 when an unexpected error occurs', async () => {
    (getObjectByUUID as Mock).mockRejectedValue(new Error('Boom'));

    const response = await request(app).get('/api/v2/preview').query({
      slug: 'vac',
      secret: 'secret123',
      status: 'DRAFT',
      apiToken: 'token',
      uuid: 'uuid',
    });

    expect(response.status).toBe(500);
    expect(response.text).toContain('500 – Interne serverfout');
  });
});
