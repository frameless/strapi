import { renderToString } from 'react-dom/server';
import { renderLayout } from './layout.view';
import KennisartikelPage from '../components/KennisartikelPage';
import VacPage from '../components/VacPage';
import { KennisartikelObject, VACObject } from '../types';

interface PageRendererProps {
  vacData?: VACObject;
  kennisartikelData?: KennisartikelObject;
  status?: 'DRAFT' | 'PUBLISHED';
}
export const pageRenderer = ({ vacData, kennisartikelData, status }: PageRendererProps) => {
  const app = renderToString(
    <>
      {kennisartikelData && <KennisartikelPage data={kennisartikelData} />}
      {vacData && <VacPage data={vacData} />}
    </>,
  );

  const kennisartikelTitle = kennisartikelData?.record?.data?.vertalingen?.[0]?.titel || 'Kennisartikel';
  const vacTitle = vacData?.record?.data?.vraag || 'VAC';
  const title = kennisartikelData ? kennisartikelTitle : vacTitle;

  return renderLayout({
    app,
    kennisartikelData,
    status,
    title,
    vacData,
  });
};
