const gql = (query: any) => query;
export const GET_ALL_PRODUCTS = gql(`
    query getAllProducts($locale: I18NLocaleCode) {
        products(
        locale: $locale, 
        pagination: {start: 0, limit: -1}, 
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
              kennisartikelMetadata {
                uuid
                doelgroep
                productAanwezig
                productValtOnder
                afdelingen {
                  afdelingId
                  afdelingnaam
                }
                verantwoordelijkeOrganisatie {
                  owmsIdentifier
                  owmsPrefLabel
                  owmsEndDate
                }
                upnUri
              }
            }
          }
        }
      }
`);

export const GET_PRODUCT_BY_UUID = gql(`
  query getProductByUUID($locale: I18NLocaleCode, $uuid: String) {
      products(
      locale: $locale, 
      filters: { uuid: { eq: $uuid }}
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
            kennisartikelMetadata {
                uuid
                doelgroep
                productAanwezig
                productValtOnder
                afdelingen {
                  afdelingId
                  afdelingnaam
                }
                verantwoordelijkeOrganisatie {
                  owmsIdentifier
                  owmsPrefLabel
                  owmsEndDate
                }
                upnUri
              }
          }
        }
      }
    }
`);
