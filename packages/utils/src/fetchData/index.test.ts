/* eslint-disable no-undef */
import { fetchData } from './index';

const url = 'https://api.example.com/graphql';
const query = `
query {
  users {
    id
    name
  }
}
`;

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { users: [] } }),
        ok: true,
        status: 200,
        statusText: 'OK',
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;

    const data = await fetchData({ url, query });
    expect(data).toEqual({ data: { users: [] } });
    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  });
  it('should have POST method by default', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { users: [] } }),
        ok: true,
        status: 200,
        statusText: 'OK',
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    const data = await fetchData({ url, query });
    expect(data).toEqual({ data: { users: [] } });
    expect(mockFetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  });
  it('should handle GET method', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { users: [] } }),
        ok: true,
        status: 200,
        statusText: 'OK',
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    const data = await fetchData({ url: 'https://example.com/api/users', method: 'GET' });
    expect(data).toEqual({ data: { users: [] } });
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/api/users', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  it('should handle cache', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { users: [] } }),
        ok: true,
        status: 200,
        statusText: 'OK',
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;

    const data = await fetchData({ url, query });
    expect(data).toEqual({ data: { users: [] } });
    expect(mockFetch).toHaveBeenCalledWith(url, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  });
  it('should handle network error', async () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error('Network error')));
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Network error');
  });
  it('should handle error', async () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error('Fetch failed')));
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow();
  });
  it('should handle error with status code', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;

    expect(fetchData({ url, query })).rejects.toThrow('Resource Not Found');
  });
  it('should handle error with status code 400', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Bad Request');
  });
  it('should handle error with status code 401', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Unauthorized');
  });
  it('should handle error with status code 403', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ errors: [{ message: 'Forbidden' }] }),
        ok: false,
        status: 403,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Forbidden');
  });
  it('should handle error with status code 404', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Resource Not Found');
  });
  it('should handle error with status code 422', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Unprocessable Entity');
  });
  it('should handle error with status code 500', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Internal Server Error');
  });
  it('should handle error with status code 503', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 503,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Service Unavailable');
  });
  it('should handle error with status code 504', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 504,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Gateway Timeout');
  });
  it('should handle error with status code 505', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 505,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('HTTP Version Not Supported');
  });

  it('should handle error with status code 506', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 506,
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('Unexpected error: 506');
  });

  it('should handle GraphQL error', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ errors: [{ message: 'GraphQL error' }] }),
        ok: true,
        status: 200,
        statusText: 'OK',
      }),
    ) as jest.Mock;
    global.fetch = mockFetch;
    expect(fetchData({ url, query })).rejects.toThrow('GraphQL error');
  });
});