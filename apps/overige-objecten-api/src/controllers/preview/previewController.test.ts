import fetchMock from 'jest-fetch-mock';
import request from 'supertest';

import { pageRenderer } from '../../client/pageRenderer';
import app from '../../server';
import { getObjectByUUID } from '../../service/object';

jest.mock('../../service/object');
jest.mock('../../client/pageRenderer');
jest.mock('../../utils/getTheServerURL', () => ({
  getTheServerURL: () => 'http://localhost:3000',
}));

fetchMock.enableMocks();

describe('previewController', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    process.env.PREVIEW_SECRET_TOKEN = 'secret123';
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    (getObjectByUUID as jest.Mock).mockResolvedValue(vacObject);
    (pageRenderer as jest.Mock).mockReturnValue('<html>VAC PAGE</html>');

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

    (getObjectByUUID as jest.Mock).mockResolvedValue(kennisartikelObject);
    (pageRenderer as jest.Mock).mockReturnValue('<html>KA PAGE</html>');

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
    (getObjectByUUID as jest.Mock).mockRejectedValue(new Error('Object not found'));

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
    (getObjectByUUID as jest.Mock).mockRejectedValue(new Error('Boom'));

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
