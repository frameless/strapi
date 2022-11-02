

export interface Fields {
    title: string;
    body: string;
}

export interface Hit {
    type: string;
    url: string;
    fields: Fields;
}

export interface Facets {
}

export interface Request {
    q: string;
    context: string;
    page: number;
    size: number;
    facets: Facets;
    full: boolean;
    nocorrect: boolean;
    track: boolean;
    notiming: boolean;
}

export interface Received {
    q: string;
    track: boolean;
}

export interface Pagination {
    current: number;
    numPages: number;
    numResults: number;
    prelink: string;
    resultsPerPage: number;
}

export interface Timing {
    search: number;
    "search:took": number;
    request: number;
}

export interface SearchResult {
    total: number;
    hits: Hit[];
    request: Request;
    received: Received;
    pagination: Pagination;
    timing: Timing;
}

export interface SuggestedResult {
    suggestedHits: SuggestedHits
    suggestions: Suggestions
}

export type SuggestedHits = {
    titleRaw: string
    url: string
}
export type Suggestions = {
    text: string
}
