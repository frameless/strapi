import { components } from '../types/openapi';

export type ReturnedGetVerantwoordelijkeOrganisatieValue =
  components['schemas']['kennisartikel']['verantwoordelijkeOrganisatie'];
export interface GetVerantwoordelijkeOrganisatieProps {
  metadata: Omit<components['schemas']['kennisartikel']['verantwoordelijkeOrganisatie'], 'url'>;
  url: string;
}

export const getVerantwoordelijkeOrganisatie = ({
  metadata,
  url,
}: GetVerantwoordelijkeOrganisatieProps): ReturnedGetVerantwoordelijkeOrganisatieValue => ({
  url: `${new URL('api/v2/objecttypes/kennisartikel', url).href}#verantwoordelijkeOrganisatie`,
  owmsIdentifier: metadata?.owmsIdentifier,
  owmsPrefLabel: metadata?.owmsPrefLabel,
  owmsEndDate: metadata?.owmsEndDate,
});
