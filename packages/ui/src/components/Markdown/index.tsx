import { Figure, OrderedList, TableContainer } from '@utrecht/component-library-react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  UnorderedList,
} from '@utrecht/component-library-react';
import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const defaultComponents = (config?: Components) => {
  const componentMap: { [key: string]: React.ComponentType<any> } = {
    h1: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading1 {...node.properties}>{children}</Heading1>;
    },
    h2: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading2 {...node.properties}>{children}</Heading2>;
    },
    h3: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading3 {...node.properties}>{children}</Heading3>;
    },
    h4: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading4 {...node.properties}>{children}</Heading4>;
    },
    h5: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading5 {...node.properties}>{children}</Heading5>;
    },
    h6: ({ children, node }) => {
      delete node.properties?.style;
      return <Heading6 {...node.properties}>{children}</Heading6>;
    },
    p: ({ children, node }) => {
      delete node.properties?.style;
      if (node.properties?.dataLead) {
        delete node.properties?.dataLead;
        return (
          <Paragraph {...node.properties} lead>
            {children}
          </Paragraph>
        );
      }

      return <Paragraph {...node.properties}>{children}</Paragraph>;
    },
    ul: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <UnorderedList className="utrecht-unordered-list--html-content" {...node.properties}>
          {children}
        </UnorderedList>
      );
    },
    ol: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <OrderedList className="utrecht-ordered-list--html-content" {...node.properties}>
          {children}
        </OrderedList>
      );
    },
    li: ({ children, node }) => {
      delete node.properties?.style;
      return <li {...node.properties}>{children}</li>;
    },
    table: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <TableContainer overflowInline>
          <Table {...node.properties}>{children}</Table>
        </TableContainer>
      );
    },
    tbody: ({ children, node }) => {
      delete node.properties?.style;
      return <TableBody {...node.properties}>{children}</TableBody>;
    },
    td: ({ children, node }) => {
      delete node.properties?.style;
      return <TableCell {...node.properties}>{children}</TableCell>;
    },
    thead: ({ children, node }) => {
      delete node.properties?.style;
      return <TableHeader {...node.properties}>{children}</TableHeader>;
    },
    tfoot: ({ children, node }) => {
      delete node.properties?.style;
      return <TableFooter {...node.properties}>{children}</TableFooter>;
    },
    th: ({ children, node }) => {
      delete node.properties?.style;
      return <TableHeaderCell {...node.properties}>{children}</TableHeaderCell>;
    },
    tr: ({ children, node }) => {
      delete node.properties?.style;
      return <TableRow {...node.properties}>{children}</TableRow>;
    },
    caption: ({ children, node }) => {
      delete node.properties?.style;
      return <TableCaption {...node.properties}>{children}</TableCaption>;
    },
    figure: ({ children, node }) => {
      delete node.properties?.style;
      return <Figure {...node.properties}>{children}</Figure>;
    },
    figcaption: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <figcaption
          // TODO: Replace the class below with `utrecht-table__figcaption` once PR #2005 on @utrecht/component-library-css is merged.
          className="utrecht-table__caption"
          {...node?.properties}
        >
          {children}
        </figcaption>
      );
    },
  };

  // Merge the provided config with the default component mapping
  return {
    ...componentMap,
    ...config,
  };
};

interface MarkdownProps {
  children: string;
  components?: Components;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, components }) => (
  <ReactMarkdown components={defaultComponents(components)} rehypePlugins={[rehypeRaw]}>
    {children}
  </ReactMarkdown>
);
