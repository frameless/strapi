const gql = (query: any) => query;

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

export const GET_HOME_PAGE = gql(`
query getHomePage {
  homepage {
    data {
      attributes {
        title
        content
        bannerImage {
          data {
            attributes {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
  themas(filters: { parents: { id: null } }) {
    data {
      id
      attributes {
        title
        slug
        description
        previewImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`);

export const GET_HOOFD_THEMAS = gql(`
query getHoofdThemas {
  themas(filters: { parents: { id: null } }) {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
}`);

export const GET_THEMA_BY_SLUG = gql(`
query GET_THEMA_BY_SLUG($slug: String) {
  findSlug(modelName:"thema", slug: $slug){
    ... on ThemaEntityResponse{
      data{
        id
        attributes{
          title
          description
          content {
            ... on ComponentComponentsBlockContent {
              __typename
              content
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
          parents {
            data {
              attributes {
                title
                slug
                child_themas {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                child_contents {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
          child_themas {
            data {
              attributes {
                title,
                slug,
                description,
                previewImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          child_contents {
            data {
              attributes {
                title,
                slug,
                description,
                previewImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`);

export const GET_CONTENT_BY_SLUG = gql(`
query GET_CONTENT_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(modelName:"thema-content", slug: $slug, publicationState: $pageMode) {
    ... on ThemaContentEntityResponse{
      data{
        id
        attributes{
          title
          description
          content {
            ... on ComponentComponentsBlockContent {
              __typename
              content
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
          parents {
            data {
              attributes {
                title
                slug
                parents {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                child_themas {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                child_contents {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`);

export const GET_PRINT_PAGE = gql(`
query GET_PRINT_PAGE {
  homepage {
    data {
      attributes {
        title
        bannerImage {
          data {
            attributes {
              url
            }
          }
        }
        content
      }
    }
  }
  themas(filters: { parents: { id: null } }) {
    data {
      id
      attributes {
        title
        updatedAt
        content {
          ... on ComponentComponentsBlockContent {
            __typename
            content
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
        child_themas {
          data {
            attributes {
              title
              updatedAt
              content {
                ... on ComponentComponentsBlockContent {
                  __typename
                  content
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
              child_contents {
                data {
                  attributes {
                    title
                    updatedAt
                    content {
                      ... on ComponentComponentsBlockContent {
                        __typename
                        content
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
                  }
                }
              }
            }
          }
        }
        child_contents {
          data {
            attributes {
              title
              updatedAt
              content {
                ... on ComponentComponentsBlockContent {
                  __typename
                  content
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
            }
          }
        }

      }
    }
  }
}`);
