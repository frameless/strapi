import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Heading1 } from '@/components';
import { ProductListContainer } from '@/components/ProductListContainer';
import { useTranslation } from '../../../i18n/index';
import { getSuggestedSearch } from '../actions';

type ParamsType = {
  locale: string;
  query: string;
};

interface SearchProps {
  params: ParamsType;
}

type Params = {
  params: {
    locale: string;
    query: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, 'search-page');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
  };
}
const mappingResults = (data: any) => {
  if (!data || data.length === 0) return [];
  return data.map(({ url, fields }: any) => ({
    title: fields.title,
    url,
    body: fields.body,
  }));
};

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const { t } = await useTranslation(locale, 'search-page');
  const searchResults = await getSuggestedSearch(locale, query);

  if (searchResults && searchResults.hits && searchResults.hits.length === 0) {
    redirect(`/search/tips/${query}`);
  }

  const results = mappingResults(searchResults.hits);

  const readMoreButtonAction = async (pageIndex: number) => {
    'use server';
    const searchResults = await getSuggestedSearch(locale, query, {
      page: pageIndex + 1,
      size: 5,
    });

    return {
      data: mappingResults(searchResults.hits),
      pagination: { total: searchResults.total },
    };
  };

  return (
    <>
      <Heading1 style={{ marginBlockEnd: '3rem' }}>{t('h1', { query })}</Heading1>{' '}
      {/*TODO: create a pageTitle component*/}
      <ProductListContainer
        locale={locale}
        total={searchResults.total}
        initialData={results}
        onReadMoreButtonClickHandler={readMoreButtonAction}
      />
    </>
  );
};
export default Search;
