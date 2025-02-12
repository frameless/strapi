import { normalizeCategories } from './normalizeCategories';

describe('normalizeCategories', () => {
  it('should normalize categories correctly', () => {
    const input = [
      {
        id: '1',
        categorie1: 'inleiding',
        content: '<p>Inleiding Content</p>',
      },
      {
        id: '2',
        categorie2: 'aanvraag',
        content: '<p>Aanvraag content</p>',
      },
    ];

    const expectedOutput = [
      {
        id: '1',
        categorie: 'inleiding',
        content: '<p>Inleiding Content</p>',
      },
      {
        id: '2',
        categorie: 'aanvraag',
        content: '<p>Aanvraag content</p>',
      },
    ];

    const output = normalizeCategories(input);
    expect(output).toEqual(expectedOutput);
  });
  it('should handle empty input', () => {
    const input: any[] = [];
    const expectedOutput: any[] = [];
    const output = normalizeCategories(input);
    expect(output).toEqual(expectedOutput);
  });
  it('should handle input with no categories', () => {
    const input = [
      {
        id: '1',
        content: '<p>Inleiding Content</p>',
      },
      {
        id: '2',
        content: '<p>Aanvraag content</p>',
      },
    ];

    const expectedOutput = [
      {
        id: '1',
        content: '<p>Inleiding Content</p>',
      },
      {
        id: '2',
        content: '<p>Aanvraag content</p>',
      },
    ];

    const output = normalizeCategories(input);
    expect(output).toEqual(expectedOutput);
  });
});
