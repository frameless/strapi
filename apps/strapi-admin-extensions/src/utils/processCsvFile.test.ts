import fs from 'node:fs';

import { describe, it, expect, beforeEach, vi } from 'vitest';

import { processCsvFile, Vac } from './processCsvFile'; // Adjust path as needed

vi.mock('node:fs');
vi.mock('uuid', () => ({ v4: vi.fn(() => 'mock-uuid') }));

describe('processCsvFile', () => {
  const filePath = 'test.csv';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve with sanitized results when CSV has required columns', async () => {
    const mockData = [
      { vraag: 'Question 1', antwoord: '<p style="color: red">Answer 1</p>' },
      { vraag: 'Question 2', antwoord: '<p style="color: red">Answer 2</p>' },
    ];

    const mockStream = {
      on: vi.fn((event, handler) => {
        if (event === 'headers') handler(['vraag', 'antwoord']);
        if (event === 'data') mockData.forEach(handler);
        if (event === 'end') handler();
        return mockStream;
      }),
      pipe: vi.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as any).mockReturnValue(mockStream);

    const result = await processCsvFile(filePath, ['vraag', 'antwoord']);
    const expectedResults: Vac[] = [
      {
        vac: {
          vraag: 'Question 1',
          antwoord: {
            content: '<p>Answer 1</p>',
          },
          doelgroep: 'eu-burger',
          uuid: 'mock-uuid',
        },
      },
      {
        vac: {
          vraag: 'Question 2',
          antwoord: {
            content: '<p>Answer 2</p>',
          },
          doelgroep: 'eu-burger',
          uuid: 'mock-uuid',
        },
      },
    ];
    expect(result).toEqual(expectedResults);
    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
  });

  it('should reject when required columns are missing', async () => {
    const mockStream = {
      on: vi.fn((event, handler) => {
        if (event === 'error') handler(new Error('Parsing error'));
        return mockStream;
      }),
      pipe: vi.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as any).mockReturnValue(mockStream);

    await expect(processCsvFile(filePath, ['vraag', 'antwoord'])).rejects.toEqual({
      error: 'Failed to parse CSV',
      details: 'Parsing error',
    });
  });

  it('should reject with validation failure if no required columns', async () => {
    const mockStream = {
      on: vi.fn((event, handler) => {
        if (event === 'headers') handler([]);
        if (event === 'end') handler();
        return mockStream;
      }),
      pipe: vi.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as any).mockReturnValue(mockStream);

    await expect(processCsvFile(filePath, ['vraag', 'antwoord'])).rejects.toEqual({
      error: 'Missing required columns',
      missingColumns: ['vraag', 'antwoord'],
    });
  });
});
