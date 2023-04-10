import { Heading2 } from '@utrecht/component-library-react';
import React from 'react';
import { Accordion } from '../Accordion';
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
    {accordion &&
      accordion.length > 0 &&
      accordion.map(({ id, title, body }: any) => (
        <Accordion
          locale={locale}
          key={id}
          label={title}
          body={
            <Markdown priceData={priceData} strapiBackendURL={strapiBackendURL}>
              {body}
            </Markdown>
          }
        />
      ))}
  </section>
);
