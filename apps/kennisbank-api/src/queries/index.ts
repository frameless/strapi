const gql = (query: any) => query;
export const SEARCH_PRODUCT = gql(`
    query searchProduct($locale: I18NLocaleCode, $query: String) {
        products(locale: $locale, pagination: {start: 0, limit: -1}, filters: { title: {containsi: $query}}) {
          data {
            id
            attributes {
              title
              slug
              locale
              updatedAt
              createdAt
              locale
              metaTags {
                keymatch
                title
                description
              }
              sections {
                ... on ComponentComponentsUtrechtRichText {
                  id
                  content
                  kennisartikelCategorie
                  component:__typename
                }
              }
              catalogiMeta {
                abstract
                spatial {
                  scheme
                  resourceIdentifier
                }
                authority {
                  scheme
                  resourceIdentifier
                }
                audience {
                  id
                  type
                }
                onlineRequest {
                  type
                }
              }
              pdc_metadata {
                uplProductNaam
              }
            }
          }
        }
      }
`);
