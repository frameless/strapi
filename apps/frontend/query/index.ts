import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_SLUG = gql`
  query getAllProductsSlugQuery($locale: I18NLocaleCode) {
    products(locale: $locale) {
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
          localizations {
            data {
              attributes {
                locale
                slug
              }
            }
          }
          flexibleSection {
            id
            title
            subTitle
            option1
            digidButton {
              id
              label
              href
              logo {
                data {
                  attributes {
                    name
                    width
                    height
                    url
                    alternativeText
                  }
                }
              }
              appearance
            }
            accordion {
              id
              title
              body
            }
          }
          body
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
