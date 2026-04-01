const gql = (query: any) => query;

export const GET_PDC_HOME_PAGE = gql(`
query getPDCHomePage($locale: I18NLocaleCode, $status: PublicationStatus) {
  pdcHomePage(status: $status, locale: $locale) {
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
`);

export const GET_ALL_PRODUCTS_SLUG = gql(`
query getAllProductsSlugQuery(
  $locale: I18NLocaleCode
  $page: Int
  $pageSize: Int
) {
  products_connection(
    locale: $locale
    pagination: { page: $page, pageSize: $pageSize }
    sort: "title"
  ) {
    pageInfo {
      total
      page
      pageSize
      pageCount
    }
    nodes {
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
`);

export const GET_ALL_PRODUCTS_SITEMAP = gql(`
query getAllProductsSitemap {
  products(locale: "nl", pagination: { start: 0, limit: -1 }) {
    slug
    locale
    updatedAt
  }
}
`);

export const GET_ALPHABETICALLY_PRODUCTS_BY_LETTER = gql(`
query getAlphabeticallyProductsByLetterQuery(
  $locale: I18NLocaleCode
  $page: Int
  $pageSize: Int
  $startsWith: String
) {
  products_connection(
    locale: $locale
    pagination: { page: $page, pageSize: $pageSize }
    filters: { title: { startsWith: $startsWith } }
    sort: "title"
  ) {
    pageInfo {
      total
      page
      pageSize
      pageCount
    }
    nodes {
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
`);

export const CHECK_ALPHABETICALLY_PRODUCTS_AVAILABILITY = gql(`
  query checkAlphabeticallyProductsAvailability($locale: I18NLocaleCode, $startsWith: String) {
      products(locale: $locale, filters: { title: { startsWith: $startsWith } }) {
          title
      }
    }
`);

export const GET_PRODUCT_BY_SLUG = gql(`
query getProductBySlug(
  $slug: String
  $locale: I18NLocaleCode
  $status: PublicationStatus
) {
  products(
    filters: { slug: { eq: $slug } }
    locale: $locale
    status: $status
  ) {
    documentId
    title
    slug
    metaTags {
      title
      description
      keymatch
      ogImage {
        url
      }
    }
    content
    enable_kcm_survey
    sections {
      __typename
      ... on ComponentComponentsContactInformationPublic {
        contact_information_public {
          contentBlock(pagination: { start: 0, limit: -1 }) {
            id
            content
          }
        }
      }
      ... on ComponentComponentsUtrechtImage {
        imageData {
          name
          alternativeText
          caption
          width
          height
          formats
          url
        }
      }
      ... on ComponentComponentsUtrechtLogoButton {
        appearance
        href
        label
        logo
        openFormsEmbed
        textContent
      }
      ... on ComponentComponentsFloLegalForm {
        id
        floLegalFormSelector
      }
      ... on ComponentComponentsUtrechtSpotlight {
        content
        type
        logoButton {
          id
          label
          href
          textContent
          logo
          appearance
        }
      }
      ... on ComponentComponentsUtrechtRichText {
        content
      }
      ... on ComponentComponentsUtrechtMultiColumnsButton {
        column {
          id
          title
          logoButton {
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
        href
        textContent
        icon
        language
      }
      ... on ComponentComponentsFaq {
        pdc_faq {
          title
          faq(pagination: { start: 0, limit: -1 }) {
            body
            headingLevel
            id
            label
          }
        }
      }
      ... on ComponentComponentsUtrechtAccordion {
        item(pagination: { start: 0, limit: -1 }) {
          body
          headingLevel
          id
          label
        }
      }
    }
    price {
      price(pagination: { start: 0, limit: -1 }) {
        currency
        id
        label
        uuid
        value
      }
    }
    localizations {
      locale
      slug
    }
    locale
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
    slug
    oldSlugs
  }
}
`);

export const GET_PRODUCT_BY_SLUG_AND_LOCALE = gql(`
query getProductBySlugAndLocale(
  $slug: String
  $locale: I18NLocaleCode
  $status: PublicationStatus
) {
  products(
    filters: { slug: { eq: $slug } }
    locale: $locale
    status: $status
  ) {
    slug
    locale
  }
}
`);

export const GET_NOT_FOUND_PAGE = gql(`
query getNotFoundPage($locale: I18NLocaleCode) {
  notFoundPage(locale: $locale) {
    title
    body
  }
}
`);

export const GET_TEMPLATE = gql(`
query getTemplateData($locale: I18NLocaleCode, $status: PublicationStatus) {
  pdcTemplate(status: $status, locale: $locale) {
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
`);

export const GET_OPEN_FORMS_TEMPLATE = gql(`
query getOpenFormsTemplateData(
  $locale: I18NLocaleCode
  $status: PublicationStatus
) {
  pdcTemplate(status: $status, locale: $locale) {
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
`);

export const GET_OPEN_FORMS_ERROR_PAGE = gql(`
query getOpenFormsErrorPage(
  $locale: I18NLocaleCode
  $status: PublicationStatus
  $type: String
) {
  openFormsErrorPages(
    status: $status
    locale: $locale
    filters: { type: { eq: $type } }
  ) {
    documentId
    title
    body
    type
  }
}
`);

export const GET_WEBSITE_SETTINGS = gql(`
query getWebsiteSettings {
  websiteSetting {
    triggerMatomoScript {
      trackingScripts(pagination: { start: 0, limit: -1 }) {
        id
        slug
        enabled
      }
    }
  }
}
`);
