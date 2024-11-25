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
          ... on ComponentComponentsUtrechtRichText {
            id
            content
            kennisartikelCategorie
            component: __typename
          }
          ... on ComponentComponentsUtrechtImage {
            component: __typename
            categorie2:kennisartikelCategorie
            imageData {
              data {
                attributes {
                  name
                  alternativeText
                  caption
                  width
                  height
                  formats
                  url
                }
              }
            }
          }
          ... on ComponentComponentsUtrechtLogoButton {
            component: __typename
            categorie3:kennisartikelCategorie
            appearance
            href
            label
            logo
            openFormsEmbed
            textContent
          }
          ... on ComponentComponentsUtrechtSpotlight {
            component: __typename
            categorie4:kennisartikelCategorie
            content
            type
            logoButton {
              id
              label
              href
              textContent
              logo
              appearance
              __typename
            }
          }
          ... on ComponentComponentsUtrechtRichText {
            component: __typename
            categorie5:kennisartikelCategorie
            content
          }
          ... on ComponentComponentsUtrechtMultiColumnsButton {
            component: __typename
            categorie6:kennisartikelCategorie
            column {
              id
              title
              logoButton {
                component: __typename
                appearance
                href
                label
                logo
                openFormsEmbed
                textContent
              }
            }
          }
          ... on ComponentComponentsUtrechtLink {
            component: __typename
            categorie7:kennisartikelCategorie
            href
            textContent
            icon
            language
          }
          ... on ComponentComponentsFaq {
            component: __typename
            categorie8:kennisartikelCategorie
            pdc_faq {
              data {
                attributes {
                  title
                  faq(pagination: { start: 0, limit: -1 }) {
                    body
                    headingLevel
                    id
                    label
                  }
                }
              }
            }
          }
          ... on ComponentComponentsUtrechtAccordion {
            component: __typename
            categorie9:kennisartikelCategorie
            item(pagination: { start: 0, limit: -1 }) {
              body
              headingLevel
              id
              label
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
            afdelingNaam
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
          ... on ComponentComponentsUtrechtRichText {
            id
            content
            kennisartikelCategorie
            component: __typename
          }
          ... on ComponentComponentsUtrechtImage {
            component: __typename
            categorie2:kennisartikelCategorie
            imageData {
              data {
                attributes {
                  name
                  alternativeText
                  caption
                  width
                  height
                  formats
                  url
                }
              }
            }
          }
          ... on ComponentComponentsUtrechtLogoButton {
            component: __typename
            categorie3:kennisartikelCategorie
            appearance
            href
            label
            logo
            openFormsEmbed
            textContent
          }
          ... on ComponentComponentsUtrechtSpotlight {
            component: __typename
            categorie4:kennisartikelCategorie
            content
            type
            logoButton {
              id
              label
              href
              textContent
              logo
              appearance
              __typename
            }
          }
          ... on ComponentComponentsUtrechtRichText {
            component: __typename
            categorie5:kennisartikelCategorie
            content
          }
          ... on ComponentComponentsUtrechtMultiColumnsButton {
            component: __typename
            categorie6:kennisartikelCategorie
            column {
              id
              title
              logoButton {
                component: __typename
                appearance
                href
                label
                logo
                openFormsEmbed
                textContent
              }
            }
          }
          ... on ComponentComponentsUtrechtLink {
            component: __typename
            categorie7:kennisartikelCategorie
            href
            textContent
            icon
            language
          }
          ... on ComponentComponentsFaq {
            component: __typename
            categorie8:kennisartikelCategorie
            pdc_faq {
              data {
                attributes {
                  title
                  faq(pagination: { start: 0, limit: -1 }) {
                    body
                    headingLevel
                    id
                    label
                  }
                }
              }
            }
          }
          ... on ComponentComponentsUtrechtAccordion {
            component: __typename
            categorie9:kennisartikelCategorie
            item(pagination: { start: 0, limit: -1 }) {
              body
              headingLevel
              id
              label
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
                  afdelingNaam
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
          vraag
          antwoord
          status
          doelgroep
          afdelingen {
            afdelingId
            afdelingNaam
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
          vraag
          antwoord
          status
          doelgroep
          afdelingen {
            afdelingId
            afdelingNaam
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
