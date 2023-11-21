const gql = (query: any) => query;

export const GET_NOT_FOUND_PAGE = gql(`
query getNotFoundPage{
  notFoundPage {
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
query getHomepage($pageMode: PublicationState) {
  homepage(publicationState: $pageMode) {
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
  hoofditems (publicationState: $pageMode) {
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
query getHoofditems($pageMode: PublicationState) {
  hoofditems(publicationState: $pageMode) {
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
query GET_HOOFDITEM_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(modelName:"hoofditem", slug: $slug, publicationState: $pageMode){
    ... on HoofditemEntityResponse{
      data{
        id
        attributes{
          title
          description
          slug
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
query GET_THEMA_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(modelName:"thema", slug: $slug, publicationState: $pageMode){
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
query GET_CONTENT_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(modelName:"article-page", slug: $slug, publicationState: $pageMode){
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
                title
                slug
                contents {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
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
