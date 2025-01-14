import fs from 'node:fs';
import { processCsvFile, Vac } from './processCsvFile'; // Adjust path as needed

jest.mock('node:fs');
jest.mock('csv-parser', () =>
  jest.fn(() => ({
    on: jest.fn().mockReturnThis(),
    pipe: jest.fn().mockReturnThis(),
  })),
);
jest.mock('uuid', () => ({ v4: jest.fn(() => 'mock-uuid') }));

describe('processCsvFile', () => {
  const filePath = 'test.csv';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with sanitized results when CSV has required columns', async () => {
    const mockData = [
      { vraag: 'Question 1', antwoord: '<p style="color: red">Answer 1</p>' },
      { vraag: 'Question 2', antwoord: '<p style="color: red">Answer 2</p>' },
    ];

    const mockStream = {
      on: jest.fn((event, handler) => {
        if (event === 'headers') handler(['vraag', 'antwoord']);
        if (event === 'data') mockData.forEach(handler);
        if (event === 'end') handler();
        return mockStream;
      }),
      pipe: jest.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    const result = await processCsvFile(filePath, ['vraag', 'antwoord']);
    const expectedResults: Vac[] = [
      {
        vac: {
          vraag: 'Question 1',
          antwoord: {
            content: '<p>Answer 1</p>',
          },
          doelgroep: null,
          uuid: 'mock-uuid',
        },
      },
      {
        vac: {
          vraag: 'Question 2',
          antwoord: {
            content: '<p>Answer 2</p>',
          },
          doelgroep: null,
          uuid: 'mock-uuid',
        },
      },
    ];
    expect(result).toEqual(expectedResults);
    expect(fs.createReadStream).toHaveBeenCalledWith(filePath);
  });

  it('should reject when required columns are missing', async () => {
    const mockStream = {
      on: jest.fn((event, handler) => {
        if (event === 'headers') handler(['vraag']); // Missing 'antwoord'
        if (event === 'end') handler();
        return mockStream;
      }),
      pipe: jest.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    await expect(processCsvFile(filePath, ['vraag', 'antwoord'])).rejects.toEqual({
      error: 'Missing required columns',
      missingColumns: ['antwoord'],
    });
  });

  it('should reject on CSV parsing error', async () => {
    const mockStream = {
      on: jest.fn((event, handler) => {
        if (event === 'error') handler(new Error('Parsing error'));
        return mockStream;
      }),
      pipe: jest.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    await expect(processCsvFile(filePath, ['vraag', 'antwoord'])).rejects.toEqual({
      error: 'Failed to parse CSV',
      details: 'Parsing error',
    });
  });

  it('should reject with validation failure if no required columns', async () => {
    const mockStream = {
      on: jest.fn((event, handler) => {
        if (event === 'headers') handler([]);
        if (event === 'end') handler();
        return mockStream;
      }),
      pipe: jest.fn().mockReturnThis(),
    } as any;

    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    await expect(processCsvFile(filePath, ['vraag', 'antwoord'])).rejects.toEqual({
      error: 'Missing required columns',
      missingColumns: ['vraag', 'antwoord'],
    });
  });
});
