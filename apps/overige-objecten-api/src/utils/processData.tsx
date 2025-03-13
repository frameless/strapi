import { getDirectionFromLanguageCode } from '@frameless/utils';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  convertImageToHTML,
  convertLogoButtonToHTML,
  convertMultiColumnsButtonToHTML,
  convertSpotlightToHTML,
  mapContentByCategory,
} from './index';
import { AccordionSection, type AccordionSectionProps } from '../components/AccordionSection';
import { Markdown } from '../components/Markdown';
import type { Price } from '../strapi-product-type';

interface ProcessDataParams {
  data: any;
  priceData?: Price[];
}

export const processData = ({ data, priceData }: ProcessDataParams) =>
  data?.map((item: any) => {
    if (item.component === 'ComponentComponentsUtrechtRichText') {
      return mapContentByCategory(
        item.categorie,
        renderToString(<Markdown priceData={priceData}>{item?.content}</Markdown>),
      );
    }
    if (item.component === 'ComponentComponentsUtrechtLogoButton') {
      const mappedContent = mapContentByCategory(item.categorie, convertLogoButtonToHTML(item));
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtSpotlight') {
      const mappedContent = mapContentByCategory(item.categorie, convertSpotlightToHTML(item));
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtImage') {
      const mappedContent = mapContentByCategory(
        item.categorie,
        convertImageToHTML(item?.imageData, process.env.STRAPI_PRIVATE_URL as string),
      );
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtMultiColumnsButton') {
      const mappedContent = mapContentByCategory(item.categorie, convertMultiColumnsButtonToHTML(item));
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtImage') {
      const imageUrl = item?.imageData?.data?.attributes.url;

      if (!imageUrl) return {};
      if (!item.categorie) return {};

      const mappedContent = mapContentByCategory(
        item.categorie,
        renderToString(
          <img
            src={`${new URL(imageUrl, process.env.STRAPI_PRIVATE_URL)}`}
            alt={item?.imageData?.data?.attributes?.alternativeText ?? item?.imageData?.data?.attributes?.name}
          />,
        ),
      );
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsFaq') {
      const FAQs = item?.pdc_faq?.data?.attributes?.faq.map((faq: AccordionSectionProps, index: number) => (
        <AccordionSection key={index} label={faq.label} body={faq.body} headingLevel={faq.headingLevel || 2} />
      ));
      const mappedContent = mapContentByCategory(item.categorie, renderToString(FAQs));
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtLink') {
      if (!item.categorie) return {};
      const mappedContent = mapContentByCategory(
        item.categorie,
        renderToString(
          <a
            dir={item.language ? getDirectionFromLanguageCode(item.language) : undefined}
            lang={item?.language}
            href={item.href}
          >
            {item.textContent}
          </a>,
        ),
      );
      return mappedContent;
    }
    if (item.component === 'ComponentComponentsUtrechtAccordion') {
      if (!item.categorie) return {};

      const mappedContent = mapContentByCategory(
        item.categorie,
        renderToString(
          Array.isArray(item.item) &&
            item.item.map((accordionItem: AccordionSectionProps) => (
              <AccordionSection
                key={accordionItem.label}
                label={accordionItem.label}
                body={accordionItem.body}
                headingLevel={accordionItem.headingLevel}
              />
            )),
        ),
      );
      if (Object.keys(mappedContent).length > 0) {
        return mappedContent;
      }
    }
    return {};
  });
