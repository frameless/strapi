import kebabCase from 'lodash.kebabcase';
import { concatenateFieldValues } from './concatenateFieldValues';
import type { Antwoord, DataVacItem, Doelgroep, VacRecordData, VACSData } from '../strapi-product-type';
interface createVacRecordReturnTypes {
  index: number;
  startAt: string;
  typeVersion: number;
  data: VacRecordData;
  geometry: null;
  endAt: null;
  registrationAt: string;
}
interface GetVacDataProps {
  data: VACSData;
  vacSchemaURL: string;
  serverURL: string;
}
interface MapVacItemProps extends Pick<GetVacDataProps, 'serverURL' | 'vacSchemaURL'> {
  item: DataVacItem;
}

const getAntwoord = (antwoord: Antwoord[]): string => (Array.isArray(antwoord) ? concatenateFieldValues(antwoord) : '');

const createVacRecord = (item: DataVacItem, vacUrl: string, antwoord: string): createVacRecordReturnTypes => ({
  index: parseInt(item.id, 10),
  startAt: item.attributes.createdAt,
  typeVersion: 1,
  data: {
    uuid: item.attributes.vac.uuid,
    vraag: item.attributes?.title,
    antwoord,
    status: item?.attributes?.vac?.status,
    doelgroep: kebabCase(item?.attributes?.vac?.doelgroep ?? undefined) as Doelgroep,
    afdelingen: item?.attributes?.vac?.afdelingen,
    toelichting: item?.attributes?.vac?.toelichting,
    trefwoorden: item?.attributes?.vac?.trefwoorden,
    url: vacUrl,
  },
  geometry: null,
  endAt: null,
  registrationAt: item.attributes.createdAt,
});

const mapVacItem = ({ item, serverURL, vacSchemaURL }: MapVacItemProps) => {
  const vacUrl = new URL(`/api/v2/objects/${item.attributes.vac.uuid}`, serverURL).href;
  const antwoord = getAntwoord(item.attributes.vac.antwoord);
  return {
    uuid: item.attributes.vac.uuid,
    type: vacSchemaURL,
    url: vacUrl,
    record: createVacRecord(item, vacUrl, antwoord),
  };
};

export const getVacData = ({ data, vacSchemaURL, serverURL }: GetVacDataProps) => {
  if (!data?.vacs?.data?.length) return [];
  return data.vacs.data.map((item) => mapVacItem({ item, serverURL, vacSchemaURL }));
};
