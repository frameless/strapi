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
  navigationPages(publicationState: $pageMode, sort: ["order:asc", "title:asc"]) {
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

export const GET_NAVIGATION_PAGES = gql(`
query getNavigationPages($pageMode: PublicationState) {
  navigationPages(
    publicationState: $pageMode
    sort: ["order:asc", "title:asc"]
    pagination: { start: 0, limit: -1 }
  ) {
    data {
      id
      attributes {
        title
        slug
        updatedAt
      }
    }
  }
}`);

export const GET_NAVIGATION_PAGE_BY_SLUG = gql(`
query GET_NAVIGATION_PAGE_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(
    modelName: "navigation-page"
    slug: $slug
    publicationState: $pageMode
  ) {
    ... on NavigationPageEntityResponse {
      data {
        id
        attributes {
          title
          description
          slug
          content {
            ... on ComponentComponentsUtrechtRichText {
              __typename
              content
            }
            ... on ComponentComponentsUtrechtAccordion {
              __typename
              item {
                id
                label
                body
                headingLevel
              }
            }
          }
          theme_pages {
            data {
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
          article_pages {
            data {
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
        }
      }
    }
  }
}
`);

export const GET_THEME_BY_SLUG = gql(`
query GET_THEME_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(modelName: "theme-page", slug: $slug, publicationState: $pageMode) {
    ... on ThemePageEntityResponse {
      data {
        id
        attributes {
          title
          description
          content {
            ... on  ComponentComponentsUtrechtRichText{
              __typename
              content
            }
            ... on ComponentComponentsUtrechtAccordion {
              __typename
              item {
                id
                label
                body
                headingLevel
              }
            }
          }
          navigation_pages {
            data {
              attributes {
                title
                slug
                theme_pages {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                article_pages {
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
          article_pages {
            data {
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
        }
      }
    }
  }
}
`);

export const GET_ALL_THEME_SLUGS = gql(`
query getAllThemeSlugs {
  themePages(sort: ["title:asc"], pagination: { start: 0, limit: -1 }) {
    data {
      id
      attributes {
        title
        slug
        updatedAt
      }
    }
  }
}
`);

export const GET_ALL_ARTICLES_SLUGS = gql(`
query getAllAriclesSlugs {
  articlePages(pagination: { start: 0, limit: -1 }, sort: ["title:asc"]) {
    data {
      attributes {
        title
        slug
        updatedAt
      }
    }
  }
}
`);

export const GET_ARTICLE_BY_SLUG = gql(`
query GET_ARTICLE_BY_SLUG($slug: String, $pageMode: String) {
  findSlug(
    modelName: "article-page"
    slug: $slug
    publicationState: $pageMode
  ) {
    ... on ArticlePageEntityResponse {
      data {
        id
        attributes {
          title
          description
          content {
            ... on ComponentComponentsUtrechtRichText {
              __typename
              content
            }
            ... on ComponentComponentsUtrechtAccordion {
              __typename
              item {
                id
                label
                body
                headingLevel
              }
            }
          }
          theme_pages {
            data {
              attributes {
                title
                slug
                navigation_pages {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                article_pages {
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
          navigation_pages {
            data {
              attributes {
                title
                slug
                article_pages {
                  data {
                    attributes {
                      title
                      slug
                    }
                  }
                }
                theme_pages {
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
}
`);

export const GET_PRINT_PAGE = gql(`
query GET_PRINT_PAGE {
  printPage {
    data {
      attributes {
        title
        versiondate
        introductionBody
      }
    }
  }
  navigationPages(sort: ["order:asc", "title:asc"]){
    data {
      id
      attributes {
        title
        content {
          ... on ComponentComponentsUtrechtRichText {
            __typename
            content
          }
          ... on ComponentComponentsUtrechtAccordion {
            __typename
            item {
              id
              label
              body
              headingLevel
            }
          }
        }
        theme_pages {
          data {
            attributes {
              title
              content {
                ... on ComponentComponentsUtrechtRichText {
                  __typename
                  content
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
              article_pages {
                data {
                  attributes {
                    title
                    content {
                      ... on ComponentComponentsUtrechtRichText {
                        __typename
                        content
                      }
                      ... on ComponentComponentsUtrechtAccordion {
                        __typename
                        item {
                          id
                          label
                          body
                          headingLevel
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        article_pages {
          data {
            attributes {
              title
              content {
                ... on ComponentComponentsUtrechtRichText {
                  __typename
                  content
                }
                ... on ComponentComponentsUtrechtAccordion {
                  __typename
                  item {
                    id
                    label
                    body
                    headingLevel
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
