import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: process.env.STRAPI_BACKEND_URL }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
  },
});
