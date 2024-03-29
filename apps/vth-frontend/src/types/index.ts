export interface Fields {
  title: string;
  body: string;
}

export interface Hit {
  type: string;
  url: string;
  fields: Fields;
}

export interface Facets {}

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
  'search:took': number;
  request: number;
}

export type SiblingData = {
  attributes: {
    slug: string;
    title: string;
  };
};
