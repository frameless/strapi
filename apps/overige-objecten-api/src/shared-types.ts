export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageData {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  url: string;
}

export interface AccordionItem {
  body: string;
  headingLevel: number;
  id: string;
  label: string;
}

export interface ContentBlockSimple {
  id: string;
  content: string;
}

export interface ContentBlockDetailed {
  content: string;
  kennisartikelCategorie: string | null;
}

export interface ContactInformationInternal {
  contentBlock: ContentBlockSimple[];
}

export interface ContactInformationPublicData {
  contentBlock: ContentBlockSimple[];
}

export interface ContactInformationPublic {
  component: 'ComponentComponentsContactInformationPublic';
  contact_information_public: ContactInformationPublicData | null;
}

export interface InternalContent {
  id: string;
  uuid: string;
  contentBlock: ContentBlockDetailed[];
  keywords: string;
}

export interface InternalField {
  contact_information_internal: ContactInformationInternal[] | null;
  contact_information_public: ContactInformationPublicData | null;
  content: InternalContent;
  title: string;
  id: string;
}

export interface UtrechtRichText {
  component: 'ComponentComponentsUtrechtRichText';
  id: string;
  content?: string | null;
  kennisartikelCategorie?: string | null;
  categorie?: string | null;
}
export interface UtrechtRichText2 {
  component: 'ComponentComponentsUtrechtRichText';
  id?: string;
  content?: string | null;
  kennisartikelCategorie?: string | null;
  categorie5?: string | null;
  categorie?: string | null;
}

export interface UtrechtLogoButton {
  component: 'ComponentComponentsUtrechtLogoButton';
  id?: string;
  appearance: string;
  href: string | null;
  label: string | null;
  logo?: string;
  openFormsEmbed?: string;
  textContent: string | null;
  categorie?: string;
  __typename?: string;
}

export interface UtrechtSpotlight {
  component: 'ComponentComponentsUtrechtSpotlight';
  content: string;
  type: string;
  logoButton: UtrechtLogoButton[];
  categorie: string;
}

export interface UtrechtLink {
  component: 'ComponentComponentsUtrechtLink';
  href: string;
  textContent: string;
  icon: string;
  language: string | null;
  categorie: string;
}

export interface UtrechtAccordion {
  component: 'ComponentComponentsUtrechtAccordion';
  item: AccordionItem[];
  categorie: string;
}

export interface UtrechtImage {
  component: 'ComponentComponentsUtrechtImage';
  imageData: ImageData;
  categorie: string | null;
}

export interface InternalBlockContent {
  id: string;
  component: 'ComponentComponentsInternalBlockContent';
  internal_field: InternalField;
}

export interface FaqComponent {
  component: 'ComponentComponentsFaq';
  pdc_faq: {
    title: string;
    faq: AccordionItem[];
  };
  categorie: string;
}

export interface MultiColumnsButton {
  component: 'ComponentComponentsUtrechtMultiColumnsButton';
  column: {
    id: string;
    title: string;
    logoButton: UtrechtLogoButton[];
  }[];
  categorie: string;
}

export type PageSection =
  | UtrechtRichText
  | UtrechtLogoButton
  | UtrechtSpotlight
  | UtrechtLink
  | UtrechtAccordion
  | UtrechtImage
  | InternalBlockContent
  | FaqComponent
  | MultiColumnsButton
  | ContactInformationPublic
  | UtrechtRichText2
  | ContentBlock;

export type PageData = PageSection[];

export interface PriceItem {
  currency: string;
  id: string;
  label: string;
  uuid: string;
  value: number;
}

export type Sections = PageSection[];

export interface Content {
  id?: string;
  uuid: string;
  contentBlock: ContentBlock[];
}

export interface ContentBlock {
  id?: string;
  content?: string | null;
  kennisartikelCategorie?: string | null;
  categorie10?: string | null;
  component: 'ComponentComponentsUtrechtRichText';
}
export interface AdditionalInformation {
  content?: Content | null;
}

export interface MetaTags {
  keymatch: string;
  title: string;
  description: string;
}

//

export interface KennisartikelMetadata {
  uuid: string;
  doelgroep: string;
  productAanwezig: boolean;
  productValtOnder: string | null;
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
  owmsEndDate: string | null;
}

export interface Kennisartikel {
  title?: string | null;
  uuid?: string | null;
  locale?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  metaTags: MetaTags | null;
  sections: Sections | null;
  kennisartikelMetadata: KennisartikelMetadata | null;
  price: {
    price: PriceItem[];
  } | null;
  additional_information: AdditionalInformation;
  url: string;
  id?: string;
  publicationState: 'PUBLISHED' | 'DRAFT';
}
