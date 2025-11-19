const gql = (query: any) => query;

export const GET_PDC_HOME_PAGE = gql(`
query getPDCHomePage($locale: I18NLocaleCode, $pageMode: PublicationState) {
  pdcHomePage(publicationState: $pageMode, locale: $locale) {
    data {
      attributes {
        components {
          ... on ComponentComponentsUtrechtTopTasks {
            __typename
            link {
              id
              textContent
              href
              topTaskIcons
            }
          }
        }
      }
    }
  }
}
`);

export const GET_ALL_PRODUCTS_SLUG = gql(`
  query getAllProductsSlugQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {
      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, sort: "title") {
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

export const GET_ALL_PRODUCTS_SITEMAP = gql(`
  query getAllProductsSitemap {
      products(locale: "all", pagination:{ start: 0, limit: -1}) {
      data {
        attributes {
          slug
          locale
          updatedAt
        }
      }
    }
  }
`);

export const GET_ALPHABETICALLY_PRODUCTS_BY_LETTER = gql(`
  query getAlphabeticallyProductsByLetterQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $startsWith: String) {
      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, filters: { title: { startsWith: $startsWith } }, sort: "title") {
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
        enable_kcm_survey
        sections {
          ... on ComponentComponentsContactInformationPublic {
            __typename
            contact_information_public {
              data {
                attributes {
                  contentBlock(pagination: { start: 0, limit: -1 }) {
                    id
                    content
                  }
                }
              }
            }
          }
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
            appearance
            href
            label
            logo
            openFormsEmbed
            textContent
          }
          ... on ComponentComponentsFloLegalForm {
            __typename
            id
            floLegalFormSelector
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
            __typename
            href
            textContent
            icon
            language
          }
          ... on ComponentComponentsFaq {
            __typename
            pdc_faq {
              data {
                attributes {
                  title
                  faq (pagination: {start: 0, limit: -1}) {
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
            __typename
            item (pagination: {start: 0, limit: -1}) {
              body
              headingLevel
              id
              label
            }
          }
        }
        price {
          data {
            attributes {
              price( pagination: {start: 0, limit: -1} ) {
                currency
                id
                label
                uuid
                value
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
export const GET_PRODUCTS_OLD_SLUGS = gql(`
query getProductsOldSlugs($locale: I18NLocaleCode) {
  products(
    pagination: { start: 0, limit: -1 }
    filters: { oldSlugs: { ne: null } }
    locale: $locale
  ) {
    data {
      attributes {
        slug
        oldSlugs
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

export const GET_TEMPLATE = gql(`
query getTemplateData($locale: I18NLocaleCode, $pageMode: PublicationState) {
  pdcTemplate(publicationState: $pageMode, locale: $locale) {
    data {
      attributes {
        sections {
          ... on ComponentComponentsUtrechtNavigation {
            __typename
            navigationList {
              id
              textContent
              href
            }
          }
          ... on ComponentComponentsUtrechtFooter {
            __typename
            title
            list {
              id
              listItem {
                id
                title
                link {
                  id
                  textContent
                  href
                }
              }
            }
            address
            socialMediaList {
              id
              link {
                id
                textContent
                href
                icon
              }
            }
          }
        }
      }
    }
  }
}

`);

export const GET_OPEN_FORMS_TEMPLATE = gql(`
query getOpenFormsTemplateData($locale: I18NLocaleCode, $pageMode: PublicationState) {
  pdcTemplate(publicationState: $pageMode, locale: $locale) {
    data {
      attributes {
        sections {
          ... on ComponentComponentsUtrechtNavigation {
            __typename
            navigationList {
              id
              textContent
              href
            }
          }
          ... on ComponentComponentsUtrechtFooter {
            __typename
            title
            list {
              id
              listItem {
                id
                title
                link {
                  id
                  textContent
                  href
                }
              }
            }
            address
          }
        }
      }
    }
  }
}

`);

export const GET_OPEN_FORMS_ERROR_PAGE = gql(`
    query getOpenFormsErrorPage($locale: I18NLocaleCode, $pageMode: PublicationState, $type: String) {
    openFormsErrorPages(publicationState: $pageMode, locale: $locale, filters: { type: { eq: $type } }) {
      data {
        id
        attributes {
          title
          body
          type
        }
      }
    }
  }
`);

export const GET_WEBSITE_SETTINGS = gql(`
  query getWebsiteSettings {
  websiteSetting {
    data {
      attributes {
        triggerMatomoScript {
          trackingScripts(pagination: { start: 0, limit: -1 }) {
            id
            slug
            enabled
          }
        }
      }
    }
  }
}
`);
