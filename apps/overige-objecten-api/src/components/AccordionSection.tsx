import React from 'react';
import { Markdown } from './Markdown';

export interface AccordionSectionProps {
  label: string;
  body: string;
  headingLevel?: number;
}
export const AccordionSection = ({ body, headingLevel = 2, label }: AccordionSectionProps) => {
  const CustomHeading = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;
  return (
    <section>
      <CustomHeading>{label}</CustomHeading>
      <Markdown>{body}</Markdown>
    </section>
  );
};
