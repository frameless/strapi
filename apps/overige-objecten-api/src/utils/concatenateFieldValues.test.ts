import { concatenateFieldValues, ConcatenateFieldValuesDataTypes } from './concatenateFieldValues';

describe('concatenateFieldValues', () => {
  it('should return a concatenated string', () => {
    const data = [
      {
        content: '<h2>Inleiding Kop 1</h2><p>Inleiding inhoud 1</p>',
        kennisartikelCategorie: 'inleiding',
      },
      {
        content: '<h2>Inleiding Kop 2</h2><p>Inleiding inhoud 2</p>',
        kennisartikelCategorie: 'inleiding',
      },
    ];
    const result = concatenateFieldValues(data);
    expect(result).toEqual(
      '<h2>Inleiding Kop 1</h2><p>Inleiding inhoud 1</p><h2>Inleiding Kop 2</h2><p>Inleiding inhoud 2</p>',
    );
  });
  it('should return an empty string', () => {
    const data: ConcatenateFieldValuesDataTypes[] = [];
    const result = concatenateFieldValues(data);
    expect(result).toEqual('');
  });
});
