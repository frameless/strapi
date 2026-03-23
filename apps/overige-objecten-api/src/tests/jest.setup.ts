import { TextEncoder, TextDecoder } from 'util';

import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
