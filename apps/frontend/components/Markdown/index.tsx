import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
  UnorderedList,
  UnorderedListItem,
  Link,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@utrecht/component-library-react";
import React from "react";

const components: Components = {
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
    return <Paragraph {...node.properties}>{children}</Paragraph>;
  },
  ul: ({ children, node }) => {
    delete node.properties?.style;
    return <UnorderedList {...node.properties}>{children}</UnorderedList>;
  },
  li: ({ children, node }) => {
    delete node.properties?.style;
    return <UnorderedListItem {...node.properties}>{children}</UnorderedListItem>;
  },
  a: ({ children, node }) => {
    delete node.properties?.style;
    return <Link {...node.properties}>{children}</Link>;
  },
  table: ({ children, node }) => {
    delete node.properties?.style;
    return <Table {...node.properties}>{children}</Table>;
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
};

interface MarkdownProps {
  children: any;
  data?: any;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, data }) => {
  return (
    <ReactMarkdown
      components={{
        ...components,
        section: ({ children, node }) => {
          if (node.properties?.dataId && data && data.length > 0) {
            const product: any = data.find(({ id }: any) => id === node.properties?.dataId);
            const price = `${product.currency} ${product?.value}`;
            return <data value={price}>{price}</data>;
          }
          return <section {...node.properties}>{children}</section>;
        },
      }}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
};
