import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Heading, Markdown } from '../index';
import './index.scss';
interface FloLegalFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
  checkData?: string;
  headingLevel: number;
}
export const FloLegalForm = ({ checkData, title, headingLevel, ...restProps }: FloLegalFormProps) => {
  const content = `<flo-decision data-check-data="${checkData}"></flo-decision>`;
  return (
    <div className="utrecht-html" {...restProps}>
      {title && <Heading level={headingLevel}>{title}</Heading>}
      {checkData && <Markdown>{content}</Markdown>}
    </div>
  );
};
