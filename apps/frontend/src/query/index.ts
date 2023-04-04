import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_SLUG = gql`
  query getAllProductsSlugQuery($locale: I18NLocaleCode) {
    products(locale: $locale) {
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
`;

export const GET_SAMENWERKENDECATALOGI = gql`
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
`;

export const GET_ALL_SLUGS = gql`
  query getAllSlugsQuery {
    products(locale: "all") {
      data {
        attributes {
          slug
          title
          locale
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {
    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {
      data {
        id
        attributes {
          title
          slug
          excerpt
          metaTags {
            keymatch
          }
          sections {
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
                logoButton {
                  __typename
                  label
                  href
                  text
                  logo
                  logo_button_appearance
                }
                buttonLink {
                  __typename
                  label
                  href
                  text
                  icon
                  button_link_appearance
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
`;

export const GET_PRODUCT_BY_SLUG_AND_LOCALE = gql`
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
`;
