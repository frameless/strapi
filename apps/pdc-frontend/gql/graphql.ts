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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  ProductSectionsDynamicZoneInput: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
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

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  subcategories?: Maybe<SubcategoryRelationResponseCollection>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CategorySubcategoriesArgs = {
  filters?: InputMaybe<SubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  subcategories?: InputMaybe<SubcategoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsAudience = {
  __typename?: 'ComponentComponentsAudience';
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
  __typename?: 'ComponentComponentsCatalogiMeta';
  abstract: Scalars['String']['output'];
  audience: Array<Maybe<ComponentComponentsAudience>>;
  authority: ComponentComponentsSpatial;
  id: Scalars['ID']['output'];
  onlineRequest: ComponentComponentsOnlineRequest;
  spatial: ComponentComponentsSpatial;
  uniformProductName?: Maybe<Scalars['String']['output']>;
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
  uniformProductName?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsCatalogiMetaInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  audience?: InputMaybe<Array<InputMaybe<ComponentComponentsAudienceInput>>>;
  authority?: InputMaybe<ComponentComponentsSpatialInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  onlineRequest?: InputMaybe<ComponentComponentsOnlineRequestInput>;
  spatial?: InputMaybe<ComponentComponentsSpatialInput>;
  uniformProductName?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsContact = {
  __typename?: 'ComponentComponentsContact';
  id: Scalars['ID']['output'];
};

export type ComponentComponentsContactFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsContactFiltersInput>>>;
  email?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsContactFiltersInput>>>;
};

export type ComponentComponentsContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsEForm = {
  __typename?: 'ComponentComponentsEForm';
  id: Scalars['ID']['output'];
};

export type ComponentComponentsEFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsEFormFiltersInput>>>;
  eFormURL?: InputMaybe<ComponentComponentsUrlFiltersInput>;
  linkedEForm?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsEFormFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsEFormFiltersInput>>>;
};

export type ComponentComponentsEFormInput = {
  eFormURL?: InputMaybe<Array<InputMaybe<ComponentComponentsUrlInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  linkedEForm?: InputMaybe<Enum_Componentcomponentseform_Linkedeform>;
};

export type ComponentComponentsFaq = {
  __typename?: 'ComponentComponentsFaq';
  faq?: Maybe<FaqEntityResponse>;
  id: Scalars['ID']['output'];
};

export type ComponentComponentsIdentificationMethod = {
  __typename?: 'ComponentComponentsIdentificationMethod';
  id: Scalars['ID']['output'];
  method?: Maybe<Enum_Componentcomponentsidentificationmethod_Method>;
};

export type ComponentComponentsIdentificationMethodFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsIdentificationMethodFiltersInput>>>;
  method?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsIdentificationMethodFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsIdentificationMethodFiltersInput>>>;
};

export type ComponentComponentsIdentificationMethodInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  method?: InputMaybe<Enum_Componentcomponentsidentificationmethod_Method>;
};

export type ComponentComponentsMetadata = {
  __typename?: 'ComponentComponentsMetadata';
  eForm?: Maybe<ComponentComponentsEForm>;
  id: Scalars['ID']['output'];
  identificationMethod?: Maybe<Array<Maybe<ComponentComponentsIdentificationMethod>>>;
};


export type ComponentComponentsMetadataIdentificationMethodArgs = {
  filters?: InputMaybe<ComponentComponentsIdentificationMethodFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsMetadataFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsMetadataFiltersInput>>>;
  attachementAdded?: InputMaybe<StringFilterInput>;
  contact?: InputMaybe<ComponentComponentsContactFiltersInput>;
  eForm?: InputMaybe<ComponentComponentsEFormFiltersInput>;
  identificationMethod?: InputMaybe<ComponentComponentsIdentificationMethodFiltersInput>;
  not?: InputMaybe<ComponentComponentsMetadataFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsMetadataFiltersInput>>>;
  singleDigitalGateway?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsMetadataInput = {
  attachementAdded?: InputMaybe<Enum_Componentcomponentsmetadata_Attachementadded>;
  contact?: InputMaybe<Array<InputMaybe<ComponentComponentsContactInput>>>;
  eForm?: InputMaybe<ComponentComponentsEFormInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  identificationMethod?: InputMaybe<Array<InputMaybe<ComponentComponentsIdentificationMethodInput>>>;
  singleDigitalGateway?: InputMaybe<Enum_Componentcomponentsmetadata_Singledigitalgateway>;
};

export type ComponentComponentsOnlineRequest = {
  __typename?: 'ComponentComponentsOnlineRequest';
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
  __typename?: 'ComponentComponentsPrice';
  currency: Enum_Componentcomponentsprice_Currency;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type ComponentComponentsPriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceFiltersInput>>>;
  currency?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceFiltersInput>>>;
  value?: InputMaybe<FloatFilterInput>;
};

export type ComponentComponentsPriceInput = {
  currency?: InputMaybe<Enum_Componentcomponentsprice_Currency>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type ComponentComponentsSpatial = {
  __typename?: 'ComponentComponentsSpatial';
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

export type ComponentComponentsUrl = {
  __typename?: 'ComponentComponentsUrl';
  id: Scalars['ID']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUrlFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUrlFiltersInput>>>;
  not?: InputMaybe<ComponentComponentsUrlFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUrlFiltersInput>>>;
  value?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUrlInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsUtrechtAccordion = {
  __typename?: 'ComponentComponentsUtrechtAccordion';
  id: Scalars['ID']['output'];
  item?: Maybe<Array<Maybe<ComponentComponentsUtrechtAccordionSection>>>;
};


export type ComponentComponentsUtrechtAccordionItemArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtAccordionSection = {
  __typename?: 'ComponentComponentsUtrechtAccordionSection';
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
};

export type ComponentComponentsUtrechtAccordionSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>>>;
};

export type ComponentComponentsUtrechtAccordionSectionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentComponentsUtrechtImage = {
  __typename?: 'ComponentComponentsUtrechtImage';
  id: Scalars['ID']['output'];
  imageData?: Maybe<UploadFileEntityResponse>;
};

export type ComponentComponentsUtrechtLink = {
  __typename?: 'ComponentComponentsUtrechtLink';
  href: Scalars['String']['output'];
  icon?: Maybe<Enum_Componentcomponentsutrechtlink_Icon>;
  id: Scalars['ID']['output'];
  textContent: Scalars['String']['output'];
};

export type ComponentComponentsUtrechtLogoButton = {
  __typename?: 'ComponentComponentsUtrechtLogoButton';
  appearance?: Maybe<Enum_Componentcomponentsutrechtlogobutton_Appearance>;
  href: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Enum_Componentcomponentsutrechtlogobutton_Logo>;
  textContent: Scalars['String']['output'];
};

export type ComponentComponentsUtrechtLogoButtonFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>>>;
  appearance?: InputMaybe<StringFilterInput>;
  href?: InputMaybe<StringFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  logo?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>>>;
  textContent?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtMultiColumnsButton = {
  __typename?: 'ComponentComponentsUtrechtMultiColumnsButton';
  column?: Maybe<Array<Maybe<ComponentComponentsUtrechtMultiColumnsButtonItem>>>;
  id: Scalars['ID']['output'];
};


export type ComponentComponentsUtrechtMultiColumnsButtonColumnArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentComponentsUtrechtMultiColumnsButtonItem = {
  __typename?: 'ComponentComponentsUtrechtMultiColumnsButtonItem';
  id: Scalars['ID']['output'];
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
  logoButton?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  not?: InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtMultiColumnsButtonItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentComponentsUtrechtRichText = {
  __typename?: 'ComponentComponentsUtrechtRichText';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type ComponentComponentsUtrechtSpotlight = {
  __typename?: 'ComponentComponentsUtrechtSpotlight';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logoButton?: Maybe<Array<Maybe<ComponentComponentsUtrechtLogoButton>>>;
  type?: Maybe<Enum_Componentcomponentsutrechtspotlight_Type>;
};


export type ComponentComponentsUtrechtSpotlightLogoButtonArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtLogoButtonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ComponentSeoMeta = {
  __typename?: 'ComponentSeoMeta';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keymatch: Scalars['String']['output'];
  ogImage?: Maybe<UploadFileEntityResponse>;
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

export enum Enum_Componentcomponentsaudience_Type {
  Ondernemer = 'ondernemer',
  Particulier = 'particulier'
}

export enum Enum_Componentcomponentseform_Linkedeform {
  Ja = 'ja',
  Nee = 'nee'
}

export enum Enum_Componentcomponentsidentificationmethod_Method {
  Digid = 'digid',
  Eherkenning = 'eherkenning',
  Eidas = 'eidas'
}

export enum Enum_Componentcomponentsmetadata_Attachementadded {
  Ja = 'ja',
  Nee = 'nee'
}

export enum Enum_Componentcomponentsmetadata_Singledigitalgateway {
  Ja = 'ja',
  Nee = 'nee'
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

export enum Enum_Componentcomponentsutrechtlink_Icon {
  Arrow = 'arrow'
}

export enum Enum_Componentcomponentsutrechtlogobutton_Appearance {
  Magenta = 'magenta',
  PrimaryActionButton = 'primary_action_button',
  SecondaryActionButton = 'secondary_action_button'
}

export enum Enum_Componentcomponentsutrechtlogobutton_Logo {
  Digid = 'digid',
  Eherkenning = 'eherkenning',
  Eidas = 'eidas',
  WithoutLogo = 'without_logo'
}

export enum Enum_Componentcomponentsutrechtspotlight_Type {
  Gray = 'gray',
  Info = 'info',
  Warning = 'warning'
}

export type EntityNotesNote = {
  __typename?: 'EntityNotesNote';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['Int']['output']>;
  entitySlug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityNotesNoteEntity = {
  __typename?: 'EntityNotesNoteEntity';
  attributes?: Maybe<EntityNotesNote>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type EntityNotesNoteEntityResponse = {
  __typename?: 'EntityNotesNoteEntityResponse';
  data?: Maybe<EntityNotesNoteEntity>;
};

export type EntityNotesNoteEntityResponseCollection = {
  __typename?: 'EntityNotesNoteEntityResponseCollection';
  data: Array<EntityNotesNoteEntity>;
  meta: ResponseCollectionMeta;
};

export type EntityNotesNoteFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EntityNotesNoteFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  entityId?: InputMaybe<IntFilterInput>;
  entitySlug?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EntityNotesNoteFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EntityNotesNoteFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EntityNotesNoteInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  entityId?: InputMaybe<Scalars['Int']['input']>;
  entitySlug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type Faq = {
  __typename?: 'Faq';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  faq?: Maybe<Array<Maybe<ComponentComponentsUtrechtAccordionSection>>>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<FaqRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type FaqFaqArgs = {
  filters?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type FaqLocalizationsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FaqEntity = {
  __typename?: 'FaqEntity';
  attributes?: Maybe<Faq>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FaqEntityResponse = {
  __typename?: 'FaqEntityResponse';
  data?: Maybe<FaqEntity>;
};

export type FaqEntityResponseCollection = {
  __typename?: 'FaqEntityResponseCollection';
  data: Array<FaqEntity>;
  meta: ResponseCollectionMeta;
};

export type FaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  faq?: InputMaybe<ComponentComponentsUtrechtAccordionSectionFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<FaqFiltersInput>;
  not?: InputMaybe<FaqFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FaqInput = {
  faq?: InputMaybe<Array<InputMaybe<ComponentComponentsUtrechtAccordionSectionInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FaqRelationResponseCollection = {
  __typename?: 'FaqRelationResponseCollection';
  data: Array<FaqEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Union Type of all registered slug content types */
export type FindSlugResponse = ProductEntityResponse;

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

export type GenericMorph = Category | ComponentComponentsAudience | ComponentComponentsCatalogiMeta | ComponentComponentsContact | ComponentComponentsEForm | ComponentComponentsFaq | ComponentComponentsIdentificationMethod | ComponentComponentsMetadata | ComponentComponentsOnlineRequest | ComponentComponentsPrice | ComponentComponentsSpatial | ComponentComponentsUrl | ComponentComponentsUtrechtAccordion | ComponentComponentsUtrechtAccordionSection | ComponentComponentsUtrechtImage | ComponentComponentsUtrechtLink | ComponentComponentsUtrechtLogoButton | ComponentComponentsUtrechtMultiColumnsButton | ComponentComponentsUtrechtMultiColumnsButtonItem | ComponentComponentsUtrechtRichText | ComponentComponentsUtrechtSpotlight | ComponentSeoMeta | EntityNotesNote | Faq | I18NLocale | NotFoundPage | Price | Product | PublisherAction | SlugifySlug | Subcategory | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
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
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createEntityNotesNote?: Maybe<EntityNotesNoteEntityResponse>;
  createFaq?: Maybe<FaqEntityResponse>;
  createFaqLocalization?: Maybe<FaqEntityResponse>;
  createNotFoundPageLocalization?: Maybe<NotFoundPageEntityResponse>;
  createPrice?: Maybe<PriceEntityResponse>;
  createProduct?: Maybe<ProductEntityResponse>;
  createProductLocalization?: Maybe<ProductEntityResponse>;
  createPublisherAction?: Maybe<PublisherActionEntityResponse>;
  createSlugifySlug?: Maybe<SlugifySlugEntityResponse>;
  createSubcategory?: Maybe<SubcategoryEntityResponse>;
  createSubcategoryLocalization?: Maybe<SubcategoryEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteEntityNotesNote?: Maybe<EntityNotesNoteEntityResponse>;
  deleteFaq?: Maybe<FaqEntityResponse>;
  deleteNotFoundPage?: Maybe<NotFoundPageEntityResponse>;
  deletePrice?: Maybe<PriceEntityResponse>;
  deleteProduct?: Maybe<ProductEntityResponse>;
  deletePublisherAction?: Maybe<PublisherActionEntityResponse>;
  deleteSlugifySlug?: Maybe<SlugifySlugEntityResponse>;
  deleteSubcategory?: Maybe<SubcategoryEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateEntityNotesNote?: Maybe<EntityNotesNoteEntityResponse>;
  updateFaq?: Maybe<FaqEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateNotFoundPage?: Maybe<NotFoundPageEntityResponse>;
  updatePrice?: Maybe<PriceEntityResponse>;
  updateProduct?: Maybe<ProductEntityResponse>;
  updatePublisherAction?: Maybe<PublisherActionEntityResponse>;
  updateSlugifySlug?: Maybe<SlugifySlugEntityResponse>;
  updateSubcategory?: Maybe<SubcategoryEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateEntityNotesNoteArgs = {
  data: EntityNotesNoteInput;
};


export type MutationCreateFaqArgs = {
  data: FaqInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateFaqLocalizationArgs = {
  data?: InputMaybe<FaqInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateNotFoundPageLocalizationArgs = {
  data?: InputMaybe<NotFoundPageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePriceArgs = {
  data: PriceInput;
};


export type MutationCreateProductArgs = {
  data: ProductInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateProductLocalizationArgs = {
  data?: InputMaybe<ProductInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreatePublisherActionArgs = {
  data: PublisherActionInput;
};


export type MutationCreateSlugifySlugArgs = {
  data: SlugifySlugInput;
};


export type MutationCreateSubcategoryArgs = {
  data: SubcategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateSubcategoryLocalizationArgs = {
  data?: InputMaybe<SubcategoryInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEntityNotesNoteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFaqArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteNotFoundPageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePriceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeletePublisherActionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSlugifySlugArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSubcategoryArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
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


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEntityNotesNoteArgs = {
  data: EntityNotesNoteInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFaqArgs = {
  data: FaqInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateNotFoundPageArgs = {
  data: NotFoundPageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdatePriceArgs = {
  data: PriceInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  data: ProductInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdatePublisherActionArgs = {
  data: PublisherActionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSlugifySlugArgs = {
  data: SlugifySlugInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateSubcategoryArgs = {
  data: SubcategoryInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type NotFoundPage = {
  __typename?: 'NotFoundPage';
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<NotFoundPageRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type NotFoundPageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type NotFoundPageEntity = {
  __typename?: 'NotFoundPageEntity';
  attributes?: Maybe<NotFoundPage>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type NotFoundPageEntityResponse = {
  __typename?: 'NotFoundPageEntityResponse';
  data?: Maybe<NotFoundPageEntity>;
};

export type NotFoundPageInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NotFoundPageRelationResponseCollection = {
  __typename?: 'NotFoundPageRelationResponseCollection';
  data: Array<NotFoundPageEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
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

export type Price = {
  __typename?: 'Price';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  price?: Maybe<Array<Maybe<ComponentComponentsPrice>>>;
  products?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PricePriceArgs = {
  filters?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type PriceProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PriceEntity = {
  __typename?: 'PriceEntity';
  attributes?: Maybe<Price>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PriceEntityResponse = {
  __typename?: 'PriceEntityResponse';
  data?: Maybe<PriceEntity>;
};

export type PriceEntityResponseCollection = {
  __typename?: 'PriceEntityResponseCollection';
  data: Array<PriceEntity>;
  meta: ResponseCollectionMeta;
};

export type PriceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PriceFiltersInput>>>;
  price?: InputMaybe<ComponentComponentsPriceFiltersInput>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PriceInput = {
  price?: InputMaybe<Array<InputMaybe<ComponentComponentsPriceInput>>>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  catalogiMeta?: Maybe<ComponentComponentsCatalogiMeta>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<ProductRelationResponseCollection>;
  metaTags?: Maybe<ComponentSeoMeta>;
  price?: Maybe<PriceEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sections?: Maybe<Array<Maybe<ProductSectionsDynamicZone>>>;
  slug: Scalars['String']['output'];
  subcategories?: Maybe<SubcategoryRelationResponseCollection>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ProductLocalizationsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type ProductSubcategoriesArgs = {
  filters?: InputMaybe<SubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  attributes?: Maybe<Product>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ProductEntityResponse = {
  __typename?: 'ProductEntityResponse';
  data?: Maybe<ProductEntity>;
};

export type ProductEntityResponseCollection = {
  __typename?: 'ProductEntityResponseCollection';
  data: Array<ProductEntity>;
  meta: ResponseCollectionMeta;
};

export type ProductFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  catalogiMeta?: InputMaybe<ComponentComponentsCatalogiMetaFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ProductFiltersInput>;
  metaTags?: InputMaybe<ComponentSeoMetaFiltersInput>;
  metadata?: InputMaybe<ComponentComponentsMetadataFiltersInput>;
  not?: InputMaybe<ProductFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProductFiltersInput>>>;
  price?: InputMaybe<PriceFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  subcategories?: InputMaybe<SubcategoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProductInput = {
  catalogiMeta?: InputMaybe<ComponentComponentsCatalogiMetaInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  metaTags?: InputMaybe<ComponentSeoMetaInput>;
  metadata?: InputMaybe<ComponentComponentsMetadataInput>;
  price?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sections?: InputMaybe<Array<Scalars['ProductSectionsDynamicZoneInput']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProductRelationResponseCollection = {
  __typename?: 'ProductRelationResponseCollection';
  data: Array<ProductEntity>;
};

export type ProductSectionsDynamicZone = ComponentComponentsFaq | ComponentComponentsUtrechtAccordion | ComponentComponentsUtrechtImage | ComponentComponentsUtrechtLink | ComponentComponentsUtrechtLogoButton | ComponentComponentsUtrechtMultiColumnsButton | ComponentComponentsUtrechtRichText | ComponentComponentsUtrechtSpotlight | Error;

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type PublisherAction = {
  __typename?: 'PublisherAction';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  entityId?: Maybe<Scalars['Int']['output']>;
  entitySlug?: Maybe<Scalars['String']['output']>;
  executeAt?: Maybe<Scalars['DateTime']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PublisherActionEntity = {
  __typename?: 'PublisherActionEntity';
  attributes?: Maybe<PublisherAction>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PublisherActionEntityResponse = {
  __typename?: 'PublisherActionEntityResponse';
  data?: Maybe<PublisherActionEntity>;
};

export type PublisherActionEntityResponseCollection = {
  __typename?: 'PublisherActionEntityResponseCollection';
  data: Array<PublisherActionEntity>;
  meta: ResponseCollectionMeta;
};

export type PublisherActionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  entityId?: InputMaybe<IntFilterInput>;
  entitySlug?: InputMaybe<StringFilterInput>;
  executeAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mode?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PublisherActionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PublisherActionFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PublisherActionInput = {
  entityId?: InputMaybe<Scalars['Int']['input']>;
  entitySlug?: InputMaybe<Scalars['String']['input']>;
  executeAt?: InputMaybe<Scalars['DateTime']['input']>;
  mode?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  entityNotesNote?: Maybe<EntityNotesNoteEntityResponse>;
  entityNotesNotes?: Maybe<EntityNotesNoteEntityResponseCollection>;
  faq?: Maybe<FaqEntityResponse>;
  faqs?: Maybe<FaqEntityResponseCollection>;
  findSlug?: Maybe<FindSlugResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  notFoundPage?: Maybe<NotFoundPageEntityResponse>;
  price?: Maybe<PriceEntityResponse>;
  prices?: Maybe<PriceEntityResponseCollection>;
  product?: Maybe<ProductEntityResponse>;
  products?: Maybe<ProductEntityResponseCollection>;
  publisherAction?: Maybe<PublisherActionEntityResponse>;
  publisherActions?: Maybe<PublisherActionEntityResponseCollection>;
  slugifySlug?: Maybe<SlugifySlugEntityResponse>;
  slugifySlugs?: Maybe<SlugifySlugEntityResponseCollection>;
  subcategories?: Maybe<SubcategoryEntityResponseCollection>;
  subcategory?: Maybe<SubcategoryEntityResponse>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEntityNotesNoteArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEntityNotesNotesArgs = {
  filters?: InputMaybe<EntityNotesNoteFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryFaqArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryFindSlugArgs = {
  modelName?: InputMaybe<Scalars['String']['input']>;
  publicationState?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryNotFoundPageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryPriceArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPricesArgs = {
  filters?: InputMaybe<PriceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPublisherActionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPublisherActionsArgs = {
  filters?: InputMaybe<PublisherActionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySlugifySlugArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySlugifySlugsArgs = {
  filters?: InputMaybe<SlugifySlugFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySubcategoriesArgs = {
  filters?: InputMaybe<SubcategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QuerySubcategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type SlugifySlug = {
  __typename?: 'SlugifySlug';
  count?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SlugifySlugEntity = {
  __typename?: 'SlugifySlugEntity';
  attributes?: Maybe<SlugifySlug>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type SlugifySlugEntityResponse = {
  __typename?: 'SlugifySlugEntityResponse';
  data?: Maybe<SlugifySlugEntity>;
};

export type SlugifySlugEntityResponseCollection = {
  __typename?: 'SlugifySlugEntityResponseCollection';
  data: Array<SlugifySlugEntity>;
  meta: ResponseCollectionMeta;
};

export type SlugifySlugFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SlugifySlugFiltersInput>>>;
  count?: InputMaybe<IntFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<SlugifySlugFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SlugifySlugFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SlugifySlugInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
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

export type Subcategory = {
  __typename?: 'Subcategory';
  category?: Maybe<CategoryEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<SubcategoryRelationResponseCollection>;
  products?: Maybe<ProductRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type SubcategoryLocalizationsArgs = {
  filters?: InputMaybe<SubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type SubcategoryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SubcategoryEntity = {
  __typename?: 'SubcategoryEntity';
  attributes?: Maybe<Subcategory>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type SubcategoryEntityResponse = {
  __typename?: 'SubcategoryEntityResponse';
  data?: Maybe<SubcategoryEntity>;
};

export type SubcategoryEntityResponseCollection = {
  __typename?: 'SubcategoryEntityResponseCollection';
  data: Array<SubcategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type SubcategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SubcategoryFiltersInput>>>;
  category?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<SubcategoryFiltersInput>;
  not?: InputMaybe<SubcategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SubcategoryFiltersInput>>>;
  products?: InputMaybe<ProductFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SubcategoryInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  products?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SubcategoryRelationResponseCollection = {
  __typename?: 'SubcategoryRelationResponseCollection';
  data: Array<SubcategoryEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetAllProductsSlugQueryQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllProductsSlugQueryQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } }, data: Array<{ __typename?: 'ProductEntity', attributes?: { __typename?: 'Product', slug: string, title: string, locale?: string | null, updatedAt?: any | null, metaTags?: { __typename?: 'ComponentSeoMeta', description: string } | null } | null }> } | null };

export type GetAlphabeticallyProductsByLetterQueryQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAlphabeticallyProductsByLetterQueryQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, page: number, pageSize: number, pageCount: number } }, data: Array<{ __typename?: 'ProductEntity', attributes?: { __typename?: 'Product', slug: string, title: string, locale?: string | null, updatedAt?: any | null, metaTags?: { __typename?: 'ComponentSeoMeta', description: string } | null } | null }> } | null };

export type CheckAlphabeticallyProductsAvailabilityQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
}>;


export type CheckAlphabeticallyProductsAvailabilityQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', data: Array<{ __typename?: 'ProductEntity', attributes?: { __typename?: 'Product', title: string } | null }> } | null };

export type GetSamenwerkendecatalogiQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetSamenwerkendecatalogiQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', data: Array<{ __typename?: 'ProductEntity', id?: string | null, attributes?: { __typename?: 'Product', title: string, slug: string, locale?: string | null, updatedAt?: any | null, catalogiMeta?: { __typename?: 'ComponentComponentsCatalogiMeta', uniformProductName?: string | null, abstract: string, spatial: { __typename?: 'ComponentComponentsSpatial', scheme: string, resourceIdentifier?: string | null }, authority: { __typename?: 'ComponentComponentsSpatial', scheme: string, resourceIdentifier?: string | null }, audience: Array<{ __typename?: 'ComponentComponentsAudience', id: string, type: Enum_Componentcomponentsaudience_Type } | null>, onlineRequest: { __typename?: 'ComponentComponentsOnlineRequest', type: Enum_Componentcomponentsonlinerequest_Type } } | null } | null }> } | null };

export type GetProductBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pageMode?: InputMaybe<PublicationState>;
}>;


export type GetProductBySlugQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', data: Array<{ __typename?: 'ProductEntity', id?: string | null, attributes?: { __typename?: 'Product', title: string, slug: string, content?: string | null, locale?: string | null, metaTags?: { __typename?: 'ComponentSeoMeta', title: string, description: string, keymatch: string, ogImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentComponentsFaq', faq?: { __typename?: 'FaqEntityResponse', data?: { __typename?: 'FaqEntity', attributes?: { __typename?: 'Faq', title?: string | null, faq?: Array<{ __typename?: 'ComponentComponentsUtrechtAccordionSection', id: string, label?: string | null, body?: string | null } | null> | null } | null } | null } | null } | { __typename: 'ComponentComponentsUtrechtAccordion', item?: Array<{ __typename?: 'ComponentComponentsUtrechtAccordionSection', id: string, label?: string | null, body?: string | null } | null> | null } | { __typename: 'ComponentComponentsUtrechtImage', imageData?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', name: string, alternativeText?: string | null, caption?: string | null, width?: number | null, height?: number | null, formats?: any | null, url: string } | null } | null } | null } | { __typename: 'ComponentComponentsUtrechtLink', href: string, textContent: string, iconList?: Enum_Componentcomponentsutrechtlink_Icon | null } | { __typename: 'ComponentComponentsUtrechtLogoButton', label?: string | null, href: string, textContent: string, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null } | { __typename: 'ComponentComponentsUtrechtMultiColumnsButton', column?: Array<{ __typename?: 'ComponentComponentsUtrechtMultiColumnsButtonItem', id: string, title?: string | null, logoButton?: Array<{ __typename: 'ComponentComponentsUtrechtLogoButton', label?: string | null, href: string, textContent: string, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null } | null> | null } | null> | null } | { __typename: 'ComponentComponentsUtrechtRichText', content: string } | { __typename: 'ComponentComponentsUtrechtSpotlight', content: string, type?: Enum_Componentcomponentsutrechtspotlight_Type | null, logoButton?: Array<{ __typename: 'ComponentComponentsUtrechtLogoButton', id: string, label?: string | null, href: string, textContent: string, logo?: Enum_Componentcomponentsutrechtlogobutton_Logo | null, appearance?: Enum_Componentcomponentsutrechtlogobutton_Appearance | null } | null> | null } | { __typename?: 'Error' } | null> | null, price?: { __typename?: 'PriceEntityResponse', data?: { __typename?: 'PriceEntity', attributes?: { __typename?: 'Price', price?: Array<{ __typename?: 'ComponentComponentsPrice', id: string, label: string, value: number, currency: Enum_Componentcomponentsprice_Currency } | null> | null } | null } | null } | null, localizations?: { __typename?: 'ProductRelationResponseCollection', data: Array<{ __typename?: 'ProductEntity', attributes?: { __typename?: 'Product', locale?: string | null, slug: string } | null }> } | null } | null }> } | null };

export type GetProductBySlugAndLocaleQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pageMode?: InputMaybe<PublicationState>;
}>;


export type GetProductBySlugAndLocaleQuery = { __typename?: 'Query', products?: { __typename?: 'ProductEntityResponseCollection', data: Array<{ __typename?: 'ProductEntity', attributes?: { __typename?: 'Product', slug: string, locale?: string | null } | null }> } | null };

export type GetNotFoundPageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
}>;


export type GetNotFoundPageQuery = { __typename?: 'Query', notFoundPage?: { __typename?: 'NotFoundPageEntityResponse', data?: { __typename?: 'NotFoundPageEntity', attributes?: { __typename?: 'NotFoundPage', title?: string | null, body?: string | null } | null } | null } | null };


export const GetAllProductsSlugQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllProductsSlugQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllProductsSlugQueryQuery, GetAllProductsSlugQueryQueryVariables>;
export const GetAlphabeticallyProductsByLetterQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlphabeticallyProductsByLetterQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startsWith"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startsWith"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startsWith"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAlphabeticallyProductsByLetterQueryQuery, GetAlphabeticallyProductsByLetterQueryQueryVariables>;
export const CheckAlphabeticallyProductsAvailabilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkAlphabeticallyProductsAvailability"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startsWith"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"startsWith"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startsWith"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CheckAlphabeticallyProductsAvailabilityQuery, CheckAlphabeticallyProductsAvailabilityQueryVariables>;
export const GetSamenwerkendecatalogiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSamenwerkendecatalogi"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"catalogiMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniformProductName"}},{"kind":"Field","name":{"kind":"Name","value":"abstract"}},{"kind":"Field","name":{"kind":"Name","value":"spatial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheme"}},{"kind":"Field","name":{"kind":"Name","value":"resourceIdentifier"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authority"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheme"}},{"kind":"Field","name":{"kind":"Name","value":"resourceIdentifier"}}]}},{"kind":"Field","name":{"kind":"Name","value":"audience"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onlineRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSamenwerkendecatalogiQuery, GetSamenwerkendecatalogiQueryVariables>;
export const GetProductBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageMode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationState"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicationState"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageMode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"metaTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keymatch"}},{"kind":"Field","name":{"kind":"Name","value":"ogImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"imageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alternativeText"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"formats"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLogoButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtSpotlight"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtRichText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtMultiColumnsButton"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"column"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"logoButton"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"appearance"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtLink"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","alias":{"kind":"Name","value":"iconList"},"name":{"kind":"Name","value":"icon"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsFaq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentComponentsUtrechtAccordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"localizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"locale"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductBySlugQuery, GetProductBySlugQueryVariables>;
export const GetProductBySlugAndLocaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductBySlugAndLocale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageMode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PublicationState"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicationState"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageMode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductBySlugAndLocaleQuery, GetProductBySlugAndLocaleQueryVariables>;
export const GetNotFoundPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNotFoundPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locale"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"I18NLocaleCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notFoundPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locale"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locale"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNotFoundPageQuery, GetNotFoundPageQueryVariables>;