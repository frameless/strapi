import React from 'react';
import { AccordionProvider, Heading2, Markdown } from '@/components';

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
  imageUrl: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  sectionTitle,
  accordion,
  imageUrl,
  locale = 'nl',
  priceData,
}) => (
  <section>
    <Heading2>{sectionTitle}</Heading2>
    {accordion && accordion.length > 0 && (
      <AccordionProvider
        sections={accordion.map(({ id, title, body }: any) => ({
          id,
          label: title,
          headingLevel: 3,
          body: (
            <Markdown priceData={priceData} imageUrl={imageUrl} locale={locale}>
              {body}
            </Markdown>
          ),
        }))}
      />
    )}
  </section>
);
