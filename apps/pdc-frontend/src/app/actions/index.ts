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

  const url = createURL('https://public.pandosearch.com/developer.pandosearch.com/search', urlParams);

  const searchResult = await fetchData<SearchResult>({
    url,
    method: 'GET',
  });

  return searchResult;
};

export const onSearchSubmitAction = async (formData: FormData, locale: string) => {
  const value = formData.get('search') as string;
  const result = await getSuggestedSearch(value, locale);
  if (result?.total) {
    redirect(`/${locale}/search/${value}`);
  }
};

export const getLiveSuggestions = async (value: string) => {
  const urlParams = {
    q: encodeURIComponent(value),
    track: false,
  };
  const url = createURL('https://public.pandosearch.com/developer.pandosearch.com/suggest', urlParams);
  const searchResult = await fetchData<GetLiveSuggestionsData>({
    url,
    method: 'GET',
  });
  return searchResult;
};

export const setPageIndex = async (pageIndex: string, currentQuery: string, locale: string, segment?: string) => {
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
    data: mappingProducts(products?.data as MappingProductsProps[]),
    pagination: products?.meta.pagination,
  };
};
