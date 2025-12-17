export interface ContentBlock {
  id: number;
  content?: string;
  label?: string;
  [key: string]: unknown;
}

export interface ContentSection {
  contentBlock?: ContentBlock[];
}

export interface StrapiEntry {
  id: number;
  content?: ContentSection;
  contact_information_public?: ContentSection;
  contact_information_internal?: ContentSection;
  sections?: Section[];
  vac?: {
    antwoord?: unknown[];
  };
  [key: string]: unknown;
}

export interface Section {
  __component: string;
  id?: number;
  internal_field?: {
    content?: ContentSection;
    contact_information_public?: ContentSection;
    contact_information_internal?: ContentSection;
  };
  contact_information_public?: ContentSection;
  [key: string]: unknown;
}

declare global {
  namespace Strapi {
    interface EntityService {
      findOne(uid: string, id: string | number, params?: Record<string, unknown>): Promise<StrapiEntry | null>;
    }
  }

  const strapi: {
    entityService: Strapi.EntityService;
  };
}

export {};
