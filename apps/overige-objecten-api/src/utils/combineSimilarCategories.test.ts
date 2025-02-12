import { combineSimilarCategories, CombineSimilarCategoriesProps } from './combineSimilarCategories';

describe('combineSimilarCategories', () => {
  it('should combine similar categories', () => {
    const data: CombineSimilarCategoriesProps[] = [
      { tekst: '<h2>Inleiding - external - 1</h2><p>Inhoud </p>' },
      { procedureBeschrijving: '<h2>Aanvraag - external - 1</h2>' },
      {
        tekst: '<h2>Aanvullende informatie</h2><h2>Inleiding / aanvullende informatie - 1</h2><p>Inhoud</p>',
      },
    ];

    const result = combineSimilarCategories(data);
    expect(result).toEqual({
      tekst:
        '<h2>Inleiding - external - 1</h2><p>Inhoud </p><h2>Aanvullende informatie</h2><h2>Inleiding / aanvullende informatie - 1</h2><p>Inhoud</p>',
      procedureBeschrijving: '<h2>Aanvraag - external - 1</h2>',
    });
  });
});
