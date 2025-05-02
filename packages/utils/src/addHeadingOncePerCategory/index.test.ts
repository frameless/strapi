import { addHeadingOncePerCategory, type ContentBlockArray } from './index';

describe('addHeadingOncePerCategory', () => {
  it('should add a heading and <hr> once per category', () => {
    const contentBlocks: ContentBlockArray = [
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
    const expectedResults: ContentBlockArray = [
      { id: '1', categorie10: 'category1', content: '<hr><h2>Test Title</h2>content1' },
      { id: '2', categorie10: 'category1', content: 'content2' },
      { id: '3', categorie10: 'category2', content: '<hr><h2>Test Title</h2>content3' },
      { id: '4', categorie10: 'category2', content: 'content4' },
    ];
    expect(result).toEqual(expectedResults);
  });
  it('should handle custom template with placeholders', () => {
    const contentBlocks: ContentBlockArray = [
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
    const template = '<div class="utrecht-additional-information"><hr/><h2>{title}</h2><hr/>{content}</div>';

    const result = addHeadingOncePerCategory({
      contentBlocks,
      title,
      categoryKey: 'categorie10',
      template,
    });

    const expectedResults: ContentBlockArray = [
      {
        id: '1',
        categorie10: 'category1',
        content: '<div class="utrecht-additional-information"><hr/><h2>Test Title</h2><hr/>content1</div>',
      },
      { id: '2', categorie10: 'category1', content: 'content2' },
      {
        id: '3',
        categorie10: 'category2',
        content: '<div class="utrecht-additional-information"><hr/><h2>Test Title</h2><hr/>content3</div>',
      },
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
    const contentBlocks: ContentBlockArray = [{ id: '1', categorie10: 'category1', content: 'content1' }];
    const title = 'Test Title';

    const result = addHeadingOncePerCategory({ contentBlocks, title, categoryKey: 'categorie10' });
    const expectedResults: ContentBlockArray = [
      { id: '1', categorie10: 'category1', content: '<hr><h2>Test Title</h2>content1' },
    ];
    expect(result).toEqual(expectedResults);
  });
  it('should handle categoryKey with kennisartikelCategorie value', () => {
    const contentBlocks: ContentBlockArray = [
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
    const expectedResults: ContentBlockArray = [
      { id: '1', kennisartikelCategorie: 'category1', content: '<hr><h2>Test Title</h2>content1' },
      { id: '2', kennisartikelCategorie: 'category1', content: 'content2' },
      { id: '3', kennisartikelCategorie: 'category2', content: '<hr><h2>Test Title</h2>content3' },
      { id: '4', kennisartikelCategorie: 'category2', content: 'content4' },
    ];
    expect(result).toEqual(expectedResults);
  });
});
