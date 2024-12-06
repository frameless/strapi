export interface CreateInternalField {
  data: {
    createInternalField: {
      data: {
        id: string;
        attributes: InternalFieldAttributes;
      };
    };
  };
}
export interface InternalFieldQuery {
  internalFields: {
    data: {
      id: string;
      attributes: InternalFieldAttributes;
    }[];
  };
}
export interface CreateProductData {
  data: {
    id: string;
    attributes: Attributes;
  };
}
export interface CreateProduct {
  createProduct: CreateProductData;
}
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
  createdAt: string;
  updatedAt: string;
  vac: VacItem;
}

export interface DataVacItem {
  attributes: AttributesVacItem;
  id: string;
}

export interface RootObjectVacItem {
  data: DataVacItem[];
}

export interface VACSData {
  vacs: RootObjectVacItem;
  meta: Meta;
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
  kennisartikel: Kennisartikel;
  vac: RootObjectVacItem;
}
export interface InternalField {
  data: InternalFieldData;
}

export interface InternalFieldData {
  id: string;
  attributes: InternalFieldAttributes;
}
export interface InternalFieldAttributes {
  title: string;
  content: InternalFieldAttributesContent;
}
export interface InternalFieldAttributesContent {
  id: string;
  uuid: string;
  contentBlock: InternalFieldAttributesContentContentBlock[];
}
export interface InternalFieldAttributesContentContentBlock {
  content: string;
  kennisartikelCategorie: string;
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
  afdelingNaam: string;
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
  internal_field: InternalField;
}
