import React from 'react';
import { AccordionProvider, Heading2 } from '@/components';
import { Markdown } from '../Markdown';

type AccordionType = {
  id: string;
  title: string;
  body: string;
};

export interface FAQSectionProps {
  sectionTitle?: string;
  accordion?: AccordionType[];
  locale?: string;
  priceData?: any;
  strapiBackendURL?: any;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  sectionTitle,
  accordion,
  locale,
  priceData,
  strapiBackendURL,
}) => (
  <section>
    <Heading2>{sectionTitle}</Heading2>
    {accordion && accordion.length > 0 && (
      <AccordionProvider
        sections={accordion.map(({ id, title, body }: any) => ({
          id,
          label: title,
          headingLevel: 3, // TODO add this property from CMS
          body: (
            <Markdown priceData={priceData} locale={locale} strapiBackendURL={strapiBackendURL}>
              {body}
            </Markdown>
          ),
        }))}
      />
    )}
  </section>
);
