import { addHeadingOncePerCategory, type ContentBlock } from './index';

describe('addHeadingOncePerCategory', () => {
  it('should add a heading and <hr> once per category', () => {
    const contentBlocks: ContentBlock = [
      {
        categorie10: 'category1',
        content: 'content1',
        id: '1',
      },
      {
        categorie10: 'category1',
        content: 'content2',
        id: '2',
      },
      {
        categorie10: 'category2',
        content: 'content3',
        id: '3',
      },
      {
        categorie10: 'category2',
        content: 'content4',
        id: '4',
      },
    ];
    const title = 'Test Title';

    const result = addHeadingOncePerCategory({ contentBlocks, title, categoryKey: 'categorie10' });
    const expectedResults: ContentBlock = [
      { id: '1', categorie10: 'category1', content: '<hr><h2>Test Title</h2>content1' },
      { id: '2', categorie10: 'category1', content: 'content2' },
      { id: '3', categorie10: 'category2', content: '<hr><h2>Test Title</h2>content3' },
      { id: '4', categorie10: 'category2', content: 'content4' },
    ];
    expect(result).toEqual(expectedResults);
  });

  it('should handle an empty contentBlocks array', () => {
    const contentBlocks: any[] = [];
    const title = 'Test Title';

    const result = addHeadingOncePerCategory({ contentBlocks, title, categoryKey: 'categorie10' });

    expect(result).toEqual([]);
  });

  it('should handle a contentBlocks array with a single item', () => {
    const contentBlocks: ContentBlock = [{ id: '1', categorie10: 'category1', content: 'content1' }];
    const title = 'Test Title';

    const result = addHeadingOncePerCategory({ contentBlocks, title, categoryKey: 'categorie10' });
    const expectedResults: ContentBlock = [
      { id: '1', categorie10: 'category1', content: '<hr><h2>Test Title</h2>content1' },
    ];
    expect(result).toEqual(expectedResults);
  });
  it('should handle categoryKey with kennisartikelCategorie value', () => {
    const contentBlocks: ContentBlock = [
      {
        kennisartikelCategorie: 'category1',
        content: 'content1',
        id: '1',
      },
      {
        kennisartikelCategorie: 'category1',
        content: 'content2',
        id: '2',
      },
      {
        kennisartikelCategorie: 'category2',
        content: 'content3',
        id: '3',
      },
      {
        kennisartikelCategorie: 'category2',
        content: 'content4',
        id: '4',
      },
    ];
    const title = 'Test Title';

    const result = addHeadingOncePerCategory({ contentBlocks, title, categoryKey: 'kennisartikelCategorie' });
    const expectedResults: ContentBlock = [
      { id: '1', kennisartikelCategorie: 'category1', content: '<hr><h2>Test Title</h2>content1' },
      { id: '2', kennisartikelCategorie: 'category1', content: 'content2' },
      { id: '3', kennisartikelCategorie: 'category2', content: '<hr><h2>Test Title</h2>content3' },
      { id: '4', kennisartikelCategorie: 'category2', content: 'content4' },
    ];
    expect(result).toEqual(expectedResults);
  });
});
