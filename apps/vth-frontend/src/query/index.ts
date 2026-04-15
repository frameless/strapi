const gql = (query: any) => query;

export const GET_NOT_FOUND_PAGE = gql(`
query getNotFoundPage {
  notFoundPage {
    title
    body
  }
}
`);

export const GET_HOMEPAGE = gql(`
query getHomepage($pageMode: PublicationStatus) {
  homepage(status: $pageMode) {
    title
    content
    bannerImage {
      url
      alternativeText
    }
  }

  navigationPages(
    status: $pageMode
    sort: ["order:asc", "title:asc"]
  ) {
    documentId
    title
    slug
    description
    previewImage {
      url
      alternativeText
    }
  }
}
`);

export const GET_NAVIGATION_PAGES = gql(`
query getNavigationPages($pageMode: PublicationStatus) {
  navigationPages(
    status: $pageMode
    sort: ["order:asc", "title:asc"]
    pagination: { start: 0, limit: -1 }
  ) {
    documentId
    title
    slug
    updatedAt
  }
}
`);

export const GET_NAVIGATION_PAGE_BY_SLUG = gql(`
query GET_NAVIGATION_PAGE_BY_SLUG($slug: String, $pageMode: PublicationStatus) {
  navigationPages(
    filters: { slug: { eq: $slug } }
    status: $pageMode
  ) {
    documentId
    title
    description
    slug

    content {
      __typename
      ... on ComponentComponentsUtrechtRichText {
        content
      }
      ... on ComponentComponentsUtrechtAccordion {
        item {
          id
          label
          body
          headingLevel
        }
      }
    }

    theme_pages {
      title
      slug
      description
      previewImage {
        url
        alternativeText
      }
    }

    article_pages {
      title
      slug
      description
      previewImage {
        url
        alternativeText
      }
    }
  }
}
`);

export const GET_THEME_BY_SLUG = gql(`
query GET_THEME_BY_SLUG($slug: String, $pageMode: PublicationStatus) {
  themePages(
    filters: { slug: { eq: $slug } }
    status: $pageMode
  ) {
    documentId
    title
    description
    slug

    content {
      __typename
      ... on ComponentComponentsUtrechtRichText {
        content
      }
      ... on ComponentComponentsUtrechtAccordion {
        item {
          id
          label
          body
          headingLevel
        }
      }
    }

    navigation_pages {
      title
      slug

      theme_pages {
        title
        slug
      }

      article_pages {
        title
        slug
      }
    }

    article_pages {
      title
      slug
      description
      previewImage {
        url
        alternativeText
      }
    }
  }
}
`);

export const GET_ALL_THEME_SLUGS = gql(`
query getAllThemeSlugs {
  themePages(
    sort: ["title:asc"]
    pagination: { start: 0, limit: -1 }
  ) {
    documentId
    title
    slug
    updatedAt
  }
}
`);

export const GET_ALL_ARTICLES_SLUGS = gql(`
query getAllAriclesSlugs {
  articlePages(
    pagination: { start: 0, limit: -1 }
    sort: ["title:asc"]
  ) {
    title
    slug
    updatedAt
  }
}
`);

export const GET_ARTICLE_BY_SLUG = gql(`
query GET_ARTICLE_BY_SLUG($slug: String, $pageMode: PublicationStatus) {
  articlePages(
    filters: { slug: { eq: $slug } }
    status: $pageMode
  ) {
    documentId
    title
    description
    slug

    content {
      __typename
      ... on ComponentComponentsUtrechtRichText {
        content
      }
      ... on ComponentComponentsUtrechtAccordion {
        item {
          id
          label
          body
          headingLevel
        }
      }
    }

    theme_pages {
      title
      slug

      navigation_pages {
        title
        slug
      }

      article_pages {
        title
        slug
      }
    }

    navigation_pages {
      title
      slug

      article_pages {
        title
        slug
      }

      theme_pages {
        title
        slug
      }
    }
  }
}
`);

export const GET_PRINT_PAGE = gql(`
query GET_PRINT_PAGE {
  printPage {
    title
    versiondate
    introductionBody
  }

  navigationPages(sort: ["order:asc", "title:asc"]) {
    documentId
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

    article_pages {
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
`);

export const GET_NAVIGATION_DATA = gql(`
query getNavigationData(
  $pageMode: PublicationStatus
  $themeSlug: String
  $articleSlug: String
) {
  navigationPages(
    status: $pageMode
    sort: ["order:asc", "title:asc"]
    pagination: { start: 0, limit: -1 }
  ) {
    title
    slug

    theme_pages(
      filters: {
        slug: { eq: $themeSlug }
        article_pages: { slug: { eq: $articleSlug } }
      }
    ) {
      title
      slug

      article_pages {
        title
        slug
      }
    }

    article_pages(
      filters: {
        theme_pages: { slug: { eq: $themeSlug } }
        slug: { eq: $articleSlug }
      }
    ) {
      title
      slug

      theme_pages {
        title
        slug
      }
    }
  }

  currentLink: navigationPages(
    status: $pageMode
    filters: {
      theme_pages: { slug: { eq: $themeSlug } }
      article_pages: { slug: { eq: $articleSlug } }
    }
  ) {
    title
    slug
    order

    theme_pages {
      slug
      title

      article_pages {
        title
        slug
      }
    }

    article_pages {
      title
      slug

      theme_pages {
        title
        slug
      }
    }
  }
}
`);
