import {
  Figure,
  Heading,
  OrderedList,
  Paragraph,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  UnorderedList,
} from '@utrecht/component-library-react';
import React from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { isYouTubeURL, YouTubeVideo } from '../YouTubeVideo';

const defaultComponents = (config?: Components, headingLevel = 1) => {
  const componentMap: { [key: string]: React.ComponentType<any> } = {
    h1: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel} {...node.properties}>
          {children}
        </Heading>
      );
    },
    h2: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel + 1} {...node.properties}>
          {children}
        </Heading>
      );
    },
    h3: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel + 2} {...node.properties}>
          {children}
        </Heading>
      );
    },
    h4: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel + 3} {...node.properties}>
          {children}
        </Heading>
      );
    },
    h5: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel + 4} {...node.properties}>
          {children}
        </Heading>
      );
    },
    h6: ({ children, node }) => {
      delete node.properties?.style;
      return (
        <Heading level={headingLevel + 5} {...node.properties}>
          {children}
        </Heading>
      );
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
    iframe: ({ node }) => {
      if (isYouTubeURL(node.properties.src)) {
        return <YouTubeVideo title={node.properties?.dataTitle} {...node.properties} />;
      } else {
        return null;
      }
    },
  };

  // Merge the provided config with the default component mapping
  return {
    ...componentMap,
    ...config,
  };
};

const transformUri = (url: string) => {
  try {
    const parsedURL = new URL(url);
    if (parsedURL.protocol === 'tel:') {
      // normalize the URL now that we have the URL object
      return parsedURL.toString();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return defaultUrlTransform(url);
};

interface MarkdownProps {
  children: string;
  components?: Components;
  headingLevel?: number;
}

export const Markdown: React.FC<MarkdownProps> = ({ children, components, headingLevel }) => (
  <ReactMarkdown
    urlTransform={transformUri}
    components={defaultComponents(components, headingLevel)}
    rehypePlugins={[rehypeRaw]}
  >
    {children}
  </ReactMarkdown>
);
