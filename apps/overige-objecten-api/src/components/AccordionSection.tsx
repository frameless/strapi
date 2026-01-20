import { Markdown } from './Markdown';
export interface AccordionSectionProps {
  label: string;
  body: string;
}
export const AccordionSection = ({ body, label }: AccordionSectionProps) => (
  <details>
    <summary>{label}</summary>
    <div>
      <Markdown>{body}</Markdown>
    </div>
  </details>
);
