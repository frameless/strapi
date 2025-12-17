export interface ProductData {
  id: number;
  title: string;
  content: string;
  slug: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  oldSlugs: string[] | null;
  enable_kcm_survey: boolean | null;
  sections: SectionTypes[];
  price: PriceObject | null;
  additional_information?: AdditionalInformation | null;
}

export type SectionTypes =
  | RichTextSection
  | InternalBlockContentSection
  | SpotlightSection
  | LogoButtonSection
  | AccordionSection
  | LinkSection
  | FaqSection
  | ImageSection
  | MultiColumnsButtonSection
  | UnknownSection; // fallback for other components not modelled exactly

export interface BaseSection {
  __component: string;
  id: number;
  kennisartikelCategorie?: string | null;
}

export interface RichTextSection extends BaseSection {
  __component: 'components.utrecht-rich-text';
  content: string;
  kennisartikelCategorie: string | null;
  label?: string | null;
}

export interface InternalBlockContentSection extends BaseSection {
  __component: 'components.internal-block-content';
  internal_field: InternalFieldData;
}

export interface SpotlightSection extends BaseSection {
  __component: 'components.utrecht-spotlight';
  content?: string | null;
  type?: string | null;
}

export interface LogoButtonSection extends BaseSection {
  __component: 'components.utrecht-logo-button';
  label?: string | null;
  href?: string | null;
  textContent?: string | null;
  logo?: string | null;
  appearance?: string | null;
  openFormsEmbed?: string | null;
}

export interface AccordionSection extends BaseSection {
  __component: 'components.utrecht-accordion';
}

/* components.utrecht-link */
export interface LinkSection extends BaseSection {
  __component: 'components.utrecht-link';
  textContent?: string | null;
  href?: string | null;
  icon?: string | null;
  language?: string | null;
}

export interface FaqSection extends BaseSection {
  __component: 'components.faq';
}

export interface ImageSection extends BaseSection {
  __component: 'components.utrecht-image';
}

export interface MultiColumnsButtonSection extends BaseSection {
  __component: 'components.utrecht-multi-columns-button';
}

export interface UnknownSection extends BaseSection {
  [key: string]: any;
}

export interface InternalFieldData {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  content: Content;
  contact_information_internal: ContactInformation | null;
  contact_information_public: ContactInformation | null;
}

export interface Content {
  id: number;
  uuid?: string;
  keywords?: string | null;
  contentBlock: ContentBlock[];
}

export interface ContentBlock {
  id: number;
  content: string;
  kennisartikelCategorie: string | null;
  label: string;
}

export interface ContactInformation {
  id: number;
  title?: string;
  contentBlock: ContentBlock[];
}

export interface PriceObject {
  id: number;
  title: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  price: PriceEntry[];
  products?: ProductSummary[] | null;
  createdBy?: any | null;
  updatedBy?: any | null;
}

export interface PriceEntry {
  id: number;
  label: string;
  currency: string;
  value: number;
  uuid: string;
}

export interface ProductSummary {
  id: number;
  title: string;
  content: string;
  slug: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  oldSlugs: string[] | null;
  enable_kcm_survey: boolean | null;
  price?: PriceObject | null;
}

export interface AdditionalInformation {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  content: Content;
}

export interface VacData {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  title: string;
  vac: Vac;
  contact_information_internal: ContactInformation | null;
  contact_information_public: ContactInformation | null;
}

export interface Vac {
  id: number;
  vraag?: string | null;
  status?: string | null;
  doelgroep?: string | null;
  uuid?: string;
  toelichting?: string | null;
  keywords?: string | null;
  antwoord?: ContentBlock[] | null;
  afdelingen?: unknown[] | null;
}
