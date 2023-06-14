import { Heading2, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslation } from '../../../i18n/index';
import { Markdown } from '../../components/Markdown';
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

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const searchResults = await getSuggestedSearch(locale, query);
  const { origin } = new URL(process.env.STRAPI_BACKEND_URL as string);
  if (searchResults && searchResults.hits && searchResults.hits.length === 0) {
    redirect(`/search/tips/${query}`);
  }
  return (
    <>
      <UnorderedList>
        {searchResults?.hits &&
          searchResults?.hits.length > 0 &&
          searchResults?.hits.map(({ fields, url }: any, index: number) => (
            <UnorderedListItem key={index}>
              <Link href={url}>
                <Heading2 style={{ color: 'inherit' }} dangerouslySetInnerHTML={{ __html: fields.title }} />
              </Link>
              <Markdown strapiBackendURL={origin}>{fields.body}</Markdown>
            </UnorderedListItem>
          ))}
      </UnorderedList>
    </>
  );
};
export default Search;
