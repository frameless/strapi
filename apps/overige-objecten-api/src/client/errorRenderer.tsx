import { renderToString } from 'react-dom/server';
import { renderLayout } from './layout.view';
import { ErrorPage } from '../components/ErrorPage';

interface ErrorRendererProps {
  title?: string;
  message?: string;
}

export const errorRenderer = ({ title, message }: ErrorRendererProps) => {
  const app = renderToString(<ErrorPage title={title} message={message} />);
  return renderLayout({
    app,
    status: undefined,
    title,
    kennisartikelData: undefined,
    vacData: undefined,
    errorPageData: {
      message,
      title,
    },
  });
};
