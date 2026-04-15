import kebabCase from 'lodash.kebabcase';

import type { GetAllVacItemsQuery } from '../../gql/graphql';
import { components } from '../types/openapi';

import { concatenateFieldValues } from './concatenateFieldValues';
import { generateKeywords } from './generateKeywords';
import { uuidToIndex } from './uuidToIndex';

type GetKennisartikelReturnData = components['schemas']['vacObject'];

export interface createVacRecordReturnTypes {
  index: number;
  startAt: string;
  typeVersion: number;
  data: GetKennisartikelReturnData & { uuid: string };
  geometry: null;
  endAt: null;
  registrationAt: string;
}

export type VacNode = NonNullable<NonNullable<GetAllVacItemsQuery['vacs_connection']>['nodes'][number]>;
export interface VACData {
  vacs_connection?: GetAllVacItemsQuery['vacs_connection'] | null;
}
interface GetVacDataProps {
  data: VACData;
  vacSchemaURL: string;
  serverURL: string;
  publicationState?: 'DRAFT' | 'PUBLISHED';
}

interface MapVacItemProps extends Pick<GetVacDataProps, 'serverURL' | 'vacSchemaURL'> {
  item: VacNode;
  publicationState?: 'DRAFT' | 'PUBLISHED';
}

const getAntwoord = (antwoord: { content?: string | null }[]): string =>
  Array.isArray(antwoord) ? concatenateFieldValues(antwoord.map((a) => ({ content: a.content ?? '' }))) : '';

const createVacRecord = (item: VacNode, vacUrl: string, antwoord: string): createVacRecordReturnTypes => ({
  index: uuidToIndex(item.id ?? item?.vac?.uuid),
  startAt: item.createdAt,
  typeVersion: 1,
  data: {
    uuid: item.vac?.uuid ?? item.id,
    vraag: item.title ?? undefined,
    antwoord,
    status: (item.vac?.status?.replace('_', '-') as GetKennisartikelReturnData['status']) ?? undefined,
    doelgroep: item.vac?.doelgroep
      ? (kebabCase(item.vac?.doelgroep) as GetKennisartikelReturnData['doelgroep'])
      : undefined,
    afdelingen: item.vac?.afdelingen
      ?.filter(Boolean)
      .map((a) => ({ afdelingId: a!.afdelingId, afdelingNaam: a!.afdelingNaam })),
    toelichting: item.vac?.toelichting ?? '',
    trefwoorden: generateKeywords(item.vac?.keywords ?? ''),
    url: vacUrl,
    gerelateerdeVACs:
      item.relatedVACs?.map((vac) => ({
        VAC: new URL(`/api/v2/objects/${vac?.vac?.uuid}`, vacUrl).href,
      })) ?? [],
    gerelateerdeProducten:
      item.relatedProducts?.map((product) => ({
        product: new URL(`/api/v2/objects/${product?.uuid}`, vacUrl).href,
        productNaam: product?.title ?? '',
      })) ?? [],
  },
  geometry: null,
  endAt: null,
  registrationAt: item.createdAt,
});

const mapVacItem = ({ item, serverURL, vacSchemaURL, publicationState }: MapVacItemProps) => {
  const vacUrl = new URL(`/api/v2/objects/${item.vac?.uuid}`, serverURL).href;

  const mergedContactInformationInternal = item.contact_information_internal?.flatMap((ci) => ci?.contentBlock ?? []);

  const antwoord = getAntwoord([
    ...(item.vac?.antwoord?.filter(Boolean) ?? []),
    ...(item.contact_information_public?.contentBlock?.filter(Boolean) ?? []),
    ...(mergedContactInformationInternal?.filter(Boolean) ?? []),
  ] as { content?: string | null }[]);

  return {
    uuid: item.vac?.uuid,
    type: vacSchemaURL,
    url: vacUrl,
    record: createVacRecord(item, vacUrl, antwoord),
    publicationState,
  };
};

export const getVacData = ({ data, vacSchemaURL, serverURL, publicationState }: GetVacDataProps) => {
  const nodes = data?.vacs_connection?.nodes;
  if (!nodes?.length) return [];
  return nodes.map((item) => mapVacItem({ item: item as VacNode, serverURL, vacSchemaURL, publicationState }));
};
