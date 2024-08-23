import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Link } from '@utrecht/component-library-react';
import React from 'react';
import { Markdown } from './index';
describe('Markdown', () => {
  it('should render the Markdown component', () => {
    const content = '<p>Hello World!</p>';
    const { container } = render(<Markdown>{content}</Markdown>);
    const text = container.querySelector(':only-child');
    expect(text).toHaveTextContent('Hello World!');
  });
  it('should render the Markdown component with richtext class', () => {
    const { container } = render(<Markdown>Hello World!</Markdown>);
    const text = container.querySelector('.utrecht-rich-text');
    expect(text).toBeInTheDocument();
  });
  it('should render custom component', () => {
    const { container } = render(
      <Markdown components={{ p: (props) => <p className="custom-component" {...props} /> }}>
        {'<p>Hello World!</p>'}
      </Markdown>,
    );
    const text = container.querySelector('.custom-component');
    expect(text).toBeInTheDocument();
  });

  describe('iframe', () => {
    const exampleIframe = '<iframe width="640" height="480" src="https://example.com/"></iframe>';
    it('should not render iframe elements', () => {
      const { container } = render(<Markdown>{exampleIframe}</Markdown>);
      const iframe = container.querySelector('iframe');
      expect(iframe).not.toBeInTheDocument();
    });
  });

  describe('Youtube iframe', () => {
    const youtubeIframe =
      '<div data-youtube-video=""> <iframe loop="false" width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0"  modestbranding="false" origin="" playlist="" src="https://www.youtube.com/watch?v=X5rRDtSH-WM" start="0" data-title="Inkoop & Contractmanagement l Werken bij Utrecht"></iframe></div>';
    it('should render Youtube iframe', () => {
      const { container } = render(<Markdown>{youtubeIframe}</Markdown>);
      const iframe = container.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
    });
    it('should render Youtube iframe with correct src', () => {
      const { container } = render(<Markdown>{youtubeIframe}</Markdown>);
      const iframe = container.querySelector('iframe');
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/watch?v=X5rRDtSH-WM&disablekb=1&loop=false');
    });
    it('should render Youtube iframe with correct width and height', () => {
      const { container } = render(<Markdown>{youtubeIframe}</Markdown>);
      const iframe = container.querySelector('iframe');
      expect(iframe).toHaveAttribute('width', '640');
      expect(iframe).toHaveAttribute('height', '480');
    });
    it('should render Youtube iframe with correct aria-label', () => {
      const { container } = render(<Markdown>{youtubeIframe}</Markdown>);
      const iframe = container.querySelector('iframe');
      expect(iframe).toHaveAttribute('dataTitle', 'Inkoop & Contractmanagement l Werken bij Utrecht');
    });
  });
  describe('Components', () => {
    it('should render Utrecht Heading 1 component', () => {
      const content = '<h1>Utrecht Heading 1</h1>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h1 = container.querySelector('.utrecht-heading-1');
      expect(h1).toBeInTheDocument();
    });
    it('should render Utrecht Heading 2 component', () => {
      const content = '<h2>Utrecht Heading 2</h2>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h2 = container.querySelector('.utrecht-heading-2');
      expect(h2).toBeInTheDocument();
    });
    it('should render Utrecht Heading 3 component', () => {
      const content = '<h3>Utrecht Heading 3</h3>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h3 = container.querySelector('.utrecht-heading-3');
      expect(h3).toBeInTheDocument();
    });
    it('should render Utrecht Heading 4 component', () => {
      const content = '<h4>Utrecht Heading 4</h4>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h4 = container.querySelector('.utrecht-heading-4');
      expect(h4).toBeInTheDocument();
    });
    it('should render Utrecht Heading 5 component', () => {
      const content = '<h5>Utrecht Heading 5</h5>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h5 = container.querySelector('.utrecht-heading-5');
      expect(h5).toBeInTheDocument();
    });
    it('should render Utrecht Heading 6 component', () => {
      const content = '<h6>Utrecht Heading 6</h6>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const h6 = container.querySelector('.utrecht-heading-6');
      expect(h6).toBeInTheDocument();
    });
    it('should render Utrecht Paragraph component', () => {
      const content = '<p>Utrecht Paragraph</p>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const p = container.querySelector('.utrecht-paragraph');
      expect(p).toBeInTheDocument();
    });
    it('should render Utrecht Lead Paragraph component', () => {
      const content = '<p data-lead="true">Utrecht Paragraph</p>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const p = container.querySelector('.utrecht-paragraph');
      const b = p?.querySelector('.utrecht-paragraph__b');

      expect(p).toBeInTheDocument();
      expect(b).toBeInTheDocument();
    });
    it('should render Utrecht Unordered List component', () => {
      const content = '<ul><li>Utrecht Unordered List</li></ul>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const ul = container.querySelector('.utrecht-unordered-list');
      expect(ul).toBeInTheDocument();
    });
    it('should render Utrecht Ordered List component', () => {
      const content = '<ol><li>Utrecht Ordered List</li></ol>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const ol = container.querySelector('.utrecht-ordered-list');
      expect(ol).toBeInTheDocument();
    });
    it('should render Utrecht Table component', () => {
      const contentTable =
        '<table><thead><tr><th>Utrecht Table Header Cell</th></tr></thead><tbody><tr><td>Utrecht Table Cell</td></tr></tbody><tfoot><tr><td>Utrecht Table Footer</td></tr></tfoot></table>';
      const { container } = render(<Markdown>{contentTable.toString()}</Markdown>);
      const table = container.querySelector('.utrecht-table');
      expect(table).toBeInTheDocument();
      const tbody = container.querySelector('.utrecht-table__body');
      expect(tbody).toBeInTheDocument();
      const tfoot = container.querySelector('.utrecht-table__footer');
      expect(tfoot).toBeInTheDocument();
      const thead = container.querySelector('.utrecht-table__header');
      expect(thead).toBeInTheDocument();
      const th = container.querySelector('.utrecht-table__header-cell');
      expect(th).toBeInTheDocument();
      const td = container.querySelector('.utrecht-table__cell');
      expect(td).toBeInTheDocument();
      const tr = container.querySelector('.utrecht-table__row');
      expect(tr).toBeInTheDocument();
    });
    it('should render Utrecht Table Container component', () => {
      const contentTable =
        '<table><thead><tr><th>Utrecht Table Header Cell</th></tr></thead><tbody><tr><td>Utrecht Table Cell</td></tr></tbody><tfoot><tr><td>Utrecht Table Footer</td></tr></tfoot></table>';
      const { container } = render(<Markdown>{contentTable.toString()}</Markdown>);
      const tableContainer = container.querySelector('.utrecht-table-container');
      expect(tableContainer).toBeInTheDocument();
    });
    it('should render Utrecht Table Container Overflow Inline component', () => {
      const contentTable =
        '<table><thead><tr><th>Utrecht Table Header Cell</th></tr></thead><tbody><tr><td>Utrecht Table Cell</td></tr></tbody><tfoot><tr><td>Utrecht Table Footer</td></tr></tfoot></table>';
      const { container } = render(<Markdown>{contentTable.toString()}</Markdown>);
      const tableContainerOverflowInline = container.querySelector('.utrecht-table-container--overflow-inline');
      expect(tableContainerOverflowInline).toBeInTheDocument();
    });
    it('should render Utrecht Figure component', () => {
      const content = '<figure>Utrecht Figure</figure>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const figure = container.querySelector('.utrecht-figure');
      expect(figure).toBeInTheDocument();
    });
    it('should render Utrecht Figure Caption component', () => {
      const content = '<figcaption>Utrecht Figure Caption</figcaption>';
      const { container } = render(<Markdown>{content}</Markdown>);
      const figcaption = container.querySelector('.utrecht-table__caption');
      expect(figcaption).toBeInTheDocument();
    });
    it('should render Utrecht Table Caption component', () => {
      const content = '<table><caption>Utrecht Table Caption</table>';
      const { container, debug } = render(<Markdown>{content}</Markdown>);
      const figcaption = container.querySelector('.utrecht-table__caption');
      expect(figcaption).toBeInTheDocument();
    });
    it('should render Utrecht Link component', () => {
      const content = '<a href="https://example.com">Utrecht Link</a>';
      const { container } = render(
        <Markdown
          components={{
            a: ({ children, node }) => {
              return <Link {...node?.properties}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>,
      );
      const a = container.querySelector('.utrecht-link');
      expect(a).toBeInTheDocument();
    });
    it('should render Utrecht Link component with correct href', () => {
      const content = '<a href="https://example.com">Utrecht Link</a>';
      const { container } = render(
        <Markdown
          components={{
            a: ({ children, node }) => {
              return <Link {...node?.properties}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>,
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('href', 'https://example.com');
    });
    it('should render Utrecht Link component with correct id', () => {
      const content = '<a href="#id">Utrecht Link</a>';
      const { container } = render(
        <Markdown
          components={{
            a: ({ children, node }) => {
              return <Link {...node?.properties}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>,
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('href', '#id');
    });
    it('should render Utrecht Link component with correct mailto', () => {
      const content = '<a href="mailto:example@example.com">Utrecht Link</a>';
      const { container } = render(
        <Markdown
          components={{
            a: ({ children, node }) => {
              return <Link {...node?.properties}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>,
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('href', 'mailto:example@example.com');
    });
    it('should render Utrecht Link component with correct tel', () => {
      const content = '<a href="tel:1234567890">Utrecht Link</a>';
      const { container } = render(
        <Markdown
          components={{
            a: ({ children, node }) => {
              return <Link {...node?.properties}>{children}</Link>;
            },
          }}
        >
          {content}
        </Markdown>,
      );
      const a = container.querySelector('a');
      expect(a).toHaveAttribute('href', 'tel:1234567890');
    });
  });
});
