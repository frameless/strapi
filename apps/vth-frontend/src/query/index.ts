const gql = (query: any) => query;

export const GET_NOT_FOUND_PAGE = gql(`
query getNotFoundPage($locale: I18NLocaleCode){
  notFoundPage(locale: $locale) {
    data {
       attributes {
        title
        body
      }
    }
  }
}
`);
