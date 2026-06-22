import { render, screen } from '@testing-library/react';
import Link from 'next/link';
import { Breadcrumbs } from './index';
import '@testing-library/jest-dom';

describe('Breadcrumb navigation', () => {
  const props = {
    label: 'Kruimelpad',
    links: [
      {
        href: 'https://www.utrecht.nl/',
        label: 'Home',
        current: false,
        rel: 'home',
      },
      {
        href: '/',
        label: 'Online loket',
        current: true,
      },
    ],
    backLink: {
      href: '/',
      label: 'Online loket',
      current: false,
    },
    Link: Link,
  };

  it('renders a navigation landmark', () => {
    render(<Breadcrumbs {...props} />);

    const navigation = screen.getByRole('navigation', { name: 'Kruimelpad' });

    expect(navigation).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<Breadcrumbs {...props} />);

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(props.links.length);
  });

  it('renders a link', () => {
    render(<Breadcrumbs {...props} />);

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.utrecht.nl/');
    expect(link).toHaveAttribute('rel', 'home');
  });

  it('renders a current link', () => {
    render(<Breadcrumbs {...props} />);

    const link = screen.getByRole('link', { name: 'Online loket', current: 'page' });

    expect(link).toBeInTheDocument();
  });

  it('renders no separator for one link', () => {
    const { container } = render(<Breadcrumbs {...props} links={props.links.slice(0, 1)} />);

    const separator = container.querySelector('.utrecht-breadcrumb-nav__separator');

    expect(separator).not.toBeInTheDocument();
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumbs {...props} />);

    const separators = container.querySelectorAll(
      '.utrecht-breadcrumb-nav__item + .utrecht-breadcrumb-nav__separator + .utrecht-breadcrumb-nav__item',
    );

    expect(separators.length).toBe(props.links.length - 1);
  });

  it('renders a custom Link component', () => {
    const { container } = render(
      <Breadcrumbs {...props} Link={({ props }) => <a {...props} className="custom-link" />} />,
    );

    const links = container.querySelectorAll('.custom-link');

    expect(links.length).toBe(props.links.length);
  });

  // TODO: Test small screen breadcrumb
});
