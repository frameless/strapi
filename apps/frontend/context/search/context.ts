import { createContext } from "react";
import { SearchResult, SuggestedHits, Suggestions } from "../../types";

interface SearchResultsContext {
    searchResults?: SearchResult;
    suggestedHits?: SuggestedHits[];
    suggestions?: Suggestions[];
    error: any;
    query: string;
    loading?: boolean;
    setQuery:(value: React.SetStateAction<string>) => void;
    getSearchResult: (locale: string, query?: string)=> any;
    getSuggestedSearch: (locale: string, query?: string)=> any;
}

const contactContext = createContext<SearchResultsContext>({
    error: null,
    query: '',
    suggestedHits: [],
    suggestions: [],
    setQuery: () => undefined,
    getSearchResult: ()=> {},
    getSuggestedSearch: ()=> {}
});

export default contactContext;
