import type { KennisartikelObject, VACObject, ErrorPageData } from '../types';
declare global {
  interface Window {
    __VAC_PREVIEW_DATA__: VACObject;
    __KENNISARTIKEL_PREVIEW_DATA__: KennisartikelObject;
    __STATUS__?: 'DRAFT' | 'PUBLISHED';
    __ERROR_PAGE_DATA__?: ErrorPageData;
  }
}
