import { getVertalingen } from './getVertalingen';

describe('getVertalingen', () => {
  it('should return an array with a single object containing the expected properties', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
      priceData: [
        {
          uuid: '01C87F1D-2F84-4768-98D9-90BA10263B1D',
          currency: 'EUR',
          label: 'label',
          value: 10,
          id: '1',
        },
      ],
      locale: 'nl',
      title: 'title',
      updatedAt: 'updatedAt',
      trefwoorden: [{ trefwoord: 'trefwoord' }],
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: [{ trefwoord: 'trefwoord' }],
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
    expect(result[0].deskMemo).toContain('<p>deskMemo</p>');
  });

  it('should handle missing optional properties', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
      locale: 'nl',
      title: 'title',
      updatedAt: 'updatedAt',
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
  });

  it('should handle empty bothContentBlock', () => {
    const result = getVertalingen({
      bothContentBlock: {},
      deskMemo: 'deskMemo',
      locale: 'nl',
      title: 'title',
      updatedAt: 'updatedAt',
    });
    expect(result).toEqual([
      {
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: 'nl',
        titel: 'title',
        datumWijziging: 'updatedAt',
      },
    ]);
  });

  it('should handle missing attributes', () => {
    const result = getVertalingen({
      bothContentBlock: { content: 'content' },
      deskMemo: 'deskMemo',
    });
    expect(result).toEqual([
      {
        content: 'content',
        deskMemo: '<p>deskMemo</p>',
        trefwoorden: undefined,
        taal: 'nl',
        titel: undefined,
        datumWijziging: '',
      },
    ]);
  });
});
