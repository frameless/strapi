'use server';
import { redirect } from 'next/navigation';
import { GetLiveSuggestionsData, SearchResult } from '@/types';
import {
  apiSettings,
  createURL,
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

const getPandoSearchURL = (route: string) => {
  if (!process.env.PANDOSEARCH_API_URL) {
    //TODO: Enable the line below when PandoSearch implements an API for gemeente Utrecht.
    // throw new Error('PANDOSEARCH_API_URL is not defined');
    return `https://public.pandosearch.com/developer.pandosearch.com/${route}`;
  }
  return `${process.env.PANDOSEARCH_API_URL}/${route}`;
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
  const pandosearchURL = getPandoSearchURL('search');
  const url = createURL(pandosearchURL, urlParams);

  const searchResult = await fetchData<SearchResult>({
    url,
    method: 'GET',
  });

  return searchResult;
};

export const onSearchSubmitAction = async (formData: FormData, locale: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const searchSegment = t('segments.search', {
    defaultValue: 'zoeken',
  });
  const value = formData.get('search') as string;
  const result = await getSuggestedSearch(value, locale);
  if (result?.total && value.trim()) {
    redirect(`/${locale}/${searchSegment}/${value}`);
  }
  redirect(`/${locale}/${searchSegment}/tips?query=`);
};

export const getLiveSuggestions = async (value: string) => {
  const urlParams = {
    q: encodeURIComponent(value),
    track: false,
  };
  const pandosearchURL = getPandoSearchURL('suggest');
  const url = createURL(pandosearchURL, urlParams);

  const searchResult = await fetchData<GetLiveSuggestionsData>({
    url,
    method: 'GET',
  });
  return searchResult;
};

export const setPageIndex = async (pageIndex: string, currentQuery: string, locale: string, segment?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ['common']);
  const productsSegment = t('segments.products', {
    defaultValue: 'producten',
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
    data: mappingProducts(products?.data as MappingProductsProps[], productsSegment),
    pagination: products?.meta.pagination,
  };
};
