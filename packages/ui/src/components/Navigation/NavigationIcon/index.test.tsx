import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import { NavigationIcon } from './index';

describe('NavigationIcon', () => {
  it('renders the hamburger icon', () => {
    const { container } = render(<NavigationIcon name="hamburger" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('line')).toHaveLength(3);
  });

  it('renders the close icon', () => {
    const { container } = render(<NavigationIcon name="close" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('line')).toHaveLength(2);
  });

  it('renders the icon with the provided ref', () => {
    const ref = createRef<SVGSVGElement>();
    const { container } = render(<NavigationIcon name="hamburger" ref={ref} />);
    expect(ref.current).toBe(container.querySelector('svg'));
  });

  it('renders a design system BEM class name', () => {
    const { container } = render(<NavigationIcon name="hamburger" />);
    expect(container.querySelector('svg')).toHaveClass('utrecht-topnav__icon');
  });
});
