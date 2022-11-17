import { ApolloClient, InMemoryCache, HttpLink, } from '@apollo/client';

export const client = new ApolloClient({
  // todo Deprecate  STRAPI_GRAPHQL_URL when we will deleted from Vercel
    cache: new InMemoryCache(),
    link: new HttpLink({ uri:process.env.STRAPI_BACKEND_URL || process.env.STRAPI_GRAPHQL_URL }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
      }
    }
  });
