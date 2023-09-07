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
  themas(filters: { parents: { id: null } }) {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
}`);

export const GET_THEMA_BY_SLUG = gql(`
query GET_THEMA_BY_SLUG($slug: String) {
  findSlug(modelName:"thema", slug: $slug){
    ... on ThemaEntityResponse{
      data{
        id
        attributes{
          title
          content
          child_themas {
            data { attributes { title, slug }}
          }
          child_contents {
            data { attributes { title, slug }}
          }
        }
      }
    }
  }
}`);
