/* ---------- shared base ---------- */

export interface BaseObject<TData> {
  uuid: string;
  url: string;
  publicationState?: 'DRAFT' | 'PUBLISHED';
  type: string;
  record: {
    index: number;
    startAt: string;
    typeVersion: number;
    data: TData;
    geometry: unknown | null;
    endAt: string | null;
    registrationAt: string;
  };
}

/* ---------- VAC ---------- */

export interface VACData {
  uuid: string;
  vraag: string;
  antwoord: string;
  status: string | null;
  doelgroep: string;
  afdelingen: unknown[];
  toelichting: string;
  trefwoorden: unknown[];
  url: string;
  gerelateerdeVACs: unknown[];
  gerelateerdeProducten: unknown[];
}

export interface VACObject extends BaseObject<VACData> {
  type: `${string}/api/v2/objecttypes/vac`;
}

/* ---------- Kennisartikel ---------- */

export interface KennisartikelTranslation {
  taal: string;
  titel: string;
  datumWijziging: string;
  trefwoorden: { trefwoord: string }[];
  tekst?: string;
  procedureBeschrijving?: string;
  kostenEnBetaalmethoden?: string;
  contact?: string;
  bewijs?: string;
  vereisten?: string;
  bezwaarEnBeroep?: string;
  wtdBijGeenReactie?: string;
  notice?: string;
  uitersteTermijn?: string;
  deskMemo?: string;
}

export interface KennisartikelData {
  uuid: string;
  url: string;
  publicatieDatum: string;
  beschikbareTalen: string[];
  vertalingen: KennisartikelTranslation[];
}

export interface KennisartikelObject extends BaseObject<KennisartikelData> {
  type: `${string}/api/v2/objecttypes/kennisartikel`;
}

/* ---------- union ---------- */

export type ObjectByUUID = VACObject | KennisartikelObject;

/* ---------- type guards ---------- */

export const isVAC = (obj: ObjectByUUID): obj is VACObject => obj.type.includes('/vac');

export const isKennisartikel = (obj: ObjectByUUID): obj is KennisartikelObject => obj.type.includes('/kennisartikel');

export interface ErrorPageData {
  title?: string;
  message?: string;
}
