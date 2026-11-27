import { mapSubcategorieen } from './mapSubcategorieen';

describe('mapSubcategorieen', () => {
  it('should map Strapi subcategories with their category to the API format', () => {
    const result = mapSubcategorieen([
      {
        documentId: 'sub-1',
        title: 'Test-2',
        createdAt: '2026-10-01T10:00:00.000Z',
        updatedAt: '2026-10-02T10:00:00.000Z',
        publishedAt: '2026-10-02T10:00:00.000Z',
        pdc_category: {
          documentId: 'cat-1',
          title: 'Datahoofdcategorie Demo -1',
          createdAt: '2026-09-01T10:00:00.000Z',
          updatedAt: '2026-09-02T10:00:00.000Z',
          publishedAt: '2026-09-02T10:00:00.000Z',
        },
      },
    ]);
    expect(result).toEqual([
      {
        documentId: 'sub-1',
        titel: 'Test-2',
        createdAt: '2026-10-01T10:00:00.000Z',
        updatedAt: '2026-10-02T10:00:00.000Z',
        publishedAt: '2026-10-02T10:00:00.000Z',
        categorie: {
          documentId: 'cat-1',
          titel: 'Datahoofdcategorie Demo -1',
          createdAt: '2026-09-01T10:00:00.000Z',
          updatedAt: '2026-09-02T10:00:00.000Z',
          publishedAt: '2026-09-02T10:00:00.000Z',
        },
      },
    ]);
  });

  it('should set categorie to null when the subcategory has no category', () => {
    const [result] = mapSubcategorieen([{ documentId: 'sub-1', title: 'Test-2', pdc_category: null }]);
    expect(result.categorie).toBeNull();
  });

  it('should return an empty array when there are no subcategories', () => {
    expect(mapSubcategorieen(undefined)).toEqual([]);
    expect(mapSubcategorieen(null)).toEqual([]);
    expect(mapSubcategorieen([null])).toEqual([]);
  });
});
