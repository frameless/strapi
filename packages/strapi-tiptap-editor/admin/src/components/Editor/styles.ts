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
      box-shadow:
        rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
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

  .tippy-box {
    background: transparent;
  }

  .ProseMirror {
    outline: none;

    figure {
      inline-size: fit-content;
    }

    figcaption {
      border: 2px dashed #0d0d0d20;
      padding-inline: 1rem;
      padding-block: 0.5rem;
      break-inside: avoid;
      color: var(--utrecht-table-caption-color);
      font-family: var(--utrecht-table-caption-font-family);
      font-size: var(--utrecht-table-caption-font-size);
      font-weight: var(--utrecht-table-caption-font-weight);
      line-height: var(--utrecht-table-caption-line-height);
      margin-block-end: var(--utrecht-table-caption-margin-block-end);
      page-break-after: avoid;
      text-align: var(--utrecht-table-caption-text-align, center);
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

    ol {
      list-style-type: decimal;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    table {
      inline-size: fit-content;
    }

    table * p {
      --utrecht-space-around: 0;
    }

    td,
    th {
      --utrecht-table-header-cell-font-weight: var(--utrecht-table-header-font-weight);
      border: 1px solid #ced4da;
      min-inline-size: 3em;
    }

    th {
      border-block-end-color: var(--utrecht-table-header-border-block-end-color, transparent);
      border-block-end-style: solid;
      border-block-end-width: var(--utrecht-table-header-border-block-end-width, 0);
    }
  }
`;
