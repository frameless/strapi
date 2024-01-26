/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery getPDCHomePage($locale: I18NLocaleCode, $pageMode: PublicationState) {\n  pdcHomePage(publicationState: $pageMode, locale: $locale) {\n    data {\n      attributes {\n        components {\n          ... on ComponentComponentsUtrechtNavigation {\n            __typename\n            navigationList {\n              id\n              textContent\n              href\n            }\n          }\n          ... on ComponentComponentsUtrechtTopTasks {\n            __typename\n            link {\n              id\n              textContent\n              href\n              topTaskIcons\n            }\n          }\n          ... on ComponentComponentsUtrechtFooter {\n            __typename\n            title\n            list {\n              listItem {\n                id\n                title\n                link {\n                  id\n                  textContent\n                  href\n                }\n              }\n            }\n            address\n            socialMediaList {\n              link {\n                id\n                textContent\n                href\n                icon\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": types.GetPdcHomePageDocument,
    "\n  query getAllProductsSlugQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n": types.GetAllProductsSlugQueryDocument,
    "\n  query getAlphabeticallyProductsByLetterQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $startsWith: String) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, filters: { title: { startsWith: $startsWith } }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n": types.GetAlphabeticallyProductsByLetterQueryDocument,
    "\n  query checkAlphabeticallyProductsAvailability($locale: I18NLocaleCode, $startsWith: String) {\n      products(locale: $locale, filters: { title: { startsWith: $startsWith } }) {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n": types.CheckAlphabeticallyProductsAvailabilityDocument,
    "\n  query getProductBySlug(\n  $slug: String\n  $locale: I18NLocaleCode\n  $pageMode: PublicationState\n) {\n  products(\n    filters: { slug: { eq: $slug } }\n    locale: $locale\n    publicationState: $pageMode\n  ) {\n    data {\n      id\n      attributes {\n        title\n        slug\n        metaTags {\n          title\n          description\n          keymatch\n          ogImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n        content\n        sections {\n          ... on ComponentComponentsUtrechtImage {\n            __typename\n            imageData {\n              data {\n                attributes {\n                  name\n                  alternativeText\n                  caption\n                  width\n                  height\n                  formats\n                  url\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLogoButton {\n            __typename\n            label\n            href\n            textContent\n            appearance\n            logo\n          }\n          ... on ComponentComponentsUtrechtSpotlight {\n            __typename\n            content\n            type\n            logoButton {\n              id\n              label\n              href\n              textContent\n              logo\n              appearance\n              __typename\n            }\n          }\n          ... on ComponentComponentsUtrechtRichText {\n            __typename\n            content\n          }\n          ... on ComponentComponentsUtrechtMultiColumnsButton {\n            __typename\n            column {\n              id\n              title\n              logoButton {\n                __typename\n                label\n                href\n                textContent\n                logo\n                appearance\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLink {\n            __typename\n            href\n            textContent\n            iconList: icon\n          }\n          ... on ComponentComponentsFaq {\n            __typename\n            pdc_faq {\n              data {\n                attributes {\n                  title\n                  faq {\n                    id\n                    label\n                    body\n                  }\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtAccordion {\n            __typename\n            item {\n              id\n              label\n              body\n            }\n          }\n        }\n        price {\n          data {\n            attributes {\n              price {\n                id\n                label\n                value\n                currency\n              }\n            }\n          }\n        }\n        localizations {\n          data {\n            attributes {\n              locale\n              slug\n            }\n          }\n        }\n        locale\n      }\n    }\n  }\n}\n\n": types.GetProductBySlugDocument,
    "\n  query getProductBySlugAndLocale($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {\n    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {\n      data {\n        attributes {\n          slug\n          locale\n        }\n      }\n    }\n  }\n": types.GetProductBySlugAndLocaleDocument,
    "\nquery getNotFoundPage($locale: I18NLocaleCode){\n  notFoundPage(locale: $locale) {\n    data {\n       attributes {\n        title\n        body\n      }\n    }\n  }\n}\n": types.GetNotFoundPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getPDCHomePage($locale: I18NLocaleCode, $pageMode: PublicationState) {\n  pdcHomePage(publicationState: $pageMode, locale: $locale) {\n    data {\n      attributes {\n        components {\n          ... on ComponentComponentsUtrechtNavigation {\n            __typename\n            navigationList {\n              id\n              textContent\n              href\n            }\n          }\n          ... on ComponentComponentsUtrechtTopTasks {\n            __typename\n            link {\n              id\n              textContent\n              href\n              topTaskIcons\n            }\n          }\n          ... on ComponentComponentsUtrechtFooter {\n            __typename\n            title\n            list {\n              listItem {\n                id\n                title\n                link {\n                  id\n                  textContent\n                  href\n                }\n              }\n            }\n            address\n            socialMediaList {\n              link {\n                id\n                textContent\n                href\n                icon\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery getPDCHomePage($locale: I18NLocaleCode, $pageMode: PublicationState) {\n  pdcHomePage(publicationState: $pageMode, locale: $locale) {\n    data {\n      attributes {\n        components {\n          ... on ComponentComponentsUtrechtNavigation {\n            __typename\n            navigationList {\n              id\n              textContent\n              href\n            }\n          }\n          ... on ComponentComponentsUtrechtTopTasks {\n            __typename\n            link {\n              id\n              textContent\n              href\n              topTaskIcons\n            }\n          }\n          ... on ComponentComponentsUtrechtFooter {\n            __typename\n            title\n            list {\n              listItem {\n                id\n                title\n                link {\n                  id\n                  textContent\n                  href\n                }\n              }\n            }\n            address\n            socialMediaList {\n              link {\n                id\n                textContent\n                href\n                icon\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllProductsSlugQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllProductsSlugQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAlphabeticallyProductsByLetterQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $startsWith: String) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, filters: { title: { startsWith: $startsWith } }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAlphabeticallyProductsByLetterQuery($locale: I18NLocaleCode, $page: Int, $pageSize: Int, $startsWith: String) {\n      products(locale: $locale, pagination:{ page: $page, pageSize: $pageSize }, filters: { title: { startsWith: $startsWith } }) {\n        meta {\n        pagination {\n          total\n          page\n          pageSize\n          pageCount\n        }\n      }\n      data {\n        attributes {\n          slug\n          title\n          locale\n          updatedAt\n          metaTags {\n            description\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query checkAlphabeticallyProductsAvailability($locale: I18NLocaleCode, $startsWith: String) {\n      products(locale: $locale, filters: { title: { startsWith: $startsWith } }) {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query checkAlphabeticallyProductsAvailability($locale: I18NLocaleCode, $startsWith: String) {\n      products(locale: $locale, filters: { title: { startsWith: $startsWith } }) {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductBySlug(\n  $slug: String\n  $locale: I18NLocaleCode\n  $pageMode: PublicationState\n) {\n  products(\n    filters: { slug: { eq: $slug } }\n    locale: $locale\n    publicationState: $pageMode\n  ) {\n    data {\n      id\n      attributes {\n        title\n        slug\n        metaTags {\n          title\n          description\n          keymatch\n          ogImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n        content\n        sections {\n          ... on ComponentComponentsUtrechtImage {\n            __typename\n            imageData {\n              data {\n                attributes {\n                  name\n                  alternativeText\n                  caption\n                  width\n                  height\n                  formats\n                  url\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLogoButton {\n            __typename\n            label\n            href\n            textContent\n            appearance\n            logo\n          }\n          ... on ComponentComponentsUtrechtSpotlight {\n            __typename\n            content\n            type\n            logoButton {\n              id\n              label\n              href\n              textContent\n              logo\n              appearance\n              __typename\n            }\n          }\n          ... on ComponentComponentsUtrechtRichText {\n            __typename\n            content\n          }\n          ... on ComponentComponentsUtrechtMultiColumnsButton {\n            __typename\n            column {\n              id\n              title\n              logoButton {\n                __typename\n                label\n                href\n                textContent\n                logo\n                appearance\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLink {\n            __typename\n            href\n            textContent\n            iconList: icon\n          }\n          ... on ComponentComponentsFaq {\n            __typename\n            pdc_faq {\n              data {\n                attributes {\n                  title\n                  faq {\n                    id\n                    label\n                    body\n                  }\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtAccordion {\n            __typename\n            item {\n              id\n              label\n              body\n            }\n          }\n        }\n        price {\n          data {\n            attributes {\n              price {\n                id\n                label\n                value\n                currency\n              }\n            }\n          }\n        }\n        localizations {\n          data {\n            attributes {\n              locale\n              slug\n            }\n          }\n        }\n        locale\n      }\n    }\n  }\n}\n\n"): (typeof documents)["\n  query getProductBySlug(\n  $slug: String\n  $locale: I18NLocaleCode\n  $pageMode: PublicationState\n) {\n  products(\n    filters: { slug: { eq: $slug } }\n    locale: $locale\n    publicationState: $pageMode\n  ) {\n    data {\n      id\n      attributes {\n        title\n        slug\n        metaTags {\n          title\n          description\n          keymatch\n          ogImage {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n        }\n        content\n        sections {\n          ... on ComponentComponentsUtrechtImage {\n            __typename\n            imageData {\n              data {\n                attributes {\n                  name\n                  alternativeText\n                  caption\n                  width\n                  height\n                  formats\n                  url\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLogoButton {\n            __typename\n            label\n            href\n            textContent\n            appearance\n            logo\n          }\n          ... on ComponentComponentsUtrechtSpotlight {\n            __typename\n            content\n            type\n            logoButton {\n              id\n              label\n              href\n              textContent\n              logo\n              appearance\n              __typename\n            }\n          }\n          ... on ComponentComponentsUtrechtRichText {\n            __typename\n            content\n          }\n          ... on ComponentComponentsUtrechtMultiColumnsButton {\n            __typename\n            column {\n              id\n              title\n              logoButton {\n                __typename\n                label\n                href\n                textContent\n                logo\n                appearance\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtLink {\n            __typename\n            href\n            textContent\n            iconList: icon\n          }\n          ... on ComponentComponentsFaq {\n            __typename\n            pdc_faq {\n              data {\n                attributes {\n                  title\n                  faq {\n                    id\n                    label\n                    body\n                  }\n                }\n              }\n            }\n          }\n          ... on ComponentComponentsUtrechtAccordion {\n            __typename\n            item {\n              id\n              label\n              body\n            }\n          }\n        }\n        price {\n          data {\n            attributes {\n              price {\n                id\n                label\n                value\n                currency\n              }\n            }\n          }\n        }\n        localizations {\n          data {\n            attributes {\n              locale\n              slug\n            }\n          }\n        }\n        locale\n      }\n    }\n  }\n}\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProductBySlugAndLocale($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {\n    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {\n      data {\n        attributes {\n          slug\n          locale\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProductBySlugAndLocale($slug: String, $locale: I18NLocaleCode, $pageMode: PublicationState) {\n    products(filters: { slug: { eq: $slug } }, locale: $locale, publicationState: $pageMode) {\n      data {\n        attributes {\n          slug\n          locale\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getNotFoundPage($locale: I18NLocaleCode){\n  notFoundPage(locale: $locale) {\n    data {\n       attributes {\n        title\n        body\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery getNotFoundPage($locale: I18NLocaleCode){\n  notFoundPage(locale: $locale) {\n    data {\n       attributes {\n        title\n        body\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;