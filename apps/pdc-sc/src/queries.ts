const gql = (query: any) => query;

export const GET_SAMENWERKENDECATALOGI_FETCH = gql(`
query getSamenwerkendeCatalogiFetch($locale: I18NLocaleCode) {
  products(locale: $locale, pagination: { start: 0, limit: -1 }) {
    documentId
    title
    slug
    locale
    updatedAt
    metaTags {
      description
    }
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
    pdc_metadata {
      uplProductNaam
    }
  }
}
`);
