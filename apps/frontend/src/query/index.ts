const gql = (query: any) => query;

export const GET_ALL_PRODUCTS_SLUG_FETCH = gql(`
  query getAllProductsSlugQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {
      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }) {
        meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        attributes {
          slug
          title
          locale
          updatedAt
        }
      }
    }
  }
`);

export const GET_ALPHABETICALLY_PRODUCTS_BY_LETTER = gql(`
  query getAlphabeticallyProductsByLetterQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $startsWith: String) {
      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, filters: { title: { startsWith: $startsWith } }) {
        meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        attributes {
          slug
          title
          locale
          updatedAt
        }
      }
    }
  }
`);

export const CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY = gql(`
  query checkAlphabeticallyProductsAvailability($locale: I18NLocaleCode, $startsWith: String) {
      products(locale: $locale, filters: { title: { startsWith: $startsWith } }) {
      data {
        attributes {
          title
        }
      }
    }
  }
`);

export const GET_SAMENWERKENDECATALOGI_FETCH = gql(`
  query getSamenwerkendecatalogi($locale: I18NLocaleCode) {
    products(locale: $locale) {
      data {
        id
        attributes {
          title
          excerpt
          slug
          locale
          updatedAt
          catalogiMeta {
            uniformProductName
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
        }
      }
    }
  }
`);

export const GET_PRODUCT_BY_SLUG_FETCH = gql(`
  query getProductBySlug($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {
    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {
      data {
        id
        attributes {
          title
          slug
          excerpt
          metaTags {
            title
            description
            keymatch
          }
          sections {
            ... on ComponentComponentsImage {
              __typename
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
            ... on ComponentComponentsLogoButton {
              __typename
              label
              href
              text
              logo_button_appearance
              logo
            }
            ... on ComponentComponentsSpotlight {
              __typename
              aside
              content
              type
            }
            ... on ComponentComponentsBlockContent {
              __typename
              content
            }
            ... on ComponentComponentsMultiColumnsButton {
              __typename
              column {
                id
                title
                headingLevel
                logoButton {
                  __typename
                  label
                  href
                  text
                  logo
                  logo_button_appearance
                }
              }
            }
            ... on ComponentComponentsButtonLink {
              __typename
              label
              href
              text
              icon
              button_link_appearance
            }
            ... on ComponentComponentsFaq {
              __typename
              faq {
                data {
                  attributes {
                    title
                    faq {
                      accordion {
                        id
                        title
                        body
                      }
                    }
                  }
                }
              }
            }

            ... on ComponentComponentsAccordionSection {
              __typename
              item {
                id
                title
                body
              }
            }
          }
          price {
            data {
              attributes {
                price {
                  id
                  label
                  value
                  currency
                }
              }
            }
          }
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          locale
        }
      }
    }
  }
`);

export const GET_PRODUCT_BY_SLUG_AND_LOCALE_FETCH = gql(`
  query getProductBySlugAndLocale($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {
    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {
      data {
        attributes {
          slug
          locale
        }
      }
    }
  }
`);

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

export const GET_SEARCH_TIP_PAGE = gql(`
  query getSearchTip ($locale: I18NLocaleCode){
    searchTip (locale: $locale){
      data {
        attributes {
          seo {
            title
            description
          }
          title
          body
        }
      }
    }
  }
`);

export const GET_VISUALISATIES = gql(`
  query GetVisualisaties {
    visualisatie {
    data {
      id,
      attributes {
        title,
        body,
        visualisatie {
          id,
          title,
          specification
        }
      }
    }
  }
}`);
