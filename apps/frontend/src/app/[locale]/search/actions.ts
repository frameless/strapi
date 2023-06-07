'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSuggestedSearch = async (locale: string, value: string) => {
  try {
    const res = await fetch(
      `https://public.pandosearch.com/developer.pandosearch.com/search?q=${encodeURIComponent(value)}&track=false`,
    );
    const searchResult = await res.json();
    return searchResult;
  } catch (error) {
    // TODO improve the error messages
    throw new Error('server error');
  }
};

export const onSearchSubmitAction = async (formData: FormData) => {
  'use server';
  const locale = cookies().get('NEXT_LOCALE')?.value as string;
  const value = formData.get('search') as string;
  const result = await getSuggestedSearch(value, locale);

  if (result?.total) {
    redirect(`/${locale}/search/${value}`);
  }
};

export const getLiveSuggestions = async (value: any) => {
  try {
    const res = await fetch(
      `https://public.pandosearch.com/developer.pandosearch.com/suggest?q=${encodeURIComponent(value)}&track=false`,
    );
    const searchResult = await res.json();

    return searchResult;
  } catch (error) {
    // TODO improve the error messages
    throw new Error('server error');
  }
};
