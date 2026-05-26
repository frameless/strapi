export type {
  ReturnedGetVerantwoordelijkeOrganisatieValue,
  GetVerantwoordelijkeOrganisatieProps,
} from './getVerantwoordelijkeOrganisatie.types';
import type {
  GetVerantwoordelijkeOrganisatieProps,
  ReturnedGetVerantwoordelijkeOrganisatieValue,
} from './getVerantwoordelijkeOrganisatie.types';

export const getVerantwoordelijkeOrganisatie = ({
  metadata,
  url,
}: GetVerantwoordelijkeOrganisatieProps): ReturnedGetVerantwoordelijkeOrganisatieValue => ({
  url: `${new URL('api/v2/objecttypes/kennisartikel', url).href}#verantwoordelijkeOrganisatie`,
  owmsIdentifier: metadata?.owmsIdentifier,
  owmsPrefLabel: metadata?.owmsPrefLabel,
  owmsEndDate: metadata?.owmsEndDate || null,
});
