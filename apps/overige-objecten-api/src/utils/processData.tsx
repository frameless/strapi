/* eslint-disable no-undef */
import { getDirectionFromLanguageCode } from '@frameless/utils';
import { renderToString } from 'react-dom/server';
import { ReactElement } from 'react';

import { AccordionSection } from '../components/AccordionSection';
import { Markdown } from '../components/Markdown';
import {
  FaqComponent,
  MultiColumnsButton,
  PageData,
  PriceItem,
  UtrechtAccordion,
  UtrechtImage,
  UtrechtLink,
  UtrechtLogoButton,
  UtrechtRichText,
  UtrechtRichText2,
  UtrechtSpotlight,
} from '../shared-types';

import {
  convertImageToHTML,
  convertLogoButtonToHTML,
  convertMultiColumnsButtonToHTML,
  convertSpotlightToHTML,
  mapContentByCategory,
} from './index';

export type PriceData = PriceItem[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Safely renders a React element to an HTML string.
 * Returns null if rendering fails, so callers can decide how to handle it.
 */
const safeRenderToString = (element: ReactElement): string | null => {
  try {
    return renderToString(element);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[processData] renderToString failed:', error);
    return null;
  }
};

/**
 * Wraps mapContentByCategory, skipping the call when html is null
 * so a failed render does not produce a broken content block.
 */
const mapContent = (categorie: string, html: string | null): Record<string, string> => {
  if (html === null) return {};
  return mapContentByCategory(categorie, html);
};

const renderRichText = (item: UtrechtRichText | UtrechtRichText2, priceData?: PriceData): Record<string, string> => {
  const categorie = 'categorie' in item ? (item.categorie ?? '') : '';
  return mapContent(categorie, safeRenderToString(<Markdown priceData={priceData}>{item.content}</Markdown>));
};

const renderLogoButton = (item: UtrechtLogoButton): Record<string, string> =>
  mapContent(item.categorie ?? '', convertLogoButtonToHTML(item));

const renderSpotlight = (item: UtrechtSpotlight): Record<string, string> =>
  mapContent(item.categorie, convertSpotlightToHTML(item));

const renderImage = (item: UtrechtImage): Record<string, string> => {
  if (!item.imageData?.url || !item.categorie) return {};
  const strapiUrl = process.env.STRAPI_PRIVATE_URL;
  if (!strapiUrl) {
    // eslint-disable-next-line no-console
    console.warn('[processData] STRAPI_PRIVATE_URL is not set; skipping image render.');
    return {};
  }
  return mapContent(item.categorie, convertImageToHTML(item.imageData, strapiUrl));
};

const renderMultiColumnsButton = (item: MultiColumnsButton): Record<string, string> =>
  mapContent(item.categorie, convertMultiColumnsButtonToHTML(item));

const renderFaq = (item: FaqComponent): Record<string, string> => {
  const html = safeRenderToString(
    <>
      {item.pdc_faq.faq.map((faq, index) => (
        <AccordionSection key={faq.id ?? index} label={faq.label} body={faq.body} />
      ))}
    </>,
  );
  return mapContent(item.categorie, html);
};

const renderLink = (item: UtrechtLink): Record<string, string> => {
  const html = safeRenderToString(
    <a
      dir={item.language ? getDirectionFromLanguageCode(item.language) : undefined}
      lang={item.language ?? undefined}
      href={item.href}
    >
      {item.textContent}
    </a>,
  );
  return mapContent(item.categorie, html);
};

const renderAccordion = (item: UtrechtAccordion): Record<string, string> => {
  const html = safeRenderToString(
    <>
      {item.item.map((accordionItem) => (
        <AccordionSection
          key={accordionItem.id || accordionItem.label}
          label={accordionItem.label}
          body={accordionItem.body}
        />
      ))}
    </>,
  );
  return mapContent(item.categorie, html);
};

interface ProcessDataParams {
  data: PageData;
  priceData?: PriceData;
}

export const processData = ({ data, priceData }: ProcessDataParams): Record<string, string>[] => {
  if (!data?.length) return [];

  return data.map((item): Record<string, string> => {
    switch (item.component) {
      case 'ComponentComponentsUtrechtRichText':
        return renderRichText(item, priceData);
      case 'ComponentComponentsUtrechtLogoButton':
        return renderLogoButton(item);
      case 'ComponentComponentsUtrechtSpotlight':
        return renderSpotlight(item);
      case 'ComponentComponentsUtrechtImage':
        return renderImage(item);
      case 'ComponentComponentsUtrechtMultiColumnsButton':
        return renderMultiColumnsButton(item);
      case 'ComponentComponentsFaq':
        return renderFaq(item);
      case 'ComponentComponentsUtrechtLink':
        return renderLink(item);
      case 'ComponentComponentsUtrechtAccordion':
        return renderAccordion(item);
      default:
        return {};
    }
  });
};
