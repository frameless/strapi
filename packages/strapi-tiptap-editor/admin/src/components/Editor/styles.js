import { Box } from '@strapi/design-system/Box';
import styled from 'styled-components';

export default styled(Box)`
  .menu-bar {
    .is-active {
      background: ${({ theme }) => theme.colors.primary200};
      color: ${({ theme }) => theme.colors.neutral0};
    }

    .button-group {
      border: 0.25em solid ${({ theme }) => theme.colors.neutral100};
    }

    &.floating {
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
      background: ${({ theme }) => theme.colors.neutral100};
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
    button {
      &.medium-icon {
        padding: 7px;

        svg {
          height: 100%;
          width: 100%;
        }
      }

      &.large-icon {
        padding: 6px;

        svg {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .ProseMirror {
    outline: none;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.neutral800};
    min-height: 80px;

    > * + * {
      margin-top: 0.75em;
    }

    span {
      display: inline-block !important;
      position: relative;
    }

    ul {
      font-family: var(--utrecht-document-font-family, inherit);
      font-size: var(--utrecht-unordered-list-font-size, var(--utrecht-document-font-size, inherit));
      line-height: var(--utrecht-unordered-list-line-height, var(--utrecht-document-line-height, inherit));
      margin-block-end: calc(
        var(--utrecht-space-around, 0) *
          var(--utrecht-unordered-list-margin-block-end, var(--utrecht-paragraph-margin-block-end, 0))
      );
      margin-block-start: calc(
        var(--utrecht-space-around, 0) *
          var(--utrecht-unordered-list-margin-block-start, var(--utrecht-paragraph-margin-block-start, 0))
      );
      padding-inline-start: var(--utrecht-unordered-list-padding-inline-start, 2ch);
      --utrecht-space-around: 1;
    }
    ul > li {
      margin-block-end: var(--utrecht-unordered-list-item-margin-block-end);
      margin-block-start: var(--utrecht-unordered-list-item-margin-block-start);
      padding-inline-start: var(--utrecht-unordered-list-item-padding-inline-start, 1ch);
    }
    ul > li::marker {
      color: var(--utrecht-unordered-list-marker-color);
      content: '●';
    }

    mark {
      background-color: var(--utrecht-mark-background-color, revert);
      color: var(--utrecht-mark-color, revert);
    }

    h1 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-1-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-1-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-1-font-size, revert);
      font-weight: var(--utrecht-heading-1-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-1-letter-spacing);
      line-height: var(--utrecht-heading-1-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-1-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-1-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-1-text-transform, inherit);
      --utrecht-space-around: 1;
    }
    h2 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-2-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-2-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-2-font-size, revert);
      font-weight: var(--utrecht-heading-2-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-2-letter-spacing);
      line-height: var(--utrecht-heading-2-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-2-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-2-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-2-text-transform, inherit);
      --utrecht-space-around: 1;
    }
    h3 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-3-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-3-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-3-font-size, revert);
      font-weight: var(--utrecht-heading-3-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-3-letter-spacing);
      line-height: var(--utrecht-heading-3-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-3-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-3-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-3-text-transform, inherit);
      --utrecht-space-around: 1;
    }

    h4 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-4-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-4-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-4-font-size, revert);
      font-weight: var(--utrecht-heading-4-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-4-letter-spacing);
      line-height: var(--utrecht-heading-4-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-4-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-4-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-4-text-transform, inherit);
      --utrecht-space-around: 1;
    }
    h5 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-5-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-5-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-5-font-size, revert);
      font-weight: var(--utrecht-heading-5-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-5-letter-spacing);
      line-height: var(--utrecht-heading-5-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-5-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-5-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-5-text-transform, inherit);
      --utrecht-space-around: 1;
    }
    h6 {
      page-break-after: avoid;
      page-break-inside: avoid;
      color: var(--utrecht-heading-6-color, var(--utrecht-heading-color, var(--utrecht-document-color, inherit)));
      font-family: var(
        --utrecht-heading-6-font-family,
        var(--utrecht-heading-font-family, var(--utrecht-document-font-family))
      );
      font-size: var(--utrecht-heading-6-font-size, revert);
      font-weight: var(--utrecht-heading-6-font-weight, var(--utrecht-heading-font-weight, bold));
      letter-spacing: var(--utrecht-heading-6-letter-spacing);
      line-height: var(--utrecht-heading-6-line-height);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-6-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-heading-6-margin-block-start, 0));
      page-break-after: avoid;
      text-transform: var(--utrecht-heading-6-text-transform, inherit);
      --utrecht-space-around: 1;
    }
    a:link {
      --utrecht-icon-size: var(--utrecht-link-icon-size, 1em);
      color: var(--utrecht-link-color, blue);
      text-decoration: var(--utrecht-link-text-decoration, underline);
      text-decoration-skip-ink: all;
      text-decoration-thickness: max(var(--utrecht-link-text-decoration-thickness), 1px);
      text-underline-offset: var(--utrecht-link-text-underline-offset);
    }

    a:visited {
      color: var(--utrecht-link-visited-color, var(--utrecht-link-color));
    }
    a:hover {
      color: var(--utrecht-link-hover-color, var(--utrecht-link-color));
      text-decoration: var(--utrecht-link-hover-text-decoration, var(--utrecht-link-text-decoration, underline));
      text-decoration-skip: none;
      text-decoration-skip-ink: none;
      text-decoration-thickness: max(
        var(--utrecht-link-hover-text-decoration-thickness, var(--utrecht-link-text-decoration-thickness)),
        1px
      );
    }
    a:active {
      color: var(--utrecht-link-active-color, var(--utrecht-link-color));
    }
    a:focus {
      background-color: var(--utrecht-link-focus-background-color, transparent);
      color: var(--utrecht-link-focus-color, var(--utrecht-link-color));
      text-decoration: var(--utrecht-link-focus-text-decoration, var(--utrecht-link-text-decoration, underline));
      text-decoration-skip: none;
      text-decoration-skip-ink: none;
      text-decoration-thickness: max(
        var(--utrecht-link-focus-text-decoration-thickness, var(--utrecht-link-text-decoration-thickness)),
        1px
      );
      box-shadow: 0 0 0 var(--utrecht-focus-outline-width, 0) var(--utrecht-focus-inverse-outline-color, transparent);
      outline-color: var(--utrecht-focus-outline-color, transparent);
      outline-offset: var(--utrecht-focus-outline-offset, 0);
      outline-style: var(--utrecht-focus-outline-style, solid);
      outline-width: var(--utrecht-focus-outline-width, 0);
    }
    a:focus:not(:focus-visible) {
      /* undo focus ring */
      box-shadow: none;
      outline-style: none;
    }
    a[href^='tel:' i] {
      white-space: nowrap;
    }

    ol {
      font-family: var(--utrecht-document-font-family, inherit);
      font-size: var(
        --utrecht-ordered-list-font-size,
        var(--utrecht-unordered-list-font-size, var(--utrecht-document-font-size, inherit))
      );
      line-height: var(
        --utrecht-ordered-list-font-size,
        var(--utrecht-unordered-list-line-height, var(--utrecht-document-line-height, inherit))
      );
      margin-block-end: calc(
        var(--utrecht-space-around, 0) *
          var(--utrecht-ordered-list-margin-block-end, var(--utrecht-unordered-list-margin-block-end, 0))
      );
      margin-block-start: calc(
        var(--utrecht-space-around, 0) *
          var(--utrecht-ordered-list-margin-block-start, var(--utrecht-unordered-list-margin-block-start, 0))
      );
      padding-inline-start: var(
        --utrecht-ordered-list-padding-inline-start,
        var(--utrecht-unordered-list-padding-inline-start, 2ch)
      );
      --utrecht-space-around: 1;
    }

    ol > li {
      margin-block-end: var(
        --utrecht-ordered-list-item-margin-block-end,
        var(--utrecht-unordered-list-item-margin-block-end)
      );
      margin-block-start: var(
        --utrecht-ordered-list-item-margin-block-start,
        var(--utrecht-unordered-list-item-margin-block-start)
      );
      padding-inline-start: var(
        --utrecht-ordered-list-item-padding-inline-start,
        var(--utrecht-unordered-list-item-padding-inline-start, 1ch)
      );
    }
    ol:lang(ar) {
      list-style: arabic-indic;
    }
    p {
      color: var(--utrecht-paragraph-color, var(--utrecht-document-color, inherit));
      font-family: var(--utrecht-paragraph-font-family, var(--utrecht-document-font-family, inherit));
      font-size: var(--utrecht-paragraph-font-size, var(--utrecht-document-font-size, inherit));
      font-weight: var(--utrecht-paragraph-font-weight, inherit);
      line-height: var(--utrecht-paragraph-line-height, var(--utrecht-document-line-height, inherit));
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-paragraph-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-paragraph-margin-block-start, 0));
    }

    hr {
      border-color: var(--utrecht-separator-color);
      border-style: solid;
      border-width: 0 0 var(--utrecht-separator-block-size) 0;
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-separator-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-separator-margin-block-start, 0));
      --utrecht-space-around: 1;
    }

    blockquote {
      background-color: var(--utrecht-blockquote-background-color);
      color: var(--utrecht-blockquote-color);
      font-family: var(--utrecht-document-font-family);
      font-size: var(--utrecht-blockquote-font-size);
      font-style: var(--utrecht-blockquote-font-style);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-blockquote-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-blockquote-margin-block-start, 0));
      margin-inline-end: var(--utrecht-blockquote-margin-inline-end);
      margin-inline-start: var(--utrecht-blockquote-margin-inline-start);
      padding-block-end: var(--utrecht-blockquote-padding-block-end);
      padding-block-start: var(--utrecht-blockquote-padding-block-start);
      padding-inline-end: var(--utrecht-blockquote-padding-inline-end);
      padding-inline-start: var(--utrecht-blockquote-padding-inline-start);
      --utrecht-document-color: var(--utrecht-blockquote-content-color, inherit);
      --utrecht-paragraph-font-size: var(--utrecht-blockquote-content-font-size, inherit);
      color: var(--utrecht-blockquote-content-color, inherit);
      font-size: var(--utrecht-blockquote-content-font-size, inherit);
      --utrecht-space-around: 1;
    }

    em {
      font-style: var(--utrecht-emphasis-stressed-font-style, italic);
    }
    strong {
      font-weight: var(--utrecht-emphasis-strong-font-weight, bold);
    }

    figure {
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-figure-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-figure-margin-block-start, 0));
    }

    figcaption {
      margin: 0.25rem 0;
      padding: 0.5rem;
      border: 2px dashed #0d0d0d20;
      border-radius: 0.5rem;
      color: var(--utrecht-figure-caption-color);
      font-size: var(--utrecht-figure-caption-font-size);
      line-height: var(--utrecht-figure-caption-line-height);
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    p[data-lead='true'] {
      color: var(
        --utrecht-paragraph-lead-color,
        var(--utrecht-paragraph-color, var(--utrecht-document-color, inherit))
      );
      font-size: var(--utrecht-paragraph-lead-font-size, var(--utrecht-paragraph-font-size, inherit));
      font-weight: var(--utrecht-paragraph-lead-font-weight, var(--utrecht-paragraph-font-weight, inherit));
      line-height: var(--utrecht-paragraph-lead-line-height, var(--utrecht-paragraph-line-height, inherit));
    }

    .ProseMirror-selectednode {
      border: 5px solid ${({ theme }) => theme.colors.neutral800};
      box-sizing: border-box;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    hr {
      border: 0;
      border-top: 2px solid rgba(13, 13, 13, 0.1);
      margin: 1rem 0;
    }

    table {
      border-collapse: collapse;
      border-color: var(--utrecht-table-border-color, 0);
      border-style: solid;
      border-width: var(--utrecht-table-border-width, 0);
      font-family: var(--utrecht-table-font-family, var(--utrecht-document-font-family));
      font-size: var(--utrecht-table-font-size, inherit);
      line-height: var(--utrecht-table-line-height, inherit);
      margin-block-end: calc(var(--utrecht-space-around, 0) * var(--utrecht-table-margin-block-end, 0));
      margin-block-start: calc(var(--utrecht-space-around, 0) * var(--utrecht-table-margin-block-start, 0));
      width: 100%;
      --utrecht-space-around: 1;
    }

    table * p {
      --utrecht-paragraph-margin-block-start: 0;
    }

    td,
    th {
      --utrecht-table-header-cell-font-weight: var(--utrecht-table-header-font-weight);
      min-width: 1em;
      border: 2px solid #ced4da;
      padding-block-end: var(--utrecht-table-cell-padding-block-end, 0);
      padding-block-start: var(--utrecht-table-cell-padding-block-start, 0);
      padding-inline-end: var(--utrecht-table-cell-padding-inline-end, 0);
      padding-inline-start: var(--utrecht-table-cell-padding-inline-start, 0);
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
      border-block-end-color: var(--utrecht-table-header-border-block-end-color, transparent);
      border-block-end-style: solid;
      border-block-end-width: var(--utrecht-table-header-border-block-end-width, 0);
    }

    th > p {
      --utrecht-paragraph-font-weight: var(--utrecht-table-header-font-weight);
    }
  }
`;
