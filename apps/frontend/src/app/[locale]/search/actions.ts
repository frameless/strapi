'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchData } from '@/util/fetchData';

export const getSuggestedSearch = async (locale: string, value: string) => {
  const searchResult = await fetchData({
    url: `https://public.pandosearch.com/developer.pandosearch.com/search?q=${encodeURIComponent(value)}&track=false`,
    method: 'GET',
  });
  return searchResult;
};

export const onSearchSubmitAction = async (formData: FormData) => {
  'use server';
  const locale = cookies().get('i18next')?.value as string;
  const value = formData.get('search') as string;
  const result = await getSuggestedSearch(value, locale);
  if (result?.total) {
    redirect(`/${locale}/search/${value}`);
  }
};

export const getLiveSuggestions = async (value: any) => {
  const searchResult = await fetchData({
    url: `https://public.pandosearch.com/developer.pandosearch.com/suggest?q=${encodeURIComponent(value)}&track=false`,
    method: 'GET',
  });
  return searchResult;
};
