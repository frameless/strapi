import { renderToString } from 'react-dom/server';

import { Markdown, type MarkdownProps } from '../components/Markdown';

export const renderMarkdownToString = ({ children, priceData }: MarkdownProps) =>
  renderToString(<Markdown priceData={priceData}>{children}</Markdown>);
