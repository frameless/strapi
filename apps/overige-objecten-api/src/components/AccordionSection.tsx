import { HTMLHeading } from '@frameless/ui';
import React from 'react';
import { Markdown } from './Markdown';
export interface AccordionSectionProps {
  label: string;
  body: string;
  headingLevel?: number;
}
export const AccordionSection = ({ body, headingLevel, label }: AccordionSectionProps) => (
  <details>
    <summary>{headingLevel ? <HTMLHeading level={headingLevel}>{label}</HTMLHeading> : label}</summary>
    <div>
      <Markdown>{body}</Markdown>
    </div>
  </details>
);
