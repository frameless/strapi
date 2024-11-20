const gql = (query: any) => query;
export const GET_ALL_PRODUCTS = gql(`
query getAllProducts(
  $locale: I18NLocaleCode
  $page: Int
  $pageSize: Int
  $start: Int
  $limit: Int
) {
  products(
    locale: $locale
    pagination: {
      start: $start
      limit: $limit
      page: $page
      pageSize: $pageSize
    }
  ) {
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
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
            component: __typename
          }
          ... on ComponentComponentsInternalBlockContent {
            component: __typename
            internal_field {
              data {
                attributes {
                  content {
                    uuid
                    contentBlock {
                      content
                      kennisartikelCategorie
                    }
                  }
                }
              }
            }
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
              ... on ComponentComponentsInternalBlockContent {
                component: __typename
                internal_field {
                  data {
                    attributes {
                      content {
                        uuid
                        contentBlock {
                          content
                          kennisartikelCategorie
                        }
                      }
                    }
                  }
                }
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
export const GET_ALL_VAC_ITEMS = gql(`
query getAllVacItems($page: Int, $pageSize: Int, $start: Int, $limit: Int) {
  vacs(
    pagination: {
      start: $start
      limit: $limit
      page: $page
      pageSize: $pageSize
    }
  ) {
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
    data {
      id
      attributes {
        createdAt
        updatedAt
        vac {
          uuid
          vraag: label
          antwoord: body
          status
          doelgroep
          afdelingen {
            afdelingId
            afdelingnaam
          }
          toelichting
          trefwoorden {
            trefwoord
          }
        }
      }
    }
  }
}
`);
export const GET_VAC_ITEM_BY_UUID = gql(`
query getVacItemByUUID($uuid: String) {
  vacs(
    filters: { vac: { uuid: { eq: $uuid }}}
  ) {
    data {
      id
      attributes {
        createdAt
        updatedAt
        vac {
          uuid
          vraag: label
          antwoord: body
          status
          doelgroep
          afdelingen {
            afdelingId
            afdelingnaam
          }
          toelichting
          trefwoorden {
            trefwoord
          }
        }
      }
    }
  }
}
`);
export const CREATE_VAC = gql(`
  mutation createVac($data: VacInput!) {
  createVac(data: $data){
    data {
      id
      attributes {
        createdAt
        publishedAt
        vac {
          id
          vraag
					antwoord
          status
          doelgroep
          uuid
          toelichting
          afdelingen {
            afdelingId
            afdelingNaam
          }
          trefwoorden {
             id
            trefwoord
          }
        }
      }
    }
  }
}
`);

export const UPDATE_VAC = gql(`
mutation updateVac ($data: VacInput!, $id: ID!){
  updateVac(id: $id, data: $data){
    data {
      id
      attributes {
        createdAt
        publishedAt
        vac {
          id
          vraag
					antwoord
          status
          doelgroep
          uuid
          toelichting
          afdelingen {
            afdelingId
            afdelingNaam
          }
          trefwoorden {
             id
            trefwoord
          }
        }
      }
    }
  }
}
`);
