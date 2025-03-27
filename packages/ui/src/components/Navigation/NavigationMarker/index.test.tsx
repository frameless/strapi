import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { createRef } from 'react';
import { NavigationMarker } from './index';

describe('NavigationMarker', () => {
  it('renders a NavigationMarker', () => {
    const { container } = render(<NavigationMarker />);
    const marker = container.querySelector(':only-child');
    expect(marker).toBeInTheDocument();
  });
  it('renders a design system BEM class name', () => {
    const { container } = render(<NavigationMarker />);
    const marker = container.querySelector(':only-child');
    expect(marker).toHaveClass('utrecht-navigation__marker');
  });
  it('renders a fill marker by default', () => {
    const { container } = render(<NavigationMarker />);
    const marker = container.querySelector(':only-child');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveClass('utrecht-navigation__marker--fill');
    expect(marker).not.toHaveClass('utrecht-navigation__marker--outline');
  });

  it('renders an outline marker when appearance is set to outline', () => {
    const { container } = render(<NavigationMarker appearance="outline" />);
    const marker = container.querySelector(':only-child');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveClass('utrecht-navigation__marker--outline');
    expect(marker).not.toHaveClass('utrecht-navigation__marker--fill');
  });

  it('renders a current marker when isCurrent is true', () => {
    const { container } = render(<NavigationMarker isCurrent />);
    const marker = container.querySelector(':only-child');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveClass('utrecht-navigation__marker--current');
  });
  //   TODO add ForwardRef support to the component
  //   it('supports ForwardRef in React', () => {
  //     const ref = createRef<SVGSVGElement>();

  //     const { container } = render(<NavigationMarker ref={ref} />);

  //     const drawer = container.querySelector(':only-child');

  //     expect(ref.current).toBe(drawer);
  //   });
});
