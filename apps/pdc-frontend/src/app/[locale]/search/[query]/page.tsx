import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Article } from '@/components';
import { BottomBar, BottomBarItem } from '@/components/BottomBar';
import { Breadcrumbs } from '@/components/Breadcrumb';
import { PageTitle } from '@/components/PageTitle';
import { ProductListContainer } from '@/components/ProductListContainer';
import { ReactionLink } from '@/components/ReactionLink';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
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
  const { t } = await useTranslation(locale, ['search-page', 'common']);
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
      <Breadcrumbs
        links={[
          {
            href: 'https://www.utrecht.nl/',
            label: t('components.breadcrumbs.label.home'),
            current: false,
          },
          {
            href: `/search/${query}`,
            label: t('components.breadcrumbs.label.search'),
            current: true,
          },
        ]}
      />
      <Article>
        <PageTitle>{t('h1', { query })}</PageTitle>
        <ProductListContainer
          locale={locale}
          total={searchResults.total}
          initialData={results}
          onReadMoreButtonClickHandler={readMoreButtonAction}
        />
      </Article>
      <BottomBar>
        <BottomBarItem>
          <ReactionLink href="https://www.kcmsurvey.com/qSwudd733b9c27c2e91ba8c7b598MaSd?webpagina=Alle%20producten">
            {t('actions.reaction-link')}
          </ReactionLink>
        </BottomBarItem>
        <BottomBarItem>
          <ScrollToTopButton>{t('actions.scroll-to-top')}</ScrollToTopButton>
        </BottomBarItem>
      </BottomBar>
    </>
  );
};
export default Search;
