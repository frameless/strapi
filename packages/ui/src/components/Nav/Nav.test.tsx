import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Nav } from './index';
import '@testing-library/jest-dom';

describe('Navigation', () => {
  it('renders a navigation role element', () => {
    render(<Nav />);

    const navigation = screen.getByRole('navigation');

    expect(navigation).toBeInTheDocument();
  });

  it('renders a navigation role element with label', () => {
    render(<Nav label="breadcrumb navigation" headingLevel={2} />);

    const navigation = screen.getByRole('navigation', { name: 'breadcrumb navigation' });

    expect(navigation).toBeInTheDocument();
  });

  it('it renders a HTML heading element with a matching headingLevel', () => {
    const { container } = render(<Nav label="breadcrumb navigation" headingLevel={3} />);

    const heading = container.querySelector('h3');

    expect(heading).toBeInTheDocument();
  });

  it('it renders no HTML <h1>-<h6> element when headingLevel is not set', () => {
    const { container } = render(<Nav label="breadcrumb navigation" />);

    const heading = container.querySelector('h1, h2, h3, h4, h5, h6');

    expect(heading).not.toBeInTheDocument();
  });

  it('it renders an HTML <p> element when headingLevel is not set', () => {
    const { container } = render(<Nav label="breadcrumb navigation" />);

    const heading = container.querySelector('p');

    expect(heading).toBeInTheDocument();
  });

  it('renders an HTML nav element', () => {
    const { container } = render(<Nav />);

    const nav = container.querySelector('nav:only-child');

    expect(nav).toBeInTheDocument();
  });

  it('can have a custom class name', () => {
    const { container } = render(<Nav className="compact" />);

    const breadcrumbNav = container.querySelector(':only-child');

    expect(breadcrumbNav).toHaveClass('compact');
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLOListElement>();

    const { container } = render(<Nav ref={ref} />);

    const element = container.querySelector(':only-child');

    expect(ref.current).toBe(element);
  });
});
