export interface VacItem {
  uuid: string;
  vraag: string | null;
  antwoord: string | null;
  status: string | null;
  doelgroep: string | null;
  afdelingen: string[];
  toelichting: string | null;
  trefwoorden: string[];
}

export interface AttributesVacItem {
  vac: VacItem;
}

export interface DataVacItem {
  attributes: AttributesVacItem;
}

export interface RootObjectVacItem {
  data: DataVacItem[];
}

export interface VACSData {
  vacs: RootObjectVacItem;
}
export interface StrapiProductType {
  data: Data;
}
export interface Meta {
  pagination: Pagination;
}
export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}
export interface Data {
  products: Products;
}

export interface Products {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  slug: string;
  uuid: string;
  locale: 'nl' | 'en';
  updatedAt: string;
  createdAt: string;
  metaTags: MetaTags;
  sections: Section[];
  kennisartikelMetadata: KennisartikelMetadata;
  internalContentBlock?: {
    content: string;
    kennisartikelCategorie: string;
  }[];
  kennisartikel: Kennisartikel;
  vac: RootObjectVacItem;
}
export interface Kennisartikel {
  data: {
    attributes: {
      internalSections: Section[];
    };
  };
}
export interface KennisartikelMetadata {
  uuid: string;
  doelgroep: 'eu-burger' | 'eu-bedrijf';
  productAanwezig: boolean;
  productValtOnder: null;
  afdelingen: Afdelingen[];
  verantwoordelijkeOrganisatie: VerantwoordelijkeOrganisatie;
  upnUri: string;
}

export interface Afdelingen {
  afdelingId: string;
  afdelingnaam: string;
}

export interface VerantwoordelijkeOrganisatie {
  owmsIdentifier: string;
  owmsPrefLabel: string;
  owmsEndDate: string;
}

export interface MetaTags {
  keymatch: string;
  title: string;
  description: string;
}

export interface Section {
  id?: string;
  content?: string;
  kennisartikelCategorie?: null | string;
  component?: string;
}
