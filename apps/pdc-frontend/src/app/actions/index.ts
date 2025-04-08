'use server';
import { buildURL, getPathAndSearchParams } from '@frameless/utils';
import { redirect } from 'next/navigation';
import { GetLiveSuggestionsData, SearchResult } from '@/types';
import {
  apiSettings,
  fetchData,
  getAlphabeticallyProductsByLetter,
  mappingProducts,
  MappingProductsProps,
} from '@/util';
import { useTranslation } from '../i18n';

type Params = {
  pageSize?: number;
  page?: number;
};

export const getSuggestedSearch = async (
  locale: string,
  value: string,
  params: Params = { page: 1, pageSize: apiSettings.pagination.pageSize },
) => {
  const urlParams = {
    q: encodeURIComponent(value),
    track: false,
    size: params.pageSize,
    page: params.page,
  };

  const url = buildURL({
    env: process.env,
    key: 'PANDOSEARCH_API_URL',
    segments: ['search'],
    isOrigin: false,
    queryParams: urlParams as any,
  });

  const searchResult = await fetchData<SearchResult>({
    url: url.href,
    method: 'GET',
  });

  return searchResult;
};

export const onSearchSubmitAction = async (formData: FormData, locale: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);

  const value = formData.get('search') as string;
  const result = await getSuggestedSearch(value, locale);

  const { pathSegments: searchSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.search', value],
    locale,
  });

  const { pathSegments: tipsSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.search', 'tips'],
    queryParams: { query: '' },
    locale,
  });

  if (result?.total && value.trim()) {
    redirect(`/${searchSegment}`);
  }

  redirect(`/${tipsSegment}`);
};

export const getLiveSuggestions = async (value: string) => {
  const urlParams = {
    q: encodeURIComponent(value),
    track: false,
  };

  const url = buildURL({
    env: process.env,
    key: 'PANDOSEARCH_API_URL',
    segments: ['suggest'],
    isOrigin: false,
    queryParams: urlParams as any,
  });

  const searchResult = await fetchData<GetLiveSuggestionsData>({
    url: url.href,
    method: 'GET',
  });
  return searchResult;
};

export const setPageIndex = async (pageIndex: string, currentQuery: string, locale: string, segment?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const { pathSegments: productSegment } = getPathAndSearchParams({
    translations: t,
    segments: ['segments.products'],
    locale,
  });
  if (segment === 'search') {
    const searchResults = await getSuggestedSearch(locale, currentQuery, {
      page: Number(pageIndex) + 1,
      pageSize: apiSettings.pagination.pageSize,
    });
    const results =
      searchResults.hits && searchResults.hits.length > 0
        ? searchResults.hits.map(({ url, fields }: any) => ({
            title: fields.title,
            url,
            body: fields.body,
          }))
        : [];

    return {
      data: results,
      pagination: {
        total: searchResults.total,
        page: searchResults.pagination.numPages,
        pageSize: searchResults.pagination.numResults,
        pageCount: searchResults.pagination.resultsPerPage,
      },
    };
  }

  const { products } = await getAlphabeticallyProductsByLetter({
    locale,
    page: Number(pageIndex) + 1,
    pageSize: apiSettings.pagination.pageSize,
    startsWith: currentQuery,
  });

  return {
    data: mappingProducts(products?.data as MappingProductsProps[], productSegment),
    pagination: products?.meta.pagination,
  };
};
