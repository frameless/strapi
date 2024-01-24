const gql = (query: any) => query;

export const GET_ALL_PRODUCTS_SLUG = gql(`
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
          metaTags {
            description
          }
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
          metaTags {
            description
          }
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

export const GET_PRODUCT_BY_SLUG = gql(`
  query getProductBySlug(
  $slug: String
  $locale: I18NLocaleCode
  $pageMode: PublicationState
) {
  products(
    filters: { slug: { eq: $slug } }
    locale: $locale
    publicationState: $pageMode
  ) {
    data {
      id
      attributes {
        title
        slug
        metaTags {
          title
          description
          keymatch
          ogImage {
            data {
              attributes {
                url
              }
            }
          }
        }
        content
        sections {
          ... on ComponentComponentsUtrechtImage {
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
          ... on ComponentComponentsUtrechtLogoButton {
            __typename
            label
            href
            textContent
            appearance
            logo
          }
          ... on ComponentComponentsUtrechtSpotlight {
            __typename
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
            __typename
            content
          }
          ... on ComponentComponentsUtrechtMultiColumnsButton {
            __typename
            column {
              id
              title
              logoButton {
                __typename
                label
                href
                textContent
                logo
                appearance
              }
            }
          }
          ... on ComponentComponentsUtrechtLink {
            __typename
            href
            textContent
            iconList: icon
          }
          ... on ComponentComponentsFaq {
            __typename
            pdc_faq {
              data {
                attributes {
                  title
                  faq {
                    id
                    label
                    body
                  }
                }
              }
            }
          }
          ... on ComponentComponentsUtrechtAccordion {
            __typename
            item {
              id
              label
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

export const GET_PRODUCT_BY_SLUG_AND_LOCALE = gql(`
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
