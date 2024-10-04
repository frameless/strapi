const gql = (query: any) => query;
export const SEARCH_PRODUCT = gql(`
    query searchProduct($locale: I18NLocaleCode) {
        products(
        locale: $locale, 
        pagination: {start: 0, limit: -1}, 
        filters: { slug: {eq: "aansprakelijk-stellen-gemeente-schade-melden"}}
        ) {
          data {
            id
            attributes {
              title
              slug
              uuid
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
                productCode
                uitvoeringsorganisatie
                doelgroep
              }
            }
          }
        }
      }
`);
