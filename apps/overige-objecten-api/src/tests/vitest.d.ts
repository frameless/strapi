import type { FetchMock } from 'vitest-fetch-mock';

declare global {
  const fetchMock: FetchMock;
}
