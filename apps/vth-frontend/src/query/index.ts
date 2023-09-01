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

export const GET_HOME_PAGE = gql(`
query getHomePage {
  homepage {
    data {
      attributes {
        title
        content
      }
    }
  }
  themas {
    data {
      attributes {
        title,
        slug
      }
    }
  }
}`);

export const GET_THEMA = gql(`
query GET_THEMA($slug: String) {
  themas(filters: { slug: { eq: $slug }}) {
    data {
      id
      attributes {
        title
        content
      }
    }
  }
}`);
