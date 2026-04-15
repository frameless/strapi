/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  PdcHomePageComponentsDynamicZoneInput: { input: any; output: any; }
  PdcTemplateSectionsDynamicZoneInput: { input: any; output: any; }
  ProductSectionsDynamicZoneInput: { input: any; output: any; }
};

export type AdditionalInformation = {
  content?: Maybe<ComponentComponentsAdditionalInformationField>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  product?: Maybe<Product>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdditionalInformationEntityResponseCollection = {
  nodes: Array<AdditionalInformation>;
  pageInfo: Pagination;
};

export type AdditionalInformationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AdditionalInformationFiltersInput>>>;
  content?: InputMaybe<ComponentComponentsAdditionalInformationFieldFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AdditionalInformationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AdditionalInformationFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AdditionalInformationInput = {
  content?: InputMaybe<ComponentComponentsAdditionalInformationFieldInput>;
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentComponentsAdditionalInformation = {
  additional_information?: Maybe<AdditionalInformation>;
  id: Scalars['ID']['output'];
};

export type ComponentComponentsAdditionalInformationField = {
  contentBlock?: Maybe<Array<Maybe<ComponentComponentsUtrechtRichText>>>;
  id: Scalars['ID']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsAdditionalInformationFieldContentBlockArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsAdditionalInformationFieldFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsAdditionalInformationFieldFiltersInput>>>;
  contentBlock?: InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>;
  not?: InputMaybe<ComponentComponentsAdditionalInformationFieldFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsAdditionalInformationFieldFiltersInput>>>;
  uuid?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsAdditionalInformationFieldInput = {
  contentBlock?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtRichTextInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsAfdelingen = {
  afdelingId: Scalars['String']['output'];
  afdelingNaam: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ComponentComponentsAfdelingenFiltersInput = {
  afdelingId?: InputMaybe<StringFilterInput>;
  afdelingNaam?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsAfdelingenFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsAfdelingenFiltersInput>>>;
};

export type ComponentComponentsAfdelingenInput = {
  afdelingId?: InputMaybe<Scalars['String']['input']>;
  afdelingNaam?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ComponentComponentsAntwoord = {
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsantwoord_Kennisartikelcategorie>;
  label?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsAntwoordFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsAntwoordFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  kennisartikelCategorie?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsAntwoordFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsAntwoordFiltersInput>>>;
};

export type ComponentComponentsAntwoordInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  kennisartikelCategorie?: InputMaybe<Enum_Componentcomponentsantwoord_Kennisartikelcategorie>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsAudience = {
  id: Scalars['ID']['output'];
  type: Enum_Componentcomponentsaudience_Type;
};

export type ComponentComponentsAudienceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsAudienceFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsAudienceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsAudienceFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsAudienceInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Enum_Componentcomponentsaudience_Type>;
};

export type ComponentComponentsCatalogiMeta = {
  abstract: Scalars['String']['output'];
  audience: Array<Maybe<ComponentComponentsAudience>>;
  authority: ComponentComponentsSpatial;
  id: Scalars['ID']['output'];
  onlineRequest: ComponentComponentsOnlineRequest;
  spatial: ComponentComponentsSpatial;
};


export type ComponentComponentsCatalogiMetaAudienceArgs = {
  filters?: InputMaybe<ComponentComponentsAudienceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsCatalogiMetaFiltersInput = {
  abstract?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsCatalogiMetaFiltersInput>>>;
  audience?: InputMaybe<ComponentComponentsAudienceFiltersInput>;
  authority?: InputMaybe<ComponentComponentsSpatialFiltersInput>;
  not?: InputMaybe<ComponentComponentsCatalogiMetaFiltersInput>;
  onlineRequest?: InputMaybe<ComponentComponentsOnlineRequestFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsCatalogiMetaFiltersInput>>>;
  spatial?: InputMaybe<ComponentComponentsSpatialFiltersInput>;
};

export type ComponentComponentsCatalogiMetaInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  audience?: InputMaybe<Array<InputMaybe<ComponentComponentsAudienceInput>>>;
  authority?: InputMaybe<ComponentComponentsSpatialInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  onlineRequest?: InputMaybe<ComponentComponentsOnlineRequestInput>;
  spatial?: InputMaybe<ComponentComponentsSpatialInput>;
};

export type ComponentComponentsCimPdcProductAspectBeschrijving = {
  id: Scalars['ID']['output'];
  onderwerp?: Maybe<Scalars['String']['output']>;
  uitleg: Scalars['String']['output'];
};

export type ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput>;
  onderwerp?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput>>>;
  uitleg?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsCimPdcProductAspectBeschrijvingInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  onderwerp?: InputMaybe<Scalars['String']['input']>;
  uitleg?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsCimPdcProductBeschrijving = {
  cimPdcProductAspectBeschrijving?: Maybe<Array<Maybe<ComponentComponentsCimPdcProductAspectBeschrijving>>>;
  id: Scalars['ID']['output'];
  omschrijving?: Maybe<Scalars['String']['output']>;
  productNaam?: Maybe<Scalars['String']['output']>;
  taal: Scalars['String']['output'];
  trefwoord?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsCimPdcProductBeschrijvingCimPdcProductAspectBeschrijvingArgs = {
  filters?: InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsCimPdcProductBeschrijvingFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductBeschrijvingFiltersInput>>>;
  cimPdcProductAspectBeschrijving?: InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingFiltersInput>;
  not?: InputMaybe<ComponentComponentsCimPdcProductBeschrijvingFiltersInput>;
  omschrijving?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductBeschrijvingFiltersInput>>>;
  productNaam?: InputMaybe<StringFilterInput>;
  taal?: InputMaybe<StringFilterInput>;
  trefwoord?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsCimPdcProductBeschrijvingInput = {
  cimPdcProductAspectBeschrijving?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductAspectBeschrijvingInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  omschrijving?: InputMaybe<Scalars['String']['input']>;
  productNaam?: InputMaybe<Scalars['String']['input']>;
  taal?: InputMaybe<Scalars['String']['input']>;
  trefwoord?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsCimPdcProductMetadata = {
  afnemer?: Maybe<Scalars['String']['output']>;
  beoogdResultaat?: Maybe<Scalars['String']['output']>;
  bestelwijze?: Maybe<Enum_Componentcomponentscimpdcproductmetadata_Bestelwijze>;
  cimPdcProductBeschrijving?: Maybe<Array<Maybe<ComponentComponentsCimPdcProductBeschrijving>>>;
  doelgroep?: Maybe<Enum_Componentcomponentscimpdcproductmetadata_Doelgroep>;
  eigenaar?: Maybe<Scalars['String']['output']>;
  grondslag?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  productCode?: Maybe<Scalars['String']['output']>;
  servicetermijn?: Maybe<Scalars['String']['output']>;
  soortBevoegdGezag?: Maybe<Enum_Componentcomponentscimpdcproductmetadata_Soortbevoegdgezag>;
  soortTaak?: Maybe<Scalars['String']['output']>;
  uitvoeringsorganisatie?: Maybe<Scalars['String']['output']>;
  uplProductNaam?: Maybe<Scalars['String']['output']>;
  wettelijkeTermijn?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsCimPdcProductMetadataCimPdcProductBeschrijvingArgs = {
  filters?: InputMaybe<ComponentComponentsCimPdcProductBeschrijvingFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsCimPdcProductMetadataFiltersInput = {
  afnemer?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductMetadataFiltersInput>>>;
  beoogdResultaat?: InputMaybe<StringFilterInput>;
  bestelwijze?: InputMaybe<StringFilterInput>;
  cimPdcProductBeschrijving?: InputMaybe<ComponentComponentsCimPdcProductBeschrijvingFiltersInput>;
  doelgroep?: InputMaybe<StringFilterInput>;
  eigenaar?: InputMaybe<StringFilterInput>;
  grondslag?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsCimPdcProductMetadataFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductMetadataFiltersInput>>>;
  productCode?: InputMaybe<StringFilterInput>;
  servicetermijn?: InputMaybe<StringFilterInput>;
  soortBevoegdGezag?: InputMaybe<StringFilterInput>;
  soortTaak?: InputMaybe<StringFilterInput>;
  uitvoeringsorganisatie?: InputMaybe<StringFilterInput>;
  uplProductNaam?: InputMaybe<StringFilterInput>;
  wettelijkeTermijn?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsCimPdcProductMetadataInput = {
  afnemer?: InputMaybe<Scalars['String']['input']>;
  beoogdResultaat?: InputMaybe<Scalars['String']['input']>;
  bestelwijze?: InputMaybe<Enum_Componentcomponentscimpdcproductmetadata_Bestelwijze>;
  cimPdcProductBeschrijving?: InputMaybe<Array<InputMaybe<ComponentComponentsCimPdcProductBeschrijvingInput>>>;
  doelgroep?: InputMaybe<Enum_Componentcomponentscimpdcproductmetadata_Doelgroep>;
  eigenaar?: InputMaybe<Scalars['String']['input']>;
  grondslag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  productCode?: InputMaybe<Scalars['String']['input']>;
  servicetermijn?: InputMaybe<Scalars['String']['input']>;
  soortBevoegdGezag?: InputMaybe<Enum_Componentcomponentscimpdcproductmetadata_Soortbevoegdgezag>;
  soortTaak?: InputMaybe<Scalars['String']['input']>;
  uitvoeringsorganisatie?: InputMaybe<Scalars['String']['input']>;
  uplProductNaam?: InputMaybe<Scalars['String']['input']>;
  wettelijkeTermijn?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsContact = {
  id: Scalars['ID']['output'];
};

export type ComponentComponentsContactInformationPublic = {
  contact_information_public?: Maybe<ContactInformationPublic>;
  id: Scalars['ID']['output'];
};

export type ComponentComponentsContactInformationRichText = {
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsContactInformationRichTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>>>;
};

export type ComponentComponentsContactInformationRichTextInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsEForm = {
  id: Scalars['ID']['output'];
};

export type ComponentComponentsFaq = {
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsfaq_Kennisartikelcategorie>;
  pdc_faq?: Maybe<PdcFaq>;
};

export type ComponentComponentsFloLegalForm = {
  floLegalFormSelector?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentComponentsInternalBlockContent = {
  id: Scalars['ID']['output'];
  internal_field?: Maybe<InternalField>;
};

export type ComponentComponentsInternalContentBlock = {
  id: Scalars['ID']['output'];
};

export type ComponentComponentsInternalContentBlockComponent = {
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsinternalcontentblockcomponent_Kennisartikelcategorie>;
};

export type ComponentComponentsInternalField = {
  contentBlock?: Maybe<Array<Maybe<ComponentComponentsUtrechtRichText>>>;
  id: Scalars['ID']['output'];
  keywords?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsInternalFieldContentBlockArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsInternalFieldFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsInternalFieldFiltersInput>>>;
  contentBlock?: InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>;
  keywords?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsInternalFieldFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsInternalFieldFiltersInput>>>;
  uuid?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsInternalFieldInput = {
  contentBlock?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtRichTextInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsKennisartikel = {
  afdelingen?: Maybe<Array<Maybe<ComponentComponentsAfdelingen>>>;
  doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep;
  id: Scalars['ID']['output'];
  productAanwezig: Scalars['Boolean']['output'];
  productValtOnder?: Maybe<Scalars['String']['output']>;
  upnUri: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
  verantwoordelijkeOrganisatie?: Maybe<ComponentComponentsVerantwoordelijkeOrganisatie>;
};


export type ComponentComponentsKennisartikelAfdelingenArgs = {
  filters?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsKennisartikelFiltersInput = {
  afdelingen?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsKennisartikelFiltersInput>>>;
  doelgroep?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsKennisartikelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsKennisartikelFiltersInput>>>;
  productAanwezig?: InputMaybe<BooleanFilterInput>;
  productValtOnder?: InputMaybe<StringFilterInput>;
  upnUri?: InputMaybe<StringFilterInput>;
  uuid?: InputMaybe<StringFilterInput>;
  verantwoordelijkeOrganisatie?: InputMaybe<ComponentComponentsVerantwoordelijkeOrganisatieFiltersInput>;
};

export type ComponentComponentsKennisartikelInput = {
  afdelingen?: InputMaybe<Array<InputMaybe<ComponentComponentsAfdelingenInput>>>;
  doelgroep?: InputMaybe<Enum_Componentcomponentskennisartikel_Doelgroep>;
  id?: InputMaybe<Scalars['ID']['input']>;
  productAanwezig?: InputMaybe<Scalars['Boolean']['input']>;
  productValtOnder?: InputMaybe<Scalars['String']['input']>;
  upnUri?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  verantwoordelijkeOrganisatie?: InputMaybe<ComponentComponentsVerantwoordelijkeOrganisatieInput>;
};

export type ComponentComponentsMetadata = {
  eForm?: Maybe<ComponentComponentsEForm>;
  id: Scalars['ID']['output'];
};

export type ComponentComponentsOnlineRequest = {
  id: Scalars['ID']['output'];
  type: Enum_Componentcomponentsonlinerequest_Type;
};

export type ComponentComponentsOnlineRequestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsOnlineRequestFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsOnlineRequestFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsOnlineRequestFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsOnlineRequestInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Enum_Componentcomponentsonlinerequest_Type>;
};

export type ComponentComponentsPrice = {
  currency: Enum_Componentcomponentsprice_Currency;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
  value: Scalars['Float']['output'];
};

export type ComponentComponentsPriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceFiltersInput>>>;
  currency?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceFiltersInput>>>;
  uuid?: InputMaybe<StringFilterInput>;
  value?: InputMaybe<FloatFilterInput>;
};

export type ComponentComponentsPriceInput = {
  currency?: InputMaybe<Enum_Componentcomponentsprice_Currency>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type ComponentComponentsSpatial = {
  id: Scalars['ID']['output'];
  resourceIdentifier?: Maybe<Scalars['String']['output']>;
  scheme: Scalars['String']['output'];
};

export type ComponentComponentsSpatialFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsSpatialFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsSpatialFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsSpatialFiltersInput>>>;
  resourceIdentifier?: InputMaybe<StringFilterInput>;
  scheme?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsSpatialInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  resourceIdentifier?: InputMaybe<Scalars['String']['input']>;
  scheme?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsTrackingScripts = {
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  slug?: Maybe<Enum_Componentcomponentstrackingscripts_Slug>;
};

export type ComponentComponentsTrackingScriptsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsTrackingScriptsFiltersInput>>>;
  enabled?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentComponentsTrackingScriptsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsTrackingScriptsFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsTrackingScriptsInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Enum_Componentcomponentstrackingscripts_Slug>;
};

export type ComponentComponentsTrefwoorden = {
  id: Scalars['ID']['output'];
  trefwoord?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsTrefwoordenFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsTrefwoordenFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsTrefwoordenFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsTrefwoordenFiltersInput>>>;
  trefwoord?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsTriggerMatomoScript = {
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  trackingScripts?: Maybe<Array<Maybe<ComponentComponentsTrackingScripts>>>;
};


export type ComponentComponentsTriggerMatomoScriptTrackingScriptsArgs = {
  filters?: InputMaybe<ComponentComponentsTrackingScriptsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsTriggerMatomoScriptInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trackingScripts?: InputMaybe<Array<InputMaybe<ComponentComponentsTrackingScriptsInput>>>;
};

export type ComponentComponentsUrl = {
  id: Scalars['ID']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtAccordion = {
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Maybe<ComponentComponentsUtrechtAccordionSection>>>;
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtaccordion_Kennisartikelcategorie>;
};


export type ComponentComponentsUtrechtAccordionItemArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtAccordionSection = {
  body?: Maybe<Scalars['String']['output']>;
  headingLevel?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtaccordionsection_Kennisartikelcategorie>;
  label?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtAccordionSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  headingLevel?: InputMaybe<IntFilterInput>;
  kennisartikelCategorie?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>>>;
};

export type ComponentComponentsUtrechtAccordionSectionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  headingLevel?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  kennisartikelCategorie?: InputMaybe<Enum_Componentcomponentsutrechtaccordionsection_Kennisartikelcategorie>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsUtrechtFooter = {
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  list?: Maybe<ComponentComponentsUtrechtFooterList>;
  socialMediaList?: Maybe<ComponentComponentsUtrechtSocialMediaList>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtFooterLink = {
  href?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  textContent?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtFooterLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtFooterLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtFooterLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtFooterLinkFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtFooterList = {
  id: Scalars['ID']['output'];
  listItem?: Maybe<Array<Maybe<ComponentComponentsUtrechtFooterListItem>>>;
};


export type ComponentComponentsUtrechtFooterListListItemArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtFooterListItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtFooterListItem = {
  id: Scalars['ID']['output'];
  link?: Maybe<Array<Maybe<ComponentComponentsUtrechtFooterLink>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsUtrechtFooterListItemLinkArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtFooterLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtFooterListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtFooterListItemFiltersInput>>>;
  link?: InputMaybe<ComponentComponentsUtrechtFooterLinkFiltersInput>;
  not?: InputMaybe<ComponentComponentsUtrechtFooterListItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtFooterListItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtImage = {
  id: Scalars['ID']['output'];
  imageData?: Maybe<UploadFile>;
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtimage_Kennisartikelcategorie>;
};

export type ComponentComponentsUtrechtLink = {
  href?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Enum_Componentcomponentsutrechtlink_Icon>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtlink_Kennisartikelcategorie>;
  language?: Maybe<Scalars['String']['output']>;
  textContent?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtLogoButton = {
  appearance?: Maybe<Enum_Componentcomponentsutrechtlogobutton_Appearance>;
  href?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtlogobutton_Kennisartikelcategorie>;
  label?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Enum_Componentcomponentsutrechtlogobutton_Logo>;
  openFormsEmbed?: Maybe<Scalars['String']['output']>;
  textContent?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtLogoButtonFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>>>;
  appearance?: InputMaybe<StringFilterInput>;
  href?: InputMaybe<StringFilterInput>;
  kennisartikelCategorie?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  logo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  openFormsEmbed?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtMultiColumnsButton = {
  column?: Maybe<Array<Maybe<ComponentComponentsUtrechtMultiColumnsButtonItem>>>;
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtmulticolumnsbutton_Kennisartikelcategorie>;
};


export type ComponentComponentsUtrechtMultiColumnsButtonColumnArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtMultiColumnsButtonItem = {
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtmulticolumnsbuttonitem_Kennisartikelcategorie>;
  logoButton?: Maybe<Array<Maybe<ComponentComponentsUtrechtLogoButton>>>;
  title?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsUtrechtMultiColumnsButtonItemLogoButtonArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>>>;
  kennisartikelCategorie?: InputMaybe<StringFilterInput>;
  logoButton?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  not?: InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtNavigation = {
  id: Scalars['ID']['output'];
  navigationList?: Maybe<Array<Maybe<ComponentComponentsUtrechtNavigationLink>>>;
};


export type ComponentComponentsUtrechtNavigationNavigationListArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtNavigationLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtNavigationLink = {
  href?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  textContent?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtNavigationLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtNavigationLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtNavigationLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtNavigationLinkFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtRichText = {
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie>;
  label?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtRichTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  kennisartikelCategorie?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtRichTextFiltersInput>>>;
};

export type ComponentComponentsUtrechtRichTextInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  kennisartikelCategorie?: InputMaybe<Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsUtrechtSocialMediaLink = {
  href?: Maybe<Scalars['String']['output']>;
  icon: Enum_Componentcomponentsutrechtsocialmedialink_Icon;
  id: Scalars['ID']['output'];
  textContent?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtSocialMediaLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtSocialMediaLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  icon?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtSocialMediaLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtSocialMediaLinkFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtSocialMediaList = {
  id: Scalars['ID']['output'];
  link?: Maybe<Array<Maybe<ComponentComponentsUtrechtSocialMediaLink>>>;
};


export type ComponentComponentsUtrechtSocialMediaListLinkArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtSocialMediaLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtSpotlight = {
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  kennisartikelCategorie?: Maybe<Enum_Componentcomponentsutrechtspotlight_Kennisartikelcategorie>;
  logoButton?: Maybe<Array<Maybe<ComponentComponentsUtrechtLogoButton>>>;
  type?: Maybe<Enum_Componentcomponentsutrechtspotlight_Type>;
};


export type ComponentComponentsUtrechtSpotlightLogoButtonArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtTopTaskLink = {
  href?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  textContent?: Maybe<Scalars['String']['output']>;
  topTaskIcons: Enum_Componentcomponentsutrechttoptasklink_Toptaskicons;
};

export type ComponentComponentsUtrechtTopTaskLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtTopTaskLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtTopTaskLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtTopTaskLinkFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
  topTaskIcons?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtTopTasks = {
  id: Scalars['ID']['output'];
  link?: Maybe<Array<Maybe<ComponentComponentsUtrechtTopTaskLink>>>;
};


export type ComponentComponentsUtrechtTopTasksLinkArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtTopTaskLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsVac = {
  afdelingen?: Maybe<Array<Maybe<ComponentComponentsAfdelingen>>>;
  antwoord?: Maybe<Array<Maybe<ComponentComponentsAntwoord>>>;
  doelgroep?: Maybe<Enum_Componentcomponentsvac_Doelgroep>;
  id: Scalars['ID']['output'];
  keywords?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Enum_Componentcomponentsvac_Status>;
  toelichting?: Maybe<Scalars['String']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vraag?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsVacAfdelingenArgs = {
  filters?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentComponentsVacAntwoordArgs = {
  filters?: InputMaybe<ComponentComponentsAntwoordFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsVacFiltersInput = {
  afdelingen?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsVacFiltersInput>>>;
  antwoord?: InputMaybe<ComponentComponentsAntwoordFiltersInput>;
  doelgroep?: InputMaybe<StringFilterInput>;
  keywords?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsVacFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsVacFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
  toelichting?: InputMaybe<StringFilterInput>;
  uuid?: InputMaybe<StringFilterInput>;
  vraag?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsVacInput = {
  afdelingen?: InputMaybe<Array<InputMaybe<ComponentComponentsAfdelingenInput>>>;
  antwoord?: InputMaybe<Array<InputMaybe<ComponentComponentsAntwoordInput>>>;
  doelgroep?: InputMaybe<Enum_Componentcomponentsvac_Doelgroep>;
  id?: InputMaybe<Scalars['ID']['input']>;
  keywords?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Enum_Componentcomponentsvac_Status>;
  toelichting?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vraag?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsVacUitklapmenu = {
  afdelingen?: Maybe<Array<Maybe<ComponentComponentsAfdelingen>>>;
  body?: Maybe<Scalars['String']['output']>;
  doelgroep?: Maybe<Enum_Componentcomponentsvacuitklapmenu_Doelgroep>;
  headingLevel?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Enum_Componentcomponentsvacuitklapmenu_Status>;
  toelichting?: Maybe<Scalars['String']['output']>;
  trefwoorden?: Maybe<Array<Maybe<ComponentComponentsTrefwoorden>>>;
  uuid?: Maybe<Scalars['String']['output']>;
};


export type ComponentComponentsVacUitklapmenuAfdelingenArgs = {
  filters?: InputMaybe<ComponentComponentsAfdelingenFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ComponentComponentsVacUitklapmenuTrefwoordenArgs = {
  filters?: InputMaybe<ComponentComponentsTrefwoordenFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsVerantwoordelijkeOrganisatie = {
  id: Scalars['ID']['output'];
  owmsEndDate: Scalars['DateTime']['output'];
  owmsIdentifier: Scalars['String']['output'];
  owmsPrefLabel?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsVerantwoordelijkeOrganisatieFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsVerantwoordelijkeOrganisatieFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsVerantwoordelijkeOrganisatieFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsVerantwoordelijkeOrganisatieFiltersInput>>>;
  owmsEndDate?: InputMaybe<DateTimeFilterInput>;
  owmsIdentifier?: InputMaybe<StringFilterInput>;
  owmsPrefLabel?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsVerantwoordelijkeOrganisatieInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  owmsEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  owmsIdentifier?: InputMaybe<Scalars['String']['input']>;
  owmsPrefLabel?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSeoMeta = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keymatch: Scalars['String']['output'];
  ogImage?: Maybe<UploadFile>;
  title: Scalars['String']['output'];
};

export type ComponentSeoMetaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSeoMetaFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  keymatch?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentSeoMetaFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSeoMetaFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSeoMetaInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  keymatch?: InputMaybe<Scalars['String']['input']>;
  ogImage?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ContactInformationInternal = {
  contentBlock?: Maybe<Array<Maybe<ComponentComponentsContactInformationRichText>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  internal_information: Array<Maybe<InternalField>>;
  internal_information_connection?: Maybe<InternalFieldRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vacs: Array<Maybe<Vac>>;
  vacs_connection?: Maybe<VacRelationResponseCollection>;
};


export type ContactInformationInternalContentBlockArgs = {
  filters?: InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationInternalInternal_InformationArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationInternalInternal_Information_ConnectionArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationInternalVacsArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationInternalVacs_ConnectionArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContactInformationInternalEntityResponseCollection = {
  nodes: Array<ContactInformationInternal>;
  pageInfo: Pagination;
};

export type ContactInformationInternalFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactInformationInternalFiltersInput>>>;
  contentBlock?: InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  internal_information?: InputMaybe<InternalFieldFiltersInput>;
  not?: InputMaybe<ContactInformationInternalFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactInformationInternalFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vacs?: InputMaybe<VacFiltersInput>;
};

export type ContactInformationInternalInput = {
  contentBlock?: InputMaybe<Array<InputMaybe<ComponentComponentsContactInformationRichTextInput>>>;
  internal_information?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vacs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ContactInformationInternalRelationResponseCollection = {
  nodes: Array<ContactInformationInternal>;
};

export type ContactInformationPublic = {
  contentBlock?: Maybe<Array<Maybe<ComponentComponentsContactInformationRichText>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  internal_information: Array<Maybe<InternalField>>;
  internal_information_connection?: Maybe<InternalFieldRelationResponseCollection>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vacs: Array<Maybe<Vac>>;
  vacs_connection?: Maybe<VacRelationResponseCollection>;
};


export type ContactInformationPublicContentBlockArgs = {
  filters?: InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicInternal_InformationArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicInternal_Information_ConnectionArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicVacsArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ContactInformationPublicVacs_ConnectionArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContactInformationPublicEntityResponseCollection = {
  nodes: Array<ContactInformationPublic>;
  pageInfo: Pagination;
};

export type ContactInformationPublicFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactInformationPublicFiltersInput>>>;
  contentBlock?: InputMaybe<ComponentComponentsContactInformationRichTextFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  internal_information?: InputMaybe<InternalFieldFiltersInput>;
  not?: InputMaybe<ContactInformationPublicFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactInformationPublicFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vacs?: InputMaybe<VacFiltersInput>;
};

export type ContactInformationPublicInput = {
  contentBlock?: InputMaybe<Array<InputMaybe<ComponentComponentsContactInformationRichTextInput>>>;
  internal_information?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vacs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeleteMutationResponse = {
  documentId: Scalars['ID']['output'];
};

export enum Enum_Componentcomponentsantwoord_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsaudience_Type {
  Ondernemer = 'ondernemer',
  Particulier = 'particulier'
}

export enum Enum_Componentcomponentscimpdcproductmetadata_Bestelwijze {
  Informatie = 'informatie',
  InitiatiefBevoegdGezag = 'initiatief_bevoegd_gezag',
  OpVerzoek = 'op_verzoek'
}

export enum Enum_Componentcomponentscimpdcproductmetadata_Doelgroep {
  BedrijvenEnInstellingen = 'bedrijven_en_instellingen',
  Burgers = 'burgers',
  InterneOrganisatie = 'interne_organisatie',
  Samenwerkingspartners = 'samenwerkingspartners'
}

export enum Enum_Componentcomponentscimpdcproductmetadata_Soortbevoegdgezag {
  Gemeente = 'gemeente',
  Provincie = 'provincie',
  Rijksoverheid = 'rijksoverheid',
  Waterschap = 'waterschap'
}

export enum Enum_Componentcomponentsfaq_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsinternalcontentblockcomponent_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentskennisartikel_Doelgroep {
  EuBedrijf = 'eu_bedrijf',
  EuBurger = 'eu_burger'
}

export enum Enum_Componentcomponentsonlinerequest_Type {
  Digid = 'digid',
  Ja = 'ja',
  Nee = 'nee'
}

export enum Enum_Componentcomponentsprice_Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

export enum Enum_Componentcomponentstrackingscripts_Slug {
  DarkMode = 'dark_mode',
  ForcedColors = 'forced_colors',
  GoogleTranslate = 'google_translate',
  ZoomForms = 'zoom_forms'
}

export enum Enum_Componentcomponentsutrechtaccordionsection_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtaccordion_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtimage_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtlink_Icon {
  Arrow = 'arrow'
}

export enum Enum_Componentcomponentsutrechtlink_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtlogobutton_Appearance {
  Magenta = 'magenta',
  PrimaryActionButton = 'primary_action_button',
  SecondaryActionButton = 'secondary_action_button'
}

export enum Enum_Componentcomponentsutrechtlogobutton_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtlogobutton_Logo {
  Digid = 'digid',
  Eherkenning = 'eherkenning',
  Eidas = 'eidas',
  WithoutLogo = 'without_logo'
}

export enum Enum_Componentcomponentsutrechtmulticolumnsbuttonitem_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtmulticolumnsbutton_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtsocialmedialink_Icon {
  Facebook = 'facebook',
  Instagram = 'instagram',
  Linkedin = 'linkedin',
  Newsletter = 'newsletter',
  Whatsapp = 'whatsapp',
  X = 'x'
}

export enum Enum_Componentcomponentsutrechtspotlight_Kennisartikelcategorie {
  Aanvraag = 'aanvraag',
  Bewijs = 'bewijs',
  Bezwaar = 'bezwaar',
  Bijzonderheden = 'bijzonderheden',
  Contact = 'contact',
  Inleiding = 'inleiding',
  Kosten = 'kosten',
  Termijn = 'termijn',
  Voorwaarden = 'voorwaarden',
  WatTeDoenBijGeenReactie = 'wat_te_doen_bij_geen_reactie'
}

export enum Enum_Componentcomponentsutrechtspotlight_Type {
  Gray = 'gray',
  Info = 'info',
  Warning = 'warning'
}

export enum Enum_Componentcomponentsutrechttoptasklink_Toptaskicons {
  AfspraakMaken = 'afspraak_maken',
  Afval = 'afval',
  Bewijsstukken = 'bewijsstukken',
  Grofvuil = 'grofvuil',
  GrofvuilOphalen = 'grofvuil_ophalen',
  Hulpverlening = 'hulpverlening',
  Informatie = 'informatie',
  Kalender = 'kalender',
  Klachten = 'klachten',
  Kroon = 'kroon',
  Melding = 'melding',
  MeldingKlacht = 'melding_klacht',
  Nummerbord = 'nummerbord',
  Parkeervergunning = 'parkeervergunning',
  Parkeren = 'parkeren',
  ParkerenBetalen = 'parkeren_betalen',
  Paspoort = 'paspoort',
  Rijbewijs = 'rijbewijs',
  SchildGemeenteUtrecht = 'schild_gemeente_utrecht',
  Subsidie = 'subsidie',
  Verhuizen = 'verhuizen',
  Werkzaamheden = 'werkzaamheden'
}

export enum Enum_Componentcomponentsvacuitklapmenu_Doelgroep {
  EuBedrijf = 'eu_bedrijf',
  EuBurger = 'eu_burger',
  EuBurgerBedrijf = 'eu_burger_bedrijf'
}

export enum Enum_Componentcomponentsvacuitklapmenu_Status {
  Actief = 'actief',
  NonActief = 'non_actief',
  TeVerwijderen = 'te_verwijderen'
}

export enum Enum_Componentcomponentsvac_Doelgroep {
  EuBedrijf = 'eu_bedrijf',
  EuBurger = 'eu_burger',
  EuBurgerBedrijf = 'eu_burger_bedrijf'
}

export enum Enum_Componentcomponentsvac_Status {
  Actief = 'actief',
  NonActief = 'non_actief',
  TeVerwijderen = 'te_verwijderen'
}

export enum Enum_Openformserrorpage_Type {
  FormNotFound = 'form_not_found',
  FormServerIsOffline = 'form_server_is_offline'
}

export enum Enum_Productencatalogus_Doelgroep {
  BedrijvenEnInstellingen = 'bedrijven_en_instellingen',
  Burgers = 'burgers',
  InterneOrganisatie = 'interne_organisatie',
  Samenwerkingspartners = 'samenwerkingspartners'
}

export type EntityNotesNote = {
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  entitySlug?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityNotesNoteEntityResponseCollection = {
  nodes: Array<EntityNotesNote>;
  pageInfo: Pagination;
};

export type EntityNotesNoteFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EntityNotesNoteFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  entityId?: InputMaybe<StringFilterInput>;
  entitySlug?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EntityNotesNoteFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EntityNotesNoteFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EntityNotesNoteInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['String']['input']>;
  entitySlug?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Error = {
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = AdditionalInformation | ComponentComponentsAdditionalInformation | ComponentComponentsAdditionalInformationField | ComponentComponentsAfdelingen | ComponentComponentsAntwoord | ComponentComponentsAudience | ComponentComponentsCatalogiMeta | ComponentComponentsCimPdcProductAspectBeschrijving | ComponentComponentsCimPdcProductBeschrijving | ComponentComponentsCimPdcProductMetadata | ComponentComponentsContact | ComponentComponentsContactInformationPublic | ComponentComponentsContactInformationRichText | ComponentComponentsEForm | ComponentComponentsFaq | ComponentComponentsFloLegalForm | ComponentComponentsInternalBlockContent | ComponentComponentsInternalContentBlock | ComponentComponentsInternalContentBlockComponent | ComponentComponentsInternalField | ComponentComponentsKennisartikel | ComponentComponentsMetadata | ComponentComponentsOnlineRequest | ComponentComponentsPrice | ComponentComponentsSpatial | ComponentComponentsTrackingScripts | ComponentComponentsTrefwoorden | ComponentComponentsTriggerMatomoScript | ComponentComponentsUrl | ComponentComponentsUtrechtAccordion | ComponentComponentsUtrechtAccordionSection | ComponentComponentsUtrechtFooter | ComponentComponentsUtrechtFooterLink | ComponentComponentsUtrechtFooterList | ComponentComponentsUtrechtFooterListItem | ComponentComponentsUtrechtImage | ComponentComponentsUtrechtLink | ComponentComponentsUtrechtLogoButton | ComponentComponentsUtrechtMultiColumnsButton | ComponentComponentsUtrechtMultiColumnsButtonItem | ComponentComponentsUtrechtNavigation | ComponentComponentsUtrechtNavigationLink | ComponentComponentsUtrechtRichText | ComponentComponentsUtrechtSocialMediaLink | ComponentComponentsUtrechtSocialMediaList | ComponentComponentsUtrechtSpotlight | ComponentComponentsUtrechtTopTaskLink | ComponentComponentsUtrechtTopTasks | ComponentComponentsVac | ComponentComponentsVacUitklapmenu | ComponentComponentsVerantwoordelijkeOrganisatie | ComponentSeoMeta | ContactInformationInternal | ContactInformationPublic | EntityNotesNote | I18NLocale | InternalField | NotFoundPage | OpenFormsErrorPage | PdcCategory | PdcFaq | PdcHomePage | PdcSubcategory | PdcTemplate | Price | Product | Productencatalogus | PublisherAction | ReviewWorkflowsWorkflow | ReviewWorkflowsWorkflowStage | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Vac | WebsiteSetting;

export type I18NLocale = {
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntityResponseCollection = {
  nodes: Array<I18NLocale>;
  pageInfo: Pagination;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type InternalField = {
  contact_information_internal: Array<Maybe<ContactInformationInternal>>;
  contact_information_internal_connection?: Maybe<ContactInformationInternalRelationResponseCollection>;
  contact_information_public?: Maybe<ContactInformationPublic>;
  content?: Maybe<ComponentComponentsInternalField>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  product?: Maybe<Product>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type InternalFieldContact_Information_InternalArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type InternalFieldContact_Information_Internal_ConnectionArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type InternalFieldEntityResponseCollection = {
  nodes: Array<InternalField>;
  pageInfo: Pagination;
};

export type InternalFieldFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InternalFieldFiltersInput>>>;
  contact_information_internal?: InputMaybe<ContactInformationInternalFiltersInput>;
  contact_information_public?: InputMaybe<ContactInformationPublicFiltersInput>;
  content?: InputMaybe<ComponentComponentsInternalFieldFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<InternalFieldFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InternalFieldFiltersInput>>>;
  product?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type InternalFieldInput = {
  contact_information_internal?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contact_information_public?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<ComponentComponentsInternalFieldInput>;
  product?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type InternalFieldRelationResponseCollection = {
  nodes: Array<InternalField>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAdditionalInformation?: Maybe<AdditionalInformation>;
  createContactInformationInternal?: Maybe<ContactInformationInternal>;
  createContactInformationPublic?: Maybe<ContactInformationPublic>;
  createEntityNotesNote?: Maybe<EntityNotesNote>;
  createInternalField?: Maybe<InternalField>;
  createOpenFormsErrorPage?: Maybe<OpenFormsErrorPage>;
  createPdcCategory?: Maybe<PdcCategory>;
  createPdcFaq?: Maybe<PdcFaq>;
  createPdcSubcategory?: Maybe<PdcSubcategory>;
  createPrice?: Maybe<Price>;
  createProduct?: Maybe<Product>;
  createProductencatalogus?: Maybe<Productencatalogus>;
  createPublisherAction?: Maybe<PublisherAction>;
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVac?: Maybe<Vac>;
  deleteAdditionalInformation?: Maybe<DeleteMutationResponse>;
  deleteContactInformationInternal?: Maybe<DeleteMutationResponse>;
  deleteContactInformationPublic?: Maybe<DeleteMutationResponse>;
  deleteEntityNotesNote?: Maybe<DeleteMutationResponse>;
  deleteInternalField?: Maybe<DeleteMutationResponse>;
  deleteNotFoundPage?: Maybe<DeleteMutationResponse>;
  deleteOpenFormsErrorPage?: Maybe<DeleteMutationResponse>;
  deletePdcCategory?: Maybe<DeleteMutationResponse>;
  deletePdcFaq?: Maybe<DeleteMutationResponse>;
  deletePdcHomePage?: Maybe<DeleteMutationResponse>;
  deletePdcSubcategory?: Maybe<DeleteMutationResponse>;
  deletePdcTemplate?: Maybe<DeleteMutationResponse>;
  deletePrice?: Maybe<DeleteMutationResponse>;
  deleteProduct?: Maybe<DeleteMutationResponse>;
  deleteProductencatalogus?: Maybe<DeleteMutationResponse>;
  deletePublisherAction?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>;
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>;
  deleteUploadFile?: Maybe<UploadFile>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVac?: Maybe<DeleteMutationResponse>;
  deleteWebsiteSetting?: Maybe<DeleteMutationResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAdditionalInformation?: Maybe<AdditionalInformation>;
  updateContactInformationInternal?: Maybe<ContactInformationInternal>;
  updateContactInformationPublic?: Maybe<ContactInformationPublic>;
  updateEntityNotesNote?: Maybe<EntityNotesNote>;
  updateInternalField?: Maybe<InternalField>;
  updateNotFoundPage?: Maybe<NotFoundPage>;
  updateOpenFormsErrorPage?: Maybe<OpenFormsErrorPage>;
  updatePdcCategory?: Maybe<PdcCategory>;
  updatePdcFaq?: Maybe<PdcFaq>;
  updatePdcHomePage?: Maybe<PdcHomePage>;
  updatePdcSubcategory?: Maybe<PdcSubcategory>;
  updatePdcTemplate?: Maybe<PdcTemplate>;
  updatePrice?: Maybe<Price>;
  updateProduct?: Maybe<Product>;
  updateProductencatalogus?: Maybe<Productencatalogus>;
  updatePublisherAction?: Maybe<PublisherAction>;
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  updateUploadFile: UploadFile;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVac?: Maybe<Vac>;
  updateWebsiteSetting?: Maybe<WebsiteSetting>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateAdditionalInformationArgs = {
  data: AdditionalInformationInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateContactInformationInternalArgs = {
  data: ContactInformationInternalInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateContactInformationPublicArgs = {
  data: ContactInformationPublicInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateEntityNotesNoteArgs = {
  data: EntityNotesNoteInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateInternalFieldArgs = {
  data: InternalFieldInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateOpenFormsErrorPageArgs = {
  data: OpenFormsErrorPageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePdcCategoryArgs = {
  data: PdcCategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePdcFaqArgs = {
  data: PdcFaqInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePdcSubcategoryArgs = {
  data: PdcSubcategoryInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePriceArgs = {
  data: PriceInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateProductencatalogusArgs = {
  data: ProductencatalogusInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreatePublisherActionArgs = {
  data: PublisherActionInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVacArgs = {
  data: VacInput;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationDeleteAdditionalInformationArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteContactInformationInternalArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteContactInformationPublicArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteEntityNotesNoteArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteInternalFieldArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteNotFoundPageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteOpenFormsErrorPageArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePdcCategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePdcFaqArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePdcHomePageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePdcSubcategoryArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePdcTemplateArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePriceArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteProductencatalogusArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeletePublisherActionArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVacArgs = {
  documentId: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAdditionalInformationArgs = {
  data: AdditionalInformationInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateContactInformationInternalArgs = {
  data: ContactInformationInternalInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateContactInformationPublicArgs = {
  data: ContactInformationPublicInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateEntityNotesNoteArgs = {
  data: EntityNotesNoteInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateInternalFieldArgs = {
  data: InternalFieldInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateNotFoundPageArgs = {
  data: NotFoundPageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateOpenFormsErrorPageArgs = {
  data: OpenFormsErrorPageInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePdcCategoryArgs = {
  data: PdcCategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePdcFaqArgs = {
  data: PdcFaqInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePdcHomePageArgs = {
  data: PdcHomePageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePdcSubcategoryArgs = {
  data: PdcSubcategoryInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePdcTemplateArgs = {
  data: PdcTemplateInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePriceArgs = {
  data: PriceInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  documentId: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateProductencatalogusArgs = {
  data: ProductencatalogusInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdatePublisherActionArgs = {
  data: PublisherActionInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateVacArgs = {
  data: VacInput;
  documentId: Scalars['ID']['input'];
  status?: InputMaybe<PublicationStatus>;
};


export type MutationUpdateWebsiteSettingArgs = {
  data: WebsiteSettingInput;
  status?: InputMaybe<PublicationStatus>;
};

export type NotFoundPage = {
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<NotFoundPage>>;
  localizations_connection?: Maybe<NotFoundPageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NotFoundPageInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NotFoundPageRelationResponseCollection = {
  nodes: Array<NotFoundPage>;
};

export type OpenFormsErrorPage = {
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<OpenFormsErrorPage>>;
  localizations_connection?: Maybe<OpenFormsErrorPageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: Enum_Openformserrorpage_Type;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type OpenFormsErrorPageLocalizationsArgs = {
  filters?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OpenFormsErrorPageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OpenFormsErrorPageEntityResponseCollection = {
  nodes: Array<OpenFormsErrorPage>;
  pageInfo: Pagination;
};

export type OpenFormsErrorPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OpenFormsErrorPageFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  not?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OpenFormsErrorPageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OpenFormsErrorPageInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Enum_Openformserrorpage_Type>;
};

export type OpenFormsErrorPageRelationResponseCollection = {
  nodes: Array<OpenFormsErrorPage>;
};

export type Pagination = {
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PdcCategory = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  pdc_subcategories: Array<Maybe<PdcSubcategory>>;
  pdc_subcategories_connection?: Maybe<PdcSubcategoryRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PdcCategoryPdc_SubcategoriesArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcCategoryPdc_Subcategories_ConnectionArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PdcCategoryEntityResponseCollection = {
  nodes: Array<PdcCategory>;
  pageInfo: Pagination;
};

export type PdcCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PdcCategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PdcCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PdcCategoryFiltersInput>>>;
  pdc_subcategories?: InputMaybe<PdcSubcategoryFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PdcCategoryInput = {
  pdc_subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PdcFaq = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  faq?: Maybe<Array<Maybe<ComponentComponentsUtrechtAccordionSection>>>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<PdcFaq>>;
  localizations_connection?: Maybe<PdcFaqRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PdcFaqFaqArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcFaqLocalizationsArgs = {
  filters?: InputMaybe<PdcFaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcFaqLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PdcFaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PdcFaqEntityResponseCollection = {
  nodes: Array<PdcFaq>;
  pageInfo: Pagination;
};

export type PdcFaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PdcFaqFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  faq?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PdcFaqFiltersInput>;
  not?: InputMaybe<PdcFaqFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PdcFaqFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PdcFaqInput = {
  faq?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PdcFaqRelationResponseCollection = {
  nodes: Array<PdcFaq>;
};

export type PdcHomePage = {
  components?: Maybe<Array<Maybe<PdcHomePageComponentsDynamicZone>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<PdcHomePage>>;
  localizations_connection?: Maybe<PdcHomePageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PdcHomePageComponentsDynamicZone = ComponentComponentsUtrechtTopTasks | Error;

export type PdcHomePageInput = {
  components?: InputMaybe<Array<Scalars['PdcHomePageComponentsDynamicZoneInput']['input']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PdcHomePageRelationResponseCollection = {
  nodes: Array<PdcHomePage>;
};

export type PdcSubcategory = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  pdc_category?: Maybe<PdcCategory>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vacs: Array<Maybe<Vac>>;
  vacs_connection?: Maybe<VacRelationResponseCollection>;
};


export type PdcSubcategoryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcSubcategoryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcSubcategoryVacsArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PdcSubcategoryVacs_ConnectionArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PdcSubcategoryEntityResponseCollection = {
  nodes: Array<PdcSubcategory>;
  pageInfo: Pagination;
};

export type PdcSubcategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PdcSubcategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PdcSubcategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PdcSubcategoryFiltersInput>>>;
  pdc_category?: InputMaybe<PdcCategoryFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vacs?: InputMaybe<VacFiltersInput>;
};

export type PdcSubcategoryInput = {
  pdc_category?: InputMaybe<Scalars['ID']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vacs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type PdcSubcategoryRelationResponseCollection = {
  nodes: Array<PdcSubcategory>;
};

export type PdcTemplate = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<PdcTemplate>>;
  localizations_connection?: Maybe<PdcTemplateRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sections?: Maybe<Array<Maybe<PdcTemplateSectionsDynamicZone>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PdcTemplateInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<Array<Scalars['PdcTemplateSectionsDynamicZoneInput']['input']>>;
};

export type PdcTemplateRelationResponseCollection = {
  nodes: Array<PdcTemplate>;
};

export type PdcTemplateSectionsDynamicZone = ComponentComponentsUtrechtFooter | ComponentComponentsUtrechtNavigation | Error;

export type Price = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  price?: Maybe<Array<Maybe<ComponentComponentsPrice>>>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};


export type PricePriceArgs = {
  filters?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PriceProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PriceProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PriceEntityResponseCollection = {
  nodes: Array<Price>;
  pageInfo: Pagination;
};

export type PriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  price?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  uuid?: InputMaybe<StringFilterInput>;
};

export type PriceInput = {
  price?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceInput>>>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  additional_information?: Maybe<AdditionalInformation>;
  catalogiMeta?: Maybe<ComponentComponentsCatalogiMeta>;
  contact_information_public?: Maybe<ContactInformationPublic>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  enable_kcm_survey?: Maybe<Scalars['Boolean']['output']>;
  kennisartikelMetadata?: Maybe<ComponentComponentsKennisartikel>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations: Array<Maybe<Product>>;
  localizations_connection?: Maybe<ProductRelationResponseCollection>;
  metaTags?: Maybe<ComponentSeoMeta>;
  oldSlugs?: Maybe<Scalars['JSON']['output']>;
  pdc_metadata?: Maybe<ComponentComponentsCimPdcProductMetadata>;
  pdc_subcategories: Array<Maybe<PdcSubcategory>>;
  pdc_subcategories_connection?: Maybe<PdcSubcategoryRelationResponseCollection>;
  price?: Maybe<Price>;
  productencatalogus?: Maybe<Productencatalogus>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sections?: Maybe<Array<Maybe<ProductSectionsDynamicZone>>>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  vacs?: Maybe<Vac>;
};


export type ProductLocalizationsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductPdc_SubcategoriesArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductPdc_Subcategories_ConnectionArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductEntityResponseCollection = {
  nodes: Array<Product>;
  pageInfo: Pagination;
};

export type ProductFiltersInput = {
  additional_information?: InputMaybe<AdditionalInformationFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  catalogiMeta?: InputMaybe<ComponentComponentsCatalogiMetaFiltersInput>;
  contact_information_public?: InputMaybe<ContactInformationPublicFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  enable_kcm_survey?: InputMaybe<BooleanFilterInput>;
  kennisartikelMetadata?: InputMaybe<ComponentComponentsKennisartikelFiltersInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProductFiltersInput>;
  metaTags?: InputMaybe<ComponentSeoMetaFiltersInput>;
  not?: InputMaybe<ProductFiltersInput>;
  oldSlugs?: InputMaybe<JsonFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  pdc_metadata?: InputMaybe<ComponentComponentsCimPdcProductMetadataFiltersInput>;
  pdc_subcategories?: InputMaybe<PdcSubcategoryFiltersInput>;
  price?: InputMaybe<PriceFiltersInput>;
  productencatalogus?: InputMaybe<ProductencatalogusFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  uuid?: InputMaybe<StringFilterInput>;
  vacs?: InputMaybe<VacFiltersInput>;
};

export type ProductInput = {
  additional_information?: InputMaybe<Scalars['ID']['input']>;
  catalogiMeta?: InputMaybe<ComponentComponentsCatalogiMetaInput>;
  contact_information_public?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  enable_kcm_survey?: InputMaybe<Scalars['Boolean']['input']>;
  kennisartikelMetadata?: InputMaybe<ComponentComponentsKennisartikelInput>;
  metaTags?: InputMaybe<ComponentSeoMetaInput>;
  oldSlugs?: InputMaybe<Scalars['JSON']['input']>;
  pdc_metadata?: InputMaybe<ComponentComponentsCimPdcProductMetadataInput>;
  pdc_subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  price?: InputMaybe<Scalars['ID']['input']>;
  productencatalogus?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<Array<Scalars['ProductSectionsDynamicZoneInput']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  vacs?: InputMaybe<Scalars['ID']['input']>;
};

export type ProductRelationResponseCollection = {
  nodes: Array<Product>;
};

export type ProductSectionsDynamicZone = ComponentComponentsContactInformationPublic | ComponentComponentsFaq | ComponentComponentsFloLegalForm | ComponentComponentsInternalBlockContent | ComponentComponentsUtrechtAccordion | ComponentComponentsUtrechtImage | ComponentComponentsUtrechtLink | ComponentComponentsUtrechtLogoButton | ComponentComponentsUtrechtMultiColumnsButton | ComponentComponentsUtrechtRichText | ComponentComponentsUtrechtSpotlight | Error;

export type Productencatalogus = {
  begindatumVersie: Scalars['Date']['output'];
  beherendeOrganisatie?: Maybe<Scalars['String']['output']>;
  contactpersoonBeheerEmail?: Maybe<Scalars['String']['output']>;
  contactpersoonBeheerNaam: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  doelgroep: Enum_Productencatalogus_Doelgroep;
  domein: Scalars['String']['output'];
  naam: Scalars['String']['output'];
  organisatieIdentificatie?: Maybe<Scalars['String']['output']>;
  producten?: Maybe<Product>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  referentieCatalogus: Array<Maybe<Productencatalogus>>;
  referentieCatalogus_connection?: Maybe<ProductencatalogusRelationResponseCollection>;
  referentiePDC: Scalars['Boolean']['output'];
  toelichting?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  versie: Scalars['String']['output'];
};


export type ProductencatalogusReferentieCatalogusArgs = {
  filters?: InputMaybe<ProductencatalogusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductencatalogusReferentieCatalogus_ConnectionArgs = {
  filters?: InputMaybe<ProductencatalogusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductencatalogusEntityResponseCollection = {
  nodes: Array<Productencatalogus>;
  pageInfo: Pagination;
};

export type ProductencatalogusFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductencatalogusFiltersInput>>>;
  begindatumVersie?: InputMaybe<DateFilterInput>;
  beherendeOrganisatie?: InputMaybe<StringFilterInput>;
  contactpersoonBeheerEmail?: InputMaybe<StringFilterInput>;
  contactpersoonBeheerNaam?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  doelgroep?: InputMaybe<StringFilterInput>;
  domein?: InputMaybe<StringFilterInput>;
  naam?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProductencatalogusFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductencatalogusFiltersInput>>>;
  organisatieIdentificatie?: InputMaybe<StringFilterInput>;
  producten?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  referentieCatalogus?: InputMaybe<ProductencatalogusFiltersInput>;
  referentiePDC?: InputMaybe<BooleanFilterInput>;
  toelichting?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versie?: InputMaybe<StringFilterInput>;
};

export type ProductencatalogusInput = {
  begindatumVersie?: InputMaybe<Scalars['Date']['input']>;
  beherendeOrganisatie?: InputMaybe<Scalars['String']['input']>;
  contactpersoonBeheerEmail?: InputMaybe<Scalars['String']['input']>;
  contactpersoonBeheerNaam?: InputMaybe<Scalars['String']['input']>;
  doelgroep?: InputMaybe<Enum_Productencatalogus_Doelgroep>;
  domein?: InputMaybe<Scalars['String']['input']>;
  naam?: InputMaybe<Scalars['String']['input']>;
  organisatieIdentificatie?: InputMaybe<Scalars['String']['input']>;
  producten?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  referentieCatalogus?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  referentiePDC?: InputMaybe<Scalars['Boolean']['input']>;
  toelichting?: InputMaybe<Scalars['String']['input']>;
  versie?: InputMaybe<Scalars['String']['input']>;
};

export type ProductencatalogusRelationResponseCollection = {
  nodes: Array<Productencatalogus>;
};

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type PublisherAction = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  entityId: Scalars['String']['output'];
  entitySlug: Scalars['String']['output'];
  executeAt: Scalars['DateTime']['output'];
  mode: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PublisherActionEntityResponseCollection = {
  nodes: Array<PublisherAction>;
  pageInfo: Pagination;
};

export type PublisherActionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  entityId?: InputMaybe<StringFilterInput>;
  entitySlug?: InputMaybe<StringFilterInput>;
  executeAt?: InputMaybe<DateTimeFilterInput>;
  mode?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PublisherActionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PublisherActionInput = {
  entityId?: InputMaybe<Scalars['String']['input']>;
  entitySlug?: InputMaybe<Scalars['String']['input']>;
  executeAt?: InputMaybe<Scalars['DateTime']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Query = {
  additionalInformation?: Maybe<AdditionalInformation>;
  additionalInformations: Array<Maybe<AdditionalInformation>>;
  additionalInformations_connection?: Maybe<AdditionalInformationEntityResponseCollection>;
  contactInformationInternal?: Maybe<ContactInformationInternal>;
  contactInformationInternals: Array<Maybe<ContactInformationInternal>>;
  contactInformationInternals_connection?: Maybe<ContactInformationInternalEntityResponseCollection>;
  contactInformationPublic?: Maybe<ContactInformationPublic>;
  contactInformationPublics: Array<Maybe<ContactInformationPublic>>;
  contactInformationPublics_connection?: Maybe<ContactInformationPublicEntityResponseCollection>;
  entityNotesNote?: Maybe<EntityNotesNote>;
  entityNotesNotes: Array<Maybe<EntityNotesNote>>;
  entityNotesNotes_connection?: Maybe<EntityNotesNoteEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocale>;
  i18NLocales: Array<Maybe<I18NLocale>>;
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>;
  internalField?: Maybe<InternalField>;
  internalFields: Array<Maybe<InternalField>>;
  internalFields_connection?: Maybe<InternalFieldEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  notFoundPage?: Maybe<NotFoundPage>;
  openFormsErrorPage?: Maybe<OpenFormsErrorPage>;
  openFormsErrorPages: Array<Maybe<OpenFormsErrorPage>>;
  openFormsErrorPages_connection?: Maybe<OpenFormsErrorPageEntityResponseCollection>;
  pdcCategories: Array<Maybe<PdcCategory>>;
  pdcCategories_connection?: Maybe<PdcCategoryEntityResponseCollection>;
  pdcCategory?: Maybe<PdcCategory>;
  pdcFaq?: Maybe<PdcFaq>;
  pdcFaqs: Array<Maybe<PdcFaq>>;
  pdcFaqs_connection?: Maybe<PdcFaqEntityResponseCollection>;
  pdcHomePage?: Maybe<PdcHomePage>;
  pdcSubcategories: Array<Maybe<PdcSubcategory>>;
  pdcSubcategories_connection?: Maybe<PdcSubcategoryEntityResponseCollection>;
  pdcSubcategory?: Maybe<PdcSubcategory>;
  pdcTemplate?: Maybe<PdcTemplate>;
  price?: Maybe<Price>;
  prices: Array<Maybe<Price>>;
  prices_connection?: Maybe<PriceEntityResponseCollection>;
  product?: Maybe<Product>;
  productencatalogus?: Maybe<Productencatalogus>;
  productencataloguses: Array<Maybe<Productencatalogus>>;
  productencataloguses_connection?: Maybe<ProductencatalogusEntityResponseCollection>;
  products: Array<Maybe<Product>>;
  products_connection?: Maybe<ProductEntityResponseCollection>;
  publisherAction?: Maybe<PublisherAction>;
  publisherActions: Array<Maybe<PublisherAction>>;
  publisherActions_connection?: Maybe<PublisherActionEntityResponseCollection>;
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>;
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>;
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>;
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>;
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>;
  uploadFile?: Maybe<UploadFile>;
  uploadFiles: Array<Maybe<UploadFile>>;
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRole>;
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>;
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUser>;
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>;
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  vac?: Maybe<Vac>;
  vacs: Array<Maybe<Vac>>;
  vacs_connection?: Maybe<VacEntityResponseCollection>;
  websiteSetting?: Maybe<WebsiteSetting>;
};


export type QueryAdditionalInformationArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAdditionalInformationsArgs = {
  filters?: InputMaybe<AdditionalInformationFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryAdditionalInformations_ConnectionArgs = {
  filters?: InputMaybe<AdditionalInformationFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationInternalArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationInternalsArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationInternals_ConnectionArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationPublicArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationPublicsArgs = {
  filters?: InputMaybe<ContactInformationPublicFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryContactInformationPublics_ConnectionArgs = {
  filters?: InputMaybe<ContactInformationPublicFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryEntityNotesNoteArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryEntityNotesNotesArgs = {
  filters?: InputMaybe<EntityNotesNoteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryEntityNotesNotes_ConnectionArgs = {
  filters?: InputMaybe<EntityNotesNoteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryInternalFieldArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryInternalFieldsArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryInternalFields_ConnectionArgs = {
  filters?: InputMaybe<InternalFieldFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryNotFoundPageArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOpenFormsErrorPageArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOpenFormsErrorPagesArgs = {
  filters?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryOpenFormsErrorPages_ConnectionArgs = {
  filters?: InputMaybe<OpenFormsErrorPageFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcCategoriesArgs = {
  filters?: InputMaybe<PdcCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcCategories_ConnectionArgs = {
  filters?: InputMaybe<PdcCategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcCategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcFaqArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcFaqsArgs = {
  filters?: InputMaybe<PdcFaqFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcFaqs_ConnectionArgs = {
  filters?: InputMaybe<PdcFaqFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcHomePageArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcSubcategoriesArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcSubcategories_ConnectionArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcSubcategoryArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPdcTemplateArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPriceArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPricesArgs = {
  filters?: InputMaybe<PriceFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPrices_ConnectionArgs = {
  filters?: InputMaybe<PriceFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductencatalogusArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductencatalogusesArgs = {
  filters?: InputMaybe<ProductencatalogusFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductencataloguses_ConnectionArgs = {
  filters?: InputMaybe<ProductencatalogusFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryPublisherActionArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryPublisherActionsArgs = {
  filters?: InputMaybe<PublisherActionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPublisherActions_ConnectionArgs = {
  filters?: InputMaybe<PublisherActionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input'];
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryVacArgs = {
  documentId: Scalars['ID']['input'];
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVacsArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryVacs_ConnectionArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PublicationStatus>;
};


export type QueryWebsiteSettingArgs = {
  hasPublishedVersion?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<PublicationStatus>;
};

export type ReviewWorkflowsWorkflow = {
  contentTypes: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>;
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>;
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  nodes: Array<ReviewWorkflowsWorkflow>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  contentTypes?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>;
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type ReviewWorkflowsWorkflowStage = {
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  workflow?: Maybe<ReviewWorkflowsWorkflow>;
};

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  nodes: Array<ReviewWorkflowsWorkflowStage>;
  pageInfo: Pagination;
};

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>;
};

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  workflow?: InputMaybe<Scalars['ID']['input']>;
};

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  nodes: Array<ReviewWorkflowsWorkflowStage>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFile = {
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  ext?: Maybe<Scalars['String']['output']>;
  focalPoint?: Maybe<Scalars['JSON']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntityResponseCollection = {
  nodes: Array<UploadFile>;
  pageInfo: Pagination;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  focalPoint?: InputMaybe<JsonFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UsersPermissionsCreateRolePayload = {
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  documentId: Scalars['ID']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  nodes: Array<UsersPermissionsPermission>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  documentId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<Maybe<UsersPermissionsPermission>>;
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users: Array<Maybe<UsersPermissionsUser>>;
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  nodes: Array<UsersPermissionsRole>;
  pageInfo: Pagination;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRole>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntityResponse = {
  data?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  nodes: Array<UsersPermissionsUser>;
  pageInfo: Pagination;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  provider?: InputMaybe<StringFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  nodes: Array<UsersPermissionsUser>;
};

export type Vac = {
  contact_information_internal: Array<Maybe<ContactInformationInternal>>;
  contact_information_internal_connection?: Maybe<ContactInformationInternalRelationResponseCollection>;
  contact_information_public?: Maybe<ContactInformationPublic>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  relatedProducts: Array<Maybe<Product>>;
  relatedProducts_connection?: Maybe<ProductRelationResponseCollection>;
  relatedVACs: Array<Maybe<Vac>>;
  relatedVACs_connection?: Maybe<VacRelationResponseCollection>;
  subcategories: Array<Maybe<PdcSubcategory>>;
  subcategories_connection?: Maybe<PdcSubcategoryRelationResponseCollection>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vac?: Maybe<ComponentComponentsVac>;
};


export type VacContact_Information_InternalArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacContact_Information_Internal_ConnectionArgs = {
  filters?: InputMaybe<ContactInformationInternalFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacRelatedProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacRelatedProducts_ConnectionArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacRelatedVaCsArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacRelatedVaCs_ConnectionArgs = {
  filters?: InputMaybe<VacFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacSubcategoriesArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type VacSubcategories_ConnectionArgs = {
  filters?: InputMaybe<PdcSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type VacEntityResponseCollection = {
  nodes: Array<Vac>;
  pageInfo: Pagination;
};

export type VacFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VacFiltersInput>>>;
  contact_information_internal?: InputMaybe<ContactInformationInternalFiltersInput>;
  contact_information_public?: InputMaybe<ContactInformationPublicFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  documentId?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<VacFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VacFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  relatedProducts?: InputMaybe<ProductFiltersInput>;
  relatedVACs?: InputMaybe<VacFiltersInput>;
  subcategories?: InputMaybe<PdcSubcategoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  vac?: InputMaybe<ComponentComponentsVacFiltersInput>;
};

export type VacInput = {
  contact_information_internal?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contact_information_public?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  relatedProducts?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  relatedVACs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  vac?: InputMaybe<ComponentComponentsVacInput>;
};

export type VacRelationResponseCollection = {
  nodes: Array<Vac>;
};

export type WebsiteSetting = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  documentId: Scalars['ID']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  triggerMatomoScript?: Maybe<ComponentComponentsTriggerMatomoScript>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type WebsiteSettingInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  triggerMatomoScript?: InputMaybe<ComponentComponentsTriggerMatomoScriptInput>;
};

export type GetAllProductsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllProductsQuery = { products_connection?: { pageInfo: { total: number, page: number, pageSize: number, pageCount: number }, nodes: Array<{ documentId: string, content?: string | null, title: string, slug: string, uuid?: string | null, locale?: string | null, updatedAt?: any | null, createdAt?: any | null, id: string, metaTags?: { keymatch: string, title: string, description: string } | null, sections?: Array<{ __typename: 'ComponentComponentsContactInformationPublic', contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null } | { __typename: 'ComponentComponentsFaq', categorie8?: Enum_Componentcomponentsfaq_Kennisartikelcategorie | null, pdc_faq?: { title?: string | null, faq?: Array<{ body?: string | null, headingLevel?: number | null, id: string, label?: string | null } | null> | null } | null } | { __typename: 'ComponentComponentsFloLegalForm' } | { __typename: 'ComponentComponentsInternalBlockContent', id: string, internal_field?: { title: string, id: string, contact_information_internal: Array<{ contentBlock?: Array<{ id: string, content: string } | null> | null } | null>, contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null, content?: { uuid?: string | null, keywords?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null } | { __typename: 'ComponentComponentsUtrechtAccordion', categorie9?: Enum_Componentcomponentsutrechtaccordion_Kennisartikelcategorie | null, item?: Array<{ body?: string | null, headingLevel?: number | null, id: string, label?: string | null } | null> | null } | { __typename: 'ComponentComponentsUtrechtImage', categorie2?: Enum_Componentcomponentsutrechtimage_Kennisartikelcategorie | null, imageData?: { name: string, alternativeText?: string | null, caption?: string | null, width?: number | null, height?: number | null, formats?: any | null, url: string } | null } | { __typename: 'ComponentComponentsUtrechtLink', href?: string | null, textContent?: string | null, icon?: Enum_Componentcomponentsutrechtlink_Icon | null, language?: string | null, categorie7?: Enum_Componentcomponentsutrechtlink_Kennisartikelcategorie | null } | { __typename: 'ComponentComponentsUtrechtLogoButton', appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null, categorie3?: Enum_Componentcomponentsutrechtlogobutton_Kennisartikelcategorie | null } | { __typename: 'ComponentComponentsUtrechtMultiColumnsButton', categorie6?: Enum_Componentcomponentsutrechtmulticolumnsbutton_Kennisartikelcategorie | null, column?: Array<{ id: string, title?: string | null, logoButton?: Array<{ appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null } | null> | null } | null> | null } | { __typename: 'ComponentComponentsUtrechtRichText', id: string, content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | { __typename: 'ComponentComponentsUtrechtSpotlight', content: string, type?: Enum_Componentcomponentsutrechtspotlight_Type | null, categorie4?: Enum_Componentcomponentsutrechtspotlight_Kennisartikelcategorie | null, logoButton?: Array<{ id: string, label?: string | null, href?: string | null, textContent?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null } | null> | null } | { __typename: 'Error' } | null> | null, additional_information?: { content?: { id: string, uuid?: string | null, contentBlock?: Array<{ id: string, content: string, categorie10?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null, price?: { price?: Array<{ currency: Enum_Componentcomponentsprice_Currency, id: string, label: string, uuid?: string | null, value: number } | null> | null } | null, kennisartikelMetadata?: { uuid?: string | null, doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep, productAanwezig: boolean, productValtOnder?: string | null, upnUri: string, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null, verantwoordelijkeOrganisatie?: { owmsIdentifier: string, owmsPrefLabel?: string | null, owmsEndDate: any } | null } | null }> } | null };

export type GetProductByUuidOrDocumentIdQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  documentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PublicationStatus>;
}>;


export type GetProductByUuidOrDocumentIdQuery = { products: Array<{ publishedAt?: any | null, content?: string | null, title: string, slug: string, uuid?: string | null, locale?: string | null, updatedAt?: any | null, createdAt?: any | null, id: string, metaTags?: { keymatch: string, title: string, description: string } | null, sections?: Array<{ component: 'ComponentComponentsContactInformationPublic', contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null } | { component: 'ComponentComponentsFaq', categorie8?: Enum_Componentcomponentsfaq_Kennisartikelcategorie | null, pdc_faq?: { title?: string | null, faq?: Array<{ body?: string | null, headingLevel?: number | null, id: string, label?: string | null } | null> | null } | null } | { id: string, component: 'ComponentComponentsInternalBlockContent', internal_field?: { title: string, id: string, contact_information_internal: Array<{ contentBlock?: Array<{ id: string, content: string } | null> | null } | null>, contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null, content?: { id: string, uuid?: string | null, keywords?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null } | { component: 'ComponentComponentsUtrechtAccordion', categorie9?: Enum_Componentcomponentsutrechtaccordion_Kennisartikelcategorie | null, item?: Array<{ body?: string | null, headingLevel?: number | null, id: string, label?: string | null } | null> | null } | { component: 'ComponentComponentsUtrechtImage', categorie2?: Enum_Componentcomponentsutrechtimage_Kennisartikelcategorie | null, imageData?: { name: string, alternativeText?: string | null, caption?: string | null, width?: number | null, height?: number | null, formats?: any | null, url: string } | null } | { href?: string | null, textContent?: string | null, icon?: Enum_Componentcomponentsutrechtlink_Icon | null, language?: string | null, component: 'ComponentComponentsUtrechtLink', categorie7?: Enum_Componentcomponentsutrechtlink_Kennisartikelcategorie | null } | { appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null, component: 'ComponentComponentsUtrechtLogoButton', categorie3?: Enum_Componentcomponentsutrechtlogobutton_Kennisartikelcategorie | null } | { component: 'ComponentComponentsUtrechtMultiColumnsButton', categorie6?: Enum_Componentcomponentsutrechtmulticolumnsbutton_Kennisartikelcategorie | null, column?: Array<{ id: string, title?: string | null, logoButton?: Array<{ appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null, component: 'ComponentComponentsUtrechtLogoButton' } | null> | null } | null> | null } | { id: string, content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText', categorie5?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | { content: string, type?: Enum_Componentcomponentsutrechtspotlight_Type | null, component: 'ComponentComponentsUtrechtSpotlight', categorie4?: Enum_Componentcomponentsutrechtspotlight_Kennisartikelcategorie | null, logoButton?: Array<{ __typename: 'ComponentComponentsUtrechtLogoButton', id: string, label?: string | null, href?: string | null, textContent?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null } | null> | null } | {} | null> | null, additional_information?: { content?: { id: string, uuid?: string | null, contentBlock?: Array<{ id: string, content: string, categorie10?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText' } | null> | null } | null } | null, price?: { price?: Array<{ currency: Enum_Componentcomponentsprice_Currency, id: string, label: string, uuid?: string | null, value: number } | null> | null } | null, kennisartikelMetadata?: { uuid?: string | null, doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep, productAanwezig: boolean, productValtOnder?: string | null, upnUri: string, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null, verantwoordelijkeOrganisatie?: { owmsIdentifier: string, owmsPrefLabel?: string | null, owmsEndDate: any } | null } | null } | null> };

export type GetProductForUpdateQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  documentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PublicationStatus>;
}>;


export type GetProductForUpdateQuery = { products: Array<{ publishedAt?: any | null, content?: string | null, title: string, slug: string, uuid?: string | null, locale?: string | null, updatedAt?: any | null, createdAt?: any | null, id: string, metaTags?: { keymatch: string, title: string, description: string } | null, sections?: Array<{ component: 'ComponentComponentsContactInformationPublic', contact_information_public?: { contentBlock?: Array<{ content: string } | null> | null } | null } | { component: 'ComponentComponentsFaq', categorie8?: Enum_Componentcomponentsfaq_Kennisartikelcategorie | null, pdc_faq?: { title?: string | null, faq?: Array<{ body?: string | null, headingLevel?: number | null, label?: string | null } | null> | null } | null } | { component: 'ComponentComponentsInternalBlockContent', internal_field?: { title: string, id: string, contact_information_internal: Array<{ contentBlock?: Array<{ content: string } | null> | null } | null>, contact_information_public?: { contentBlock?: Array<{ content: string } | null> | null } | null, content?: { uuid?: string | null, keywords?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null } | { component: 'ComponentComponentsUtrechtAccordion', categorie9?: Enum_Componentcomponentsutrechtaccordion_Kennisartikelcategorie | null, item?: Array<{ body?: string | null, headingLevel?: number | null, label?: string | null } | null> | null } | { component: 'ComponentComponentsUtrechtImage', categorie2?: Enum_Componentcomponentsutrechtimage_Kennisartikelcategorie | null, imageData?: { name: string, alternativeText?: string | null, caption?: string | null, width?: number | null, height?: number | null, formats?: any | null, url: string } | null } | { href?: string | null, textContent?: string | null, icon?: Enum_Componentcomponentsutrechtlink_Icon | null, language?: string | null, component: 'ComponentComponentsUtrechtLink', categorie7?: Enum_Componentcomponentsutrechtlink_Kennisartikelcategorie | null } | { appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null, component: 'ComponentComponentsUtrechtLogoButton', categorie3?: Enum_Componentcomponentsutrechtlogobutton_Kennisartikelcategorie | null } | { component: 'ComponentComponentsUtrechtMultiColumnsButton', categorie6?: Enum_Componentcomponentsutrechtmulticolumnsbutton_Kennisartikelcategorie | null, column?: Array<{ title?: string | null, logoButton?: Array<{ appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, href?: string | null, label?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, openFormsEmbed?: string | null, textContent?: string | null, component: 'ComponentComponentsUtrechtLogoButton' } | null> | null } | null> | null } | { content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText', categorie5?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | { content: string, type?: Enum_Componentcomponentsutrechtspotlight_Type | null, component: 'ComponentComponentsUtrechtSpotlight', categorie4?: Enum_Componentcomponentsutrechtspotlight_Kennisartikelcategorie | null, logoButton?: Array<{ __typename: 'ComponentComponentsUtrechtLogoButton', label?: string | null, href?: string | null, textContent?: string | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null } | null> | null } | {} | null> | null, additional_information?: { content?: { uuid?: string | null, contentBlock?: Array<{ id: string, content: string, categorie10?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText' } | null> | null } | null } | null, price?: { price?: Array<{ currency: Enum_Componentcomponentsprice_Currency, label: string, uuid?: string | null, value: number } | null> | null } | null, kennisartikelMetadata?: { uuid?: string | null, doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep, productAanwezig: boolean, productValtOnder?: string | null, upnUri: string, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null, verantwoordelijkeOrganisatie?: { owmsIdentifier: string, owmsPrefLabel?: string | null, owmsEndDate: any } | null } | null } | null> };

export type GetInternalFieldsQueryVariables = Exact<{
  uuid?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetInternalFieldsQuery = { internalFields: Array<{ title: string, id: string, content?: { uuid?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null> };

export type CreateInternalFieldMutationVariables = Exact<{
  data: InternalFieldInput;
}>;


export type CreateInternalFieldMutation = { createInternalField?: { title: string, id: string, content?: { id: string, uuid?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null };

export type UpdateInternalFieldMutationVariables = Exact<{
  data: InternalFieldInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateInternalFieldMutation = { updateInternalField?: { content?: { id: string, uuid?: string | null, contentBlock?: Array<{ content: string } | null> | null } | null } | null };

export type CreateKennisartikelMutationVariables = Exact<{
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type CreateKennisartikelMutation = { createProduct?: { content?: string | null, title: string, slug: string, uuid?: string | null, updatedAt?: any | null, createdAt?: any | null, locale?: string | null, id: string, metaTags?: { keymatch: string, title: string, description: string } | null, sections?: Array<{ id: string, component: 'ComponentComponentsInternalBlockContent', internal_field?: { title: string, id: string, content?: { uuid?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null } | { id: string, content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText' } | {} | null> | null, price?: { price?: Array<{ currency: Enum_Componentcomponentsprice_Currency, id: string, label: string, uuid?: string | null, value: number } | null> | null } | null, additional_information?: { content?: { id: string, uuid?: string | null, contentBlock?: Array<{ id: string, content: string, categorie10?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null, kennisartikelMetadata?: { uuid?: string | null, doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep, productAanwezig: boolean, productValtOnder?: string | null, upnUri: string, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null, verantwoordelijkeOrganisatie?: { owmsIdentifier: string, owmsPrefLabel?: string | null, owmsEndDate: any } | null } | null } | null };

export type UpdateKennisartikelMutationVariables = Exact<{
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  id: Scalars['ID']['input'];
}>;


export type UpdateKennisartikelMutation = { updateProduct?: { content?: string | null, title: string, slug: string, uuid?: string | null, locale?: string | null, updatedAt?: any | null, createdAt?: any | null, id: string, metaTags?: { keymatch: string, title: string, description: string } | null, sections?: Array<{ id: string, component: 'ComponentComponentsInternalBlockContent', internal_field?: { title: string, id: string, content?: { uuid?: string | null, contentBlock?: Array<{ content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null } | { id: string, content: string, kennisartikelCategorie?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null, component: 'ComponentComponentsUtrechtRichText' } | {} | null> | null, price?: { price?: Array<{ currency: Enum_Componentcomponentsprice_Currency, id: string, label: string, uuid?: string | null, value: number } | null> | null } | null, additional_information?: { content?: { id: string, uuid?: string | null, contentBlock?: Array<{ id: string, content: string, categorie10?: Enum_Componentcomponentsutrechtrichtext_Kennisartikelcategorie | null } | null> | null } | null } | null, kennisartikelMetadata?: { uuid?: string | null, doelgroep: Enum_Componentcomponentskennisartikel_Doelgroep, productAanwezig: boolean, productValtOnder?: string | null, upnUri: string, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null, verantwoordelijkeOrganisatie?: { owmsIdentifier: string, owmsPrefLabel?: string | null, owmsEndDate: any } | null } | null } | null };

export type GetAllVacItemsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllVacItemsQuery = { vacs_connection?: { pageInfo: { total: number, page: number, pageSize: number, pageCount: number }, nodes: Array<{ createdAt?: any | null, updatedAt?: any | null, title?: string | null, id: string, contact_information_internal: Array<{ contentBlock?: Array<{ id: string, content: string } | null> | null } | null>, contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null, relatedVACs: Array<{ vac?: { uuid?: string | null } | null } | null>, relatedProducts: Array<{ uuid?: string | null, title: string } | null>, vac?: { uuid?: string | null, vraag?: string | null, status?: Enum_Componentcomponentsvac_Status | null, doelgroep?: Enum_Componentcomponentsvac_Doelgroep | null, toelichting?: string | null, keywords?: string | null, antwoord?: Array<{ content?: string | null, kennisartikelCategorie?: Enum_Componentcomponentsantwoord_Kennisartikelcategorie | null } | null> | null, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null } | null }> } | null };

export type GetVacItemByUuidOrDocumentIdQueryVariables = Exact<{
  uuid?: InputMaybe<Scalars['String']['input']>;
  documentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PublicationStatus>;
}>;


export type GetVacItemByUuidOrDocumentIdQuery = { vacs: Array<{ createdAt?: any | null, updatedAt?: any | null, publishedAt?: any | null, title?: string | null, id: string, contact_information_internal: Array<{ contentBlock?: Array<{ id: string, content: string } | null> | null } | null>, contact_information_public?: { contentBlock?: Array<{ id: string, content: string } | null> | null } | null, relatedVACs: Array<{ vac?: { uuid?: string | null } | null } | null>, relatedProducts: Array<{ uuid?: string | null, title: string } | null>, vac?: { uuid?: string | null, vraag?: string | null, status?: Enum_Componentcomponentsvac_Status | null, doelgroep?: Enum_Componentcomponentsvac_Doelgroep | null, toelichting?: string | null, keywords?: string | null, antwoord?: Array<{ content?: string | null, kennisartikelCategorie?: Enum_Componentcomponentsantwoord_Kennisartikelcategorie | null } | null> | null, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null } | null } | null> };

export type CreateVacMutationVariables = Exact<{
  data: VacInput;
}>;


export type CreateVacMutation = { createVac?: { createdAt?: any | null, publishedAt?: any | null, title?: string | null, id: string, vac?: { id: string, status?: Enum_Componentcomponentsvac_Status | null, doelgroep?: Enum_Componentcomponentsvac_Doelgroep | null, uuid?: string | null, toelichting?: string | null, keywords?: string | null, antwoord?: Array<{ content?: string | null, kennisartikelCategorie?: Enum_Componentcomponentsantwoord_Kennisartikelcategorie | null } | null> | null, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null } | null } | null };

export type UpdateVacMutationVariables = Exact<{
  data: VacInput;
  id: Scalars['ID']['input'];
}>;


export type UpdateVacMutation = { updateVac?: { createdAt?: any | null, publishedAt?: any | null, title?: string | null, id: string, vac?: { id: string, status?: Enum_Componentcomponentsvac_Status | null, doelgroep?: Enum_Componentcomponentsvac_Doelgroep | null, uuid?: string | null, toelichting?: string | null, keywords?: string | null, antwoord?: Array<{ content?: string | null, kennisartikelCategorie?: Enum_Componentcomponentsantwoord_Kennisartikelcategorie | null } | null> | null, afdelingen?: Array<{ afdelingId: string, afdelingNaam: string } | null> | null } | null } | null };


export const GetAllProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products_connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsContactInformationPublic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsInternalBlockContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"internal_field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie2"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"imageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLogoButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie3"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtSpotlight"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie4"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtMultiColumnsButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie6"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie7"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsFaq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie8"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"pdc_faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"categorie9"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional_information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie10"},"name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"productAanwezig"}},{"kind":"Field","name":{"kind":"Name","value":"productValtOnder"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verantwoordelijkeOrganisatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owmsIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"owmsPrefLabel"}},{"kind":"Field","name":{"kind":"Name","value":"owmsEndDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upnUri"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetProductByUuidOrDocumentIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductByUUIDOrDocumentId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uuid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsContactInformationPublic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsInternalBlockContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"internal_field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie5"},"name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie2"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"imageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLogoButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie3"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtSpotlight"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie4"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtMultiColumnsButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie6"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie7"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsFaq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie8"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"pdc_faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie9"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional_information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie10"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"productAanwezig"}},{"kind":"Field","name":{"kind":"Name","value":"productValtOnder"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verantwoordelijkeOrganisatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owmsIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"owmsPrefLabel"}},{"kind":"Field","name":{"kind":"Name","value":"owmsEndDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upnUri"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductByUuidOrDocumentIdQuery, GetProductByUuidOrDocumentIdQueryVariables>;
export const GetProductForUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductForUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uuid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsContactInformationPublic"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsInternalBlockContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"internal_field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie5"},"name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie2"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"imageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLogoButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie3"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtSpotlight"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie4"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtMultiColumnsButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie6"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"openFormsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie7"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"language"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsFaq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie8"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"pdc_faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie9"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"headingLevel"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional_information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie10"},"name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"productAanwezig"}},{"kind":"Field","name":{"kind":"Name","value":"productValtOnder"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verantwoordelijkeOrganisatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owmsIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"owmsPrefLabel"}},{"kind":"Field","name":{"kind":"Name","value":"owmsEndDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upnUri"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductForUpdateQuery, GetProductForUpdateQueryVariables>;
export const GetInternalFieldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getInternalFields"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"internalFields"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uuid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetInternalFieldsQuery, GetInternalFieldsQueryVariables>;
export const CreateInternalFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createInternalField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InternalFieldInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInternalField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateInternalFieldMutation, CreateInternalFieldMutationVariables>;
export const UpdateInternalFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInternalField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InternalFieldInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInternalField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInternalFieldMutation, UpdateInternalFieldMutationVariables>;
export const CreateKennisartikelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createKennisartikel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsInternalBlockContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"internal_field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional_information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie10"},"name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"productAanwezig"}},{"kind":"Field","name":{"kind":"Name","value":"productValtOnder"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verantwoordelijkeOrganisatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owmsIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"owmsPrefLabel"}},{"kind":"Field","name":{"kind":"Name","value":"owmsEndDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upnUri"}}]}}]}}]}}]} as unknown as DocumentNode<CreateKennisartikelMutation, CreateKennisartikelMutationVariables>;
export const UpdateKennisartikelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateKennisartikel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsInternalBlockContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"component"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"internal_field"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional_information"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","alias":{"kind":"Name","value":"categorie10"},"name":{"kind":"Name","value":"kennisartikelCategorie"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"productAanwezig"}},{"kind":"Field","name":{"kind":"Name","value":"productValtOnder"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"verantwoordelijkeOrganisatie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owmsIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"owmsPrefLabel"}},{"kind":"Field","name":{"kind":"Name","value":"owmsEndDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upnUri"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateKennisartikelMutation, UpdateKennisartikelMutationVariables>;
export const GetAllVacItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllVacItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vacs_connection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedVACs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"vraag"}},{"kind":"Field","name":{"kind":"Name","value":"antwoord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toelichting"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllVacItemsQuery, GetAllVacItemsQueryVariables>;
export const GetVacItemByUuidOrDocumentIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVacItemByUUIDOrDocumentId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vacs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"or"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"vac"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uuid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}]}}]}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"documentId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"documentId"}}}]}}]}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_internal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact_information_public"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentBlock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedVACs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"vraag"}},{"kind":"Field","name":{"kind":"Name","value":"antwoord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toelichting"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}}]} as unknown as DocumentNode<GetVacItemByUuidOrDocumentIdQuery, GetVacItemByUuidOrDocumentIdQueryVariables>;
export const CreateVacDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createVac"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VacInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVac"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"antwoord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"toelichting"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}}]} as unknown as DocumentNode<CreateVacMutation, CreateVacMutationVariables>;
export const UpdateVacDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateVac"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VacInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVac"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"documentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"documentId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"vac"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"antwoord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"-1"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"kennisartikelCategorie"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"doelgroep"}},{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"toelichting"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"afdelingId"}},{"kind":"Field","name":{"kind":"Name","value":"afdelingNaam"}}]}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateVacMutation, UpdateVacMutationVariables>;