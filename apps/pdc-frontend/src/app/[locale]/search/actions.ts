'use server';
import { redirect } from 'next/navigation';
import { GetLiveSuggestionsData, SearchResult } from '@/types';
import { createURL } from '@/util/create-url';
import { fetchData } from '@/util/fetchData';

type Params = {
  size?: number;
  page?: number;
};

export const getSuggestedSearch = async (locale: string, value: string, params: Params = { page: 1, size: 5 }) => {
  const urlParams = {
    q: encodeURIComponent(value),
    track: false,
    size: params.size,
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
