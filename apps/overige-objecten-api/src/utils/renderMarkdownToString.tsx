import React from 'react';
import { renderToString } from 'react-dom/server';
import { Markdown, type MarkdownProps } from '../components/Markdown';

export interface RenderMarkdownToStringProps extends MarkdownProps {}

export const renderMarkdownToString = ({ children, priceData }: RenderMarkdownToStringProps) =>
  renderToString(<Markdown priceData={priceData}>{children}</Markdown>);
