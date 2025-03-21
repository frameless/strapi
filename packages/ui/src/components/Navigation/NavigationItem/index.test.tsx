import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import { NavigationItem } from './index';

describe('NavigationItem', () => {
  it('renders NavigationItem component', () => {
    const { container } = render(<NavigationItem>Test</NavigationItem>);
    const navItem = container.querySelector(':only-child');
    expect(navItem).toBeInTheDocument();
  });

  it('renders a design system BEM class name', () => {
    const { container } = render(<NavigationItem>Test</NavigationItem>);
    const navItem = container.querySelector(':only-child');
    expect(navItem).toHaveClass('utrecht-navigation__item');
  });

  it('should render a list item with the appropriate class name when mobile', () => {
    const { container } = render(<NavigationItem mobile>Test</NavigationItem>);
    const navItem = container.querySelector(':only-child');
    expect(navItem).toHaveClass('utrecht-navigation__item--mobile');
    expect(navItem).toHaveClass('utrecht-navigation__item-icon');
  });

  it('should forward the ref to the list item', () => {
    const ref = createRef<HTMLLIElement>();
    const { container } = render(<NavigationItem ref={ref}>Test</NavigationItem>);
    expect(container.firstChild).toBe(ref.current);
  });
});
