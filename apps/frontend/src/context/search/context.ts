import { createContext, SetStateAction } from 'react';
import { SearchResult, SuggestedHits, Suggestions } from '../../types';

interface SearchResultsContext {
  searchResults?: SearchResult;
  suggestedHits?: SuggestedHits[];
  suggestions?: Suggestions[];
  error: any;
  query: string;
  loading?: boolean;
  setQuery: (_value: SetStateAction<string>) => void;
  getSearchResult: (_locale: string, _query?: string) => any;
  getSuggestedSearch: (_locale: string, _query?: string) => any;
}

const contactContext = createContext<SearchResultsContext>({
  error: null,
  query: '',
  suggestedHits: [],
  suggestions: [],
  setQuery: () => undefined,
  getSearchResult: () => {},
  getSuggestedSearch: () => {},
});

export default contactContext;
