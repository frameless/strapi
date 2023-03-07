import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: process.env.STRAPI_BACKEND_URL || 'http://host.docker.internal:1337/graphql' }),
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
