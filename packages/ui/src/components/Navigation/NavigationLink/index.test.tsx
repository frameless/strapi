import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import { NavigationLink } from './index';

describe('NavigationLink', () => {
  it('renders the NavigationLink component', () => {
    const { container } = render(<NavigationLink href="/">Home</NavigationLink>);
    const link = container.querySelector(':only-child');
    expect(link).toBeInTheDocument();
  });
  it('applies the correct class when the link is current', () => {
    const { container } = render(
      <NavigationLink href="/" isCurrent>
        Home
      </NavigationLink>,
    );
    const link = container.querySelector(':only-child');
    expect(link).toHaveClass('utrecht-navigation__link--is-current');
  });
  it('calls the onClick handler when clicked', () => {
    const onClick = jest.fn();
    const { container } = render(
      <NavigationLink href="/" onClick={onClick}>
        Home
      </NavigationLink>,
    );
    const link = container.querySelector(':only-child');
    fireEvent.click(link as HTMLAnchorElement);
    expect(onClick).toHaveBeenCalled();
  });
  it('renders the marker when provided', () => {
    const { container } = render(
      <NavigationLink href="/" marker={<span>Marker</span>}>
        Home
      </NavigationLink>,
    );
    const marker = container.querySelector('span');
    expect(marker).toBeInTheDocument();
  });
  it('renders the children when provided', () => {
    const { container } = render(<NavigationLink href="/">Home</NavigationLink>);
    const link = container.querySelector(':only-child');
    expect(link).toHaveTextContent('Home');
  });
  it('applies the correct class when the link is mobile', () => {
    const { container } = render(
      <NavigationLink href="/" mobile>
        Home
      </NavigationLink>,
    );
    const link = container.querySelector(':only-child');
    expect(link).toHaveClass('utrecht-navigation__link--mobile');
  });
  it('sets the correct href attribute', () => {
    const { container } = render(<NavigationLink href="/">Home</NavigationLink>);
    const link = container.querySelector(':only-child');
    expect(link).toHaveAttribute('href', '/');
  });
  it('sets the correct aria-current attribute', () => {
    const { container } = render(
      <NavigationLink href="/" isCurrent>
        Home
      </NavigationLink>,
    );
    const link = container.querySelector(':only-child');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
  it('renders the correct role attribute', () => {
    const { getByRole } = render(<NavigationLink href="/">Home</NavigationLink>);
    const link = getByRole('link');
    expect(link).toBeInTheDocument();
  });
  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLAnchorElement>();

    const { container } = render(
      <NavigationLink ref={ref} href="/">
        Home
      </NavigationLink>,
    );
    const link = container.querySelector(':only-child');
    expect(ref.current).toBe(link);
  });
});
