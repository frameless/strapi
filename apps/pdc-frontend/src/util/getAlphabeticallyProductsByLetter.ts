import { GET_ALPHABETICALLY_PRODUCTS_BY_LETTER } from '@/query';
import { fetchData } from './fetchData';
import { getStrapiGraphqlURL } from './getStrapiGraphqlURL';
import { GetAlphabeticallyProductsByLetterQueryQuery } from '../../gql/graphql';

type GetAlphabeticallyProductsByLetterProps = {
  locale: string;
  page: number;
  pageSize: number;
  startsWith?: string;
};

export const getAlphabeticallyProductsByLetter = async ({
  locale,
  page,
  pageSize,
  startsWith,
}: GetAlphabeticallyProductsByLetterProps) => {
  const { data } = await fetchData<{ data: GetAlphabeticallyProductsByLetterQueryQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_ALPHABETICALLY_PRODUCTS_BY_LETTER,
    variables: { locale, page, pageSize, startsWith },
  });
  return data;
};
