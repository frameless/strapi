import { Heading1, Heading2, Paragraph, UnorderedList, UnorderedListItem } from '@utrecht/component-library-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSuggestedSearch } from '../actions';

type ParamsType = {
  locale: string;
  query: string;
};

interface SearchProps {
  params: ParamsType;
}

export const metadata: Metadata = {
  title: 'Zoeken | Gemeente Utrecht',
  description:
    'Zoekt u een product of dienst van de provincie, een waterschap of het Rijk? Op het overheidsloket kunt u bij alle overheden tegelijk zoeken.',
};

const Search = async ({ params: { locale, query } }: SearchProps) => {
  const searchResults = await getSuggestedSearch(locale, query);
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
              <Paragraph dangerouslySetInnerHTML={{ __html: fields.body }} />
            </UnorderedListItem>
          ))}
      </UnorderedList>
      {searchResults && searchResults.hits && searchResults.hits.length === 0 && (
        <div>
          <Heading1>Zoekresultaten voor ‘Zoekresultaten</Heading1>
          <div>
            <Heading2>Probeer het nog eens:</Heading2>
            <UnorderedList>
              <UnorderedListItem>Zorg ervoor dat alle woorden goed gespeld zijn.</UnorderedListItem>
              <UnorderedListItem>Probeer andere zoektermen.</UnorderedListItem>
              <UnorderedListItem>Maak de zoektermen algemener.</UnorderedListItem>
            </UnorderedList>
          </div>
        </div>
      )}
    </>
  );
};
export default Search;
