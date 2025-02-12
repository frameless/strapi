import { mapContentByCategory } from './mapContentByCategory';

describe('mapContentByCategory', () => {
  it('should map content based on category', () => {
    const category = 'bewijs';
    const content = 'This is a test content';
    const result = mapContentByCategory(category, content);
    expect(result).toEqual({ bewijs: 'This is a test content' });
  });

  it('should return an empty object if category or content is not provided', () => {
    const category = 'bewijs';
    const result = mapContentByCategory(category);
    expect(result).toEqual({});
  });
  it('should return an empty object if category or content is null', () => {
    const category = 'bewijs';
    const content = null;
    const result = mapContentByCategory(category, content);
    expect(result).toEqual({});
  });
});
