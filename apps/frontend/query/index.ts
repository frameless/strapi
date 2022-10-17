import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_SLUG = gql`
  query getAllProductsSlugQuery ($locale: I18NLocaleCode){
    products(locale:$locale) {
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
  query getAllSlugsQuery{
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
query getProductBySlug($slug: String, $locale: I18NLocaleCode){
  products(filters: {slug: {eq: $slug}}, locale: $locale){
    data{
      id
      attributes{
        title
        slug
        excerpt
        localizations{
          data{
            attributes{
              locale
              slug
            }
          }
        }
        flexibleSection{
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
          accordion{
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
