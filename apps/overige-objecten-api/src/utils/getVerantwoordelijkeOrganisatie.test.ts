import { getVerantwoordelijkeOrganisatie } from './getVerantwoordelijkeOrganisatie';
import type {
  GetVerantwoordelijkeOrganisatieProps,
  ReturnedGetVerantwoordelijkeOrganisatieValue,
} from './getVerantwoordelijkeOrganisatie';
describe('getVerantwoordelijkeOrganisatie', () => {
  it('should return the correct object', () => {
    const metadata: GetVerantwoordelijkeOrganisatieProps['metadata'] = {
      owmsIdentifier: 'owmsIdentifier',
      owmsPrefLabel: 'owmsPrefLabel',
      owmsEndDate: 'owmsEndDate',
    };
    const url = 'https://example.com';

    const result = getVerantwoordelijkeOrganisatie({ metadata, url });
    const expectedResults: ReturnedGetVerantwoordelijkeOrganisatieValue = {
      url: 'https://example.com/api/v2/objecttypes/kennisartikel#verantwoordelijkeOrganisatie',
      owmsIdentifier: 'owmsIdentifier',
      owmsPrefLabel: 'owmsPrefLabel',
      owmsEndDate: 'owmsEndDate',
    };
    expect(result).toEqual(expectedResults);
  });
});
