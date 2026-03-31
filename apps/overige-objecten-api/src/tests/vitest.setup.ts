import { TextEncoder, TextDecoder } from 'util';

import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
vi.stubGlobal('fetch', fetchMock);
vi.stubGlobal('fetchMock', fetchMock);
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.TextEncoder = TextEncoder as typeof global.TextEncoder;

process.env.STRAPI_PRIVATE_URL = process.env.STRAPI_PRIVATE_URL || 'https://localhost:1337';
process.env.STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'test-token';
process.env.PREVIEW_SECRET_TOKEN = process.env.PREVIEW_SECRET_TOKEN || '54E00590-62B6-4AC0-86CB-7B8B41309D0F';
process.env.OVERIGE_OBJECTEN_API_PORT = process.env.OVERIGE_OBJECTEN_API_PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
