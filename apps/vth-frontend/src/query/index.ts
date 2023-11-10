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

export const GET_HOMEPAGE = gql(`
query getHomepage {
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
  hoofditems {
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

export const GET_HOOFDITEMS = gql(`
query getHoofditems {
  hoofditems {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
}`);

export const GET_HOOFDITEM_BY_SLUG = gql(`
query GET_HOOFDITEM_BY_SLUG($slug: String) {
  findSlug(modelName:"hoofditem", slug: $slug){
    ... on HoofditemEntityResponse{
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
          themas {
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
          contents {
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
          hoofditems {
            data {
              attributes {
                title
                slug
                themas {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                contents {
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
          contents {
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
query GET_CONTENT_BY_SLUG($slug: String) {
  findSlug(modelName:"thema-content", slug: $slug){
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
          themas {
            data {
              attributes {
                title
                slug
                hoofditems {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                contents {
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
          hoofditems {
            data {
              attributes {
                themas {
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
