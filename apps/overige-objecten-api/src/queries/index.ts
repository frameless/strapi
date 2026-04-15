const gql = (query: any) => query;
export const GET_ALL_PRODUCTS = gql(`
query getAllProducts(
  $locale: I18NLocaleCode
  $page: Int
  $pageSize: Int
  $start: Int
  $limit: Int
) {
  products_connection(
    locale: $locale
    pagination: {
      start: $start
      limit: $limit
      page: $page
      pageSize: $pageSize
    }
  ) {
    pageInfo {
      total
      page
      pageSize
      pageCount
    }
    nodes {
      id: documentId
      documentId
      content
      title
      slug
      uuid
      locale
      updatedAt
      createdAt
      metaTags {
        keymatch
        title
        description
      }
      sections {
        __typename
        ... on ComponentComponentsContactInformationPublic {
          contact_information_public {
            contentBlock(pagination: { limit: -1 }) {
              id
              content
            }
          }
        }
        ... on ComponentComponentsInternalBlockContent {
          id
          internal_field {
            title
            id: documentId
            contact_information_internal {
              contentBlock(pagination: { limit: -1 }) {
                id
                content
              }
            }
            contact_information_public {
              contentBlock(pagination: { limit: -1 }) {
                id
                content
              }
            }
            content {
              uuid
              contentBlock {
                content
                kennisartikelCategorie
              }
              keywords
            }
          }
        }
        ... on ComponentComponentsUtrechtRichText {
          id
          content
          kennisartikelCategorie
        }
        ... on ComponentComponentsUtrechtImage {
          categorie2: kennisartikelCategorie
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
          categorie3: kennisartikelCategorie
          appearance
          href
          label
          logo
          openFormsEmbed
          textContent
        }
        ... on ComponentComponentsUtrechtSpotlight {
          categorie4: kennisartikelCategorie
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
        ... on ComponentComponentsUtrechtMultiColumnsButton {
          categorie6: kennisartikelCategorie
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
          categorie7: kennisartikelCategorie
          href
          textContent
          icon
          language
        }
        ... on ComponentComponentsFaq {
          categorie8: kennisartikelCategorie
          pdc_faq {
            title
            faq(pagination: { limit: -1 }) {
              body
              headingLevel
              id
              label
            }
          }
        }
        ... on ComponentComponentsUtrechtAccordion {
          categorie9: kennisartikelCategorie
          item(pagination: { limit: -1 }) {
            body
            headingLevel
            id
            label
          }
        }
      }
      additional_information {
        content {
          id
          uuid
          contentBlock(pagination: { limit: -1 }) {
            id
            content
            categorie10: kennisartikelCategorie
          }
        }
      }
      price {
        price(pagination: { limit: -1 }) {
          currency
          id
          label
          uuid
          value
        }
      }
      kennisartikelMetadata {
        uuid
        doelgroep
        productAanwezig
        productValtOnder
        afdelingen {
          afdelingId
          afdelingNaam
        }
        verantwoordelijkeOrganisatie {
          owmsIdentifier
          owmsPrefLabel
          owmsEndDate
        }
        upnUri
      }
    }
  }
}
`);

export const GET_PRODUCT_BY_UUID = gql(`
query getProductByUUIDOrDocumentId(
  $locale: I18NLocaleCode
  $uuid: String
  $documentId: ID
  $status: PublicationStatus
) {
  products(
    locale: $locale
    filters: {
      or: [
        { uuid: { eq: $uuid } }
        { documentId: { eq: $documentId } }
      ]
    }
    status: $status
  ) {
    id: documentId
    publishedAt
    content
    title
    slug
    uuid
    locale
    updatedAt
    createdAt
    metaTags {
      keymatch
      title
      description
    }
    sections {
      ... on ComponentComponentsContactInformationPublic {
        component: __typename
        contact_information_public {
          contentBlock(pagination: { start: 0, limit: -1 }) {
            id
            content
          }
        }
      }
      ... on ComponentComponentsInternalBlockContent {
        component: __typename
        id
        internal_field {
          title
          id: documentId
          contact_information_internal {
            contentBlock(pagination: { start: 0, limit: -1 }) {
              id
              content
            }
          }
          contact_information_public {
            contentBlock(pagination: { start: 0, limit: -1 }) {
              id
              content
            }
          }
          content {
            id
            uuid
            contentBlock {
              content
              kennisartikelCategorie
            }
            keywords
          }
        }
      }
      # Merged RichText fragment to provide both original and aliased fields
      ... on ComponentComponentsUtrechtRichText {
        component: __typename
        id
        content
        kennisartikelCategorie
        categorie5: kennisartikelCategorie
      }
      ... on ComponentComponentsUtrechtImage {
        component: __typename
        categorie2: kennisartikelCategorie
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
        component: __typename
        categorie3: kennisartikelCategorie
        appearance
        href
        label
        logo
        openFormsEmbed
        textContent
      }
      ... on ComponentComponentsUtrechtSpotlight {
        component: __typename
        categorie4: kennisartikelCategorie
        content
        type
        logoButton {
          id
          label
          href
          textContent
          logo
          appearance
          __typename
        }
      }
      ... on ComponentComponentsUtrechtMultiColumnsButton {
        component: __typename
        categorie6: kennisartikelCategorie
        column {
          id
          title
          logoButton {
            component: __typename
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
        component: __typename
        categorie7: kennisartikelCategorie
        href
        textContent
        icon
        language
      }
      ... on ComponentComponentsFaq {
        component: __typename
        categorie8: kennisartikelCategorie
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
        component: __typename
        categorie9: kennisartikelCategorie
        item(pagination: { start: 0, limit: -1 }) {
          body
          headingLevel
          id
          label
        }
      }
    }
    additional_information {
      content {
        id
        uuid
        contentBlock(pagination: { start: 0, limit: -1 }) {
          id
          content
          categorie10: kennisartikelCategorie
          component: __typename
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
    kennisartikelMetadata {
      uuid
      doelgroep
      productAanwezig
      productValtOnder
      afdelingen {
        afdelingId
        afdelingNaam
      }
      verantwoordelijkeOrganisatie {
        owmsIdentifier
        owmsPrefLabel
        owmsEndDate
      }
      upnUri
    }
  }
}
`);

export const GET_PRODUCT_MUTATION_BASE = gql(`
query getProductForUpdate(
  $locale: I18NLocaleCode
  $uuid: String
  $documentId: ID
  $status: PublicationStatus
) {
  products(
    locale: $locale
    filters: {
      or: [
        { uuid: { eq: $uuid } }
        { documentId: { eq: $documentId } }
      ]
    }
    status: $status
  ) {
    id: documentId
    publishedAt
    content
    title
    slug
    uuid
    locale
    updatedAt
    createdAt
    metaTags {
      keymatch
      title
      description
    }
    sections {
      ... on ComponentComponentsContactInformationPublic {
        component: __typename
        contact_information_public {
          contentBlock(pagination: { start: 0, limit: -1 }) {
            content
          }
        }
      }
      ... on ComponentComponentsInternalBlockContent {
        component: __typename
        internal_field {
          title
          id: documentId
          contact_information_internal {
            contentBlock(pagination: { start: 0, limit: -1 }) {
              content
            }
          }
          contact_information_public {
            contentBlock(pagination: { start: 0, limit: -1 }) {
              content
            }
          }
          content {
            uuid
            contentBlock {
              content
              kennisartikelCategorie
            }
            keywords
          }
        }
      }
      # Merged RichText fragment to provide both original and aliased fields
      ... on ComponentComponentsUtrechtRichText {
        component: __typename
        content
        kennisartikelCategorie
        categorie5: kennisartikelCategorie
      }
      ... on ComponentComponentsUtrechtImage {
        component: __typename
        categorie2: kennisartikelCategorie
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
        component: __typename
        categorie3: kennisartikelCategorie
        appearance
        href
        label
        logo
        openFormsEmbed
        textContent
      }
      ... on ComponentComponentsUtrechtSpotlight {
        component: __typename
        categorie4: kennisartikelCategorie
        content
        type
        logoButton {
          label
          href
          textContent
          logo
          appearance
          __typename
        }
      }
      ... on ComponentComponentsUtrechtMultiColumnsButton {
        component: __typename
        categorie6: kennisartikelCategorie
        column {
          title
          logoButton {
            component: __typename
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
        component: __typename
        categorie7: kennisartikelCategorie
        href
        textContent
        icon
        language
      }
      ... on ComponentComponentsFaq {
        component: __typename
        categorie8: kennisartikelCategorie
        pdc_faq {
          title
          faq(pagination: { start: 0, limit: -1 }) {
            body
            headingLevel
            label
          }
        }
      }
      ... on ComponentComponentsUtrechtAccordion {
        component: __typename
        categorie9: kennisartikelCategorie
        item(pagination: { start: 0, limit: -1 }) {
          body
          headingLevel
          label
        }
      }
    }
    additional_information {
      content {
        uuid
        contentBlock(pagination: { start: 0, limit: -1 }) {
          id
          content
          categorie10: kennisartikelCategorie
          component: __typename
        }
      }
    }
    price {
      price(pagination: { start: 0, limit: -1 }) {
        currency
        label
        uuid
        value
      }
    }
    kennisartikelMetadata {
      uuid
      doelgroep
      productAanwezig
      productValtOnder
      afdelingen {
        afdelingId
        afdelingNaam
      }
      verantwoordelijkeOrganisatie {
        owmsIdentifier
        owmsPrefLabel
        owmsEndDate
      }
      upnUri
    }
  }
}
`);

export const GET_INTERNAL_FIELD_BY_UUID = gql(`
query getInternalFields($uuid: String) {
  internalFields(filters: { content: { uuid: { eq: $uuid } } }) {
    id: documentId
    title
    content {
      uuid
      contentBlock {
        content
        kennisartikelCategorie
      }
    }
  }
}
`);
export const CREATE_INTERNAL_FIELD = gql(`
mutation createInternalField($data: InternalFieldInput!) {
  createInternalField(data: $data) {
    id: documentId
    title
    content {
      id
      uuid
      contentBlock {
        content
        kennisartikelCategorie
      }
    }
  }
}
`);
export const UPDATE_INTERNAL_FIELD = gql(`
mutation updateInternalField($data: InternalFieldInput!, $id: ID!) {
  updateInternalField(data: $data, documentId: $id) {
    content {
      id
      uuid
      contentBlock {
        content
      }
    }
  }
}
`);
export const CREATE_KENNISARTIKEL = gql(`
mutation createKennisartikel($data: ProductInput!, $locale: I18NLocaleCode) {
  createProduct(data: $data, locale: $locale) {
    id: documentId
    content
    title
    slug
    uuid
    updatedAt
    createdAt
    locale
    metaTags {
      keymatch
      title
      description
    }
    sections {
      ... on ComponentComponentsUtrechtRichText {
        id
        content
        kennisartikelCategorie
        component: __typename
      }
      ... on ComponentComponentsInternalBlockContent {
        id
        component: __typename
        internal_field {
          title
          id: documentId
          content {
            uuid
            contentBlock {
              content
              kennisartikelCategorie
            }
          }
        }
      }
    }
    price {
        price(pagination: { limit: -1 }) {
          currency
          id
          label
          uuid
          value
        }
    }
    additional_information {
        content {
          id
          uuid
          contentBlock(pagination: { limit: -1 }) {
            id
            content
            categorie10: kennisartikelCategorie
          }
        }
      }
    kennisartikelMetadata {
      uuid
      doelgroep
      productAanwezig
      productValtOnder
      afdelingen {
        afdelingId
        afdelingNaam
      }
      verantwoordelijkeOrganisatie {
        owmsIdentifier
        owmsPrefLabel
        owmsEndDate
      }
      upnUri
    }
  }
}
`);
export const UPDATE_KENNISARTIKEL = gql(`
mutation updateKennisartikel($data: ProductInput!, $locale: I18NLocaleCode, $id: ID!) {
  updateProduct(data: $data, locale: $locale, documentId: $id) {
    id: documentId
    content
    title
    slug
    uuid
    locale
    updatedAt
    createdAt
    metaTags {
      keymatch
      title
      description
    }
    sections {
      ... on ComponentComponentsUtrechtRichText {
        id
        content
        kennisartikelCategorie
        component: __typename
      }
      ... on ComponentComponentsInternalBlockContent {
        id
        component: __typename
        internal_field {
          title
          id: documentId
          content {
            uuid
            contentBlock {
              content
              kennisartikelCategorie
            }
          }
        }
      }
    }
    price {
        price(pagination: { limit: -1 }) {
          currency
          id
          label
          uuid
          value
        }
    }
    additional_information {
        content {
          id
          uuid
          contentBlock(pagination: { limit: -1 }) {
            id
            content
            categorie10: kennisartikelCategorie
          }
        }
      }
    kennisartikelMetadata {
      uuid
      doelgroep
      productAanwezig
      productValtOnder
      afdelingen {
        afdelingId
        afdelingNaam
      }
      verantwoordelijkeOrganisatie {
        owmsIdentifier
        owmsPrefLabel
        owmsEndDate
      }
      upnUri
    }
  }
}
`);
export const GET_ALL_VAC_ITEMS = gql(`
query getAllVacItems($page: Int, $pageSize: Int, $start: Int, $limit: Int) {
  vacs_connection(
    pagination: {
      start: $start
      limit: $limit
      page: $page
      pageSize: $pageSize
    }
  ) {
    pageInfo {
      total
      page
      pageSize
      pageCount
    }
    nodes {
      id: documentId
      createdAt
      updatedAt
      title
      contact_information_internal {
        contentBlock(pagination: { start: 0, limit: -1 }) {
          id
          content
        }
      }
      contact_information_public {
        contentBlock(pagination: { start: 0, limit: -1 }) {
          id
          content
        }
      }
      relatedVACs(pagination: { start: 0, limit: -1 }) {
        vac {
          uuid
        }
      }
      relatedProducts(pagination: { start: 0, limit: -1 }) {
        uuid
        title
      }

      vac {
        uuid
        vraag
        antwoord(pagination: { start: 0, limit: -1 }) {
          content
          kennisartikelCategorie
        }
        status
        doelgroep
        afdelingen {
          afdelingId
          afdelingNaam
        }
        toelichting
        keywords
      }
    }
  }
}

`);
export const GET_VAC_ITEM_BY_UUID = gql(`
query getVacItemByUUIDOrDocumentId(
  $uuid: String
  $documentId: ID
  $status: PublicationStatus
) {
  vacs(
    filters: {
      or: [
        { vac: { uuid: { eq: $uuid } } }
        { documentId: { eq: $documentId } }
      ]
    }
    status: $status
  ) {
    id: documentId
    createdAt
    updatedAt
    publishedAt
    title
    contact_information_internal {
      contentBlock(pagination: { start: 0, limit: -1 }) {
        id
        content
      }
    }
    contact_information_public {
      contentBlock(pagination: { start: 0, limit: -1 }) {
        id
        content
      }
    }
    relatedVACs(pagination: { start: 0, limit: -1 }) {
      vac {
        uuid
      }
    }
    relatedProducts(pagination: { start: 0, limit: -1 }) {
      uuid
      title
    }
    vac {
      uuid
      vraag
      antwoord(pagination: { start: 0, limit: -1 }) {
        content
        kennisartikelCategorie
      }
      status
      doelgroep
      afdelingen {
        afdelingId
        afdelingNaam
      }
      toelichting
      keywords
    }
  }
}
`);
export const CREATE_VAC = gql(`
  mutation createVac($data: VacInput!) {
  createVac(data: $data) {
    id: documentId
    createdAt
    publishedAt
    title
    vac {
      id
      antwoord(pagination: { start: 0, limit: -1 }) {
        content
        kennisartikelCategorie
      }
      status
      doelgroep
      uuid
      toelichting
      afdelingen {
        afdelingId
        afdelingNaam
      }
      keywords
    }
  }
}
`);

export const UPDATE_VAC = gql(`
mutation updateVac($data: VacInput!, $id: ID!) {
  updateVac(documentId: $id, data: $data) {
    id: documentId
    createdAt
    publishedAt
    title
    vac {
      id
      antwoord(pagination: { start: 0, limit: -1 }) {
        content
        kennisartikelCategorie
      }
      status
      doelgroep
      uuid
      toelichting
      afdelingen {
        afdelingId
        afdelingNaam
      }
      keywords
    }
  }
}
`);
