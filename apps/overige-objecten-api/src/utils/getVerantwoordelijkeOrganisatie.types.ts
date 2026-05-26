import type { components } from '../types/openapi';

export type ReturnedGetVerantwoordelijkeOrganisatieValue = Omit<
  components['schemas']['kennisartikel']['verantwoordelijkeOrganisatie'],
  'owmsEndDate'
> & { owmsEndDate: string | null };

export interface GetVerantwoordelijkeOrganisatieProps {
  metadata: Omit<components['schemas']['kennisartikel']['verantwoordelijkeOrganisatie'], 'url' | 'owmsEndDate'> & {
    owmsEndDate?: string | null;
  };
  url: string;
}
