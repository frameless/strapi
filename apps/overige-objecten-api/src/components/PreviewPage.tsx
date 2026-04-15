/* eslint-disable no-undef */
import KennisartikelPage from '../components/KennisartikelPage';

import { ErrorPage } from './ErrorPage';
import { PreviewLayout } from './PreviewLayout';
import VacPage from './VacPage';

export const PreviewPage = () => {
  if (typeof window === 'undefined') return null;
  return (
    <PreviewLayout status={window.__STATUS__}>
      {window.__KENNISARTIKEL_PREVIEW_DATA__ && <KennisartikelPage data={window.__KENNISARTIKEL_PREVIEW_DATA__} />}
      {window.__VAC_PREVIEW_DATA__ && <VacPage data={window.__VAC_PREVIEW_DATA__} />}
      {window.__ERROR_PAGE_DATA__ && <ErrorPage {...window.__ERROR_PAGE_DATA__} />}
    </PreviewLayout>
  );
};
