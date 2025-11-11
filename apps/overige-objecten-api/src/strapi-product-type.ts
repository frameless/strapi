export type Status = 'actief' | 'non-actief' | 'te-verwijderen';
export type Doelgroep = 'eu-burger' | 'eu-bedrijf' | 'eu-burger-bedrijf';
export type Afdeling = {
  afdelingId?: string;
  afdelingNaam: string;
};
export type Trefwoorden = {
  trefwoord: string;
};
export type VacRecordData = {
  uuid: string;
  vraag?: string;
  antwoord: string;
  status?: Status;
  doelgroep?: Doelgroep;
  afdelingen?: Afdeling[];
  toelichting?: string;
  trefwoorden?: Trefwoorden[];
  gerelateerdeVACs?: { VAC?: string }[];
  gerelateerdeProducten: { product?: string }[];
  url: string;
};
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
export interface Antwoord {
  content: string;
  kennisartikelCategorie?: string;
}
export interface VacItem {
  uuid: string;
  vraag?: string;
  antwoord: Antwoord[];
  status?: Status;
  doelgroep?: Doelgroep;
  afdelingen?: Afdeling[];
  toelichting?: string;
  keywords?: string;
}
export interface RelatedVACs {
  data: {
    attributes: {
      vac: VacItem;
    };
  }[];
}
export interface RelatedProducts {
  data: {
    attributes: {
      uuid: string;
    };
  }[];
}
export interface ContactInformation {
  data: {
    attributes: {
      contentBlock: {
        id: string;
        content: string;
      }[];
    };
  };
}
export interface AttributesVacItem {
  createdAt: string;
  updatedAt: string;
  vac: VacItem;
  title?: string;
  relatedVACs?: RelatedVACs;
  relatedProducts?: RelatedProducts;
  contact_information_internal: ContactInformation;
  contact_information_public: ContactInformation;
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
  meta?: Meta;
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
  data: ProductData[];
  meta: Meta;
}

export interface ProductData {
  id: string;
  attributes: Attributes;
}
export interface Price {
  currency: string;
  label: string;
  value: string;
  uuid: string;
}

interface PriceAttributes {
  price: Price[];
}
export interface PriceData {
  data: PriceDataAttributes;
}
export interface PriceDataAttributes {
  attributes: PriceAttributes;
}
export interface Attributes {
  content?: string;
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
  price: PriceData;
  additional_information: AdditionalInformationField;
}
export interface InternalField {
  data: InternalFieldData;
}
export interface AdditionalInformationFieldData {
  id: string;
  attributes: AdditionalInformationFieldAttributes;
}
export interface AdditionalInformationFieldAttributes {
  title: string;
  content: AdditionalInformationFieldAttributesContent;
}
export interface AdditionalInformationFieldAttributesContent {
  id: string;
  uuid: string;
  contentBlock: AdditionalInformationFieldAttributesContentContentBlock[];
}
export interface AdditionalInformationFieldAttributesContentContentBlock {
  content: string;
  categorie10: string;
  id: string;
  component?: string;
}
export interface AdditionalInformationField {
  data: AdditionalInformationFieldData;
}

export interface InternalFieldData {
  id: string;
  attributes: InternalFieldAttributes;
}
export interface InternalFieldAttributes {
  title: string;
  content: InternalFieldAttributesContent;
  contact_information_internal?: ContactInformation;
  contact_information_public?: ContactInformation;
}
export interface InternalFieldAttributesContent {
  id: string;
  uuid: string;
  contentBlock: InternalFieldAttributesContentContentBlock[];
  keywords?: string;
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
  contact_information_public?: ContactInformation;
  [key: string]: any;
}

export type CreateVacResponse = {
  data: {
    createVac: {
      data: DataVacItem;
    };
  };
};
