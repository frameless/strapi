import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import '@utrecht/component-library-css/dist/html.css';
import { Heading, Markdown } from '../index';
import './index.scss';
interface FloLegalFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name?: string;
  content?: string;
  headingLevel: number;
}
export const FloLegalForm = ({ content, name, headingLevel, ...restProps }: FloLegalFormProps) => {
  const fleDecisionContent = `<flo-decision data-check-data="${content}"></flo-decision>`;
  return (
    <div className="utrecht-html" {...restProps}>
      {name && <Heading level={headingLevel}>{name}</Heading>}
      {content && <Markdown>{fleDecisionContent}</Markdown>}
    </div>
  );
};
