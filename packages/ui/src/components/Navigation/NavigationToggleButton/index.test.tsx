import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import React from 'react';
import { NavToggleButton } from './index';

describe('NavToggleButton', () => {
  it('renders NavToggleButton component', () => {
    const { container } = render(<NavToggleButton icon="hamburger" />);
    const navToggleButton = container.querySelector(':only-child');
    expect(navToggleButton).toBeInTheDocument();
  });
  it('renders a design system BEM class name', () => {
    const { container } = render(<NavToggleButton icon="hamburger" />);
    const navToggleButton = container.querySelector(':only-child');
    expect(navToggleButton).toHaveClass('utrecht-navigation__toggle-button');
  });
  describe('aria attributes', () => {
    it('renders with aria-haspopup="menu"', () => {
      const { container } = render(<NavToggleButton icon="hamburger" />);
      const navToggleButton = container.querySelector('button[aria-haspopup="menu"]');
      expect(navToggleButton).toBeInTheDocument();
    });
    it('renders with aria-controls="menu"', () => {
      const { container } = render(<NavToggleButton icon="hamburger" />);
      const navToggleButton = container.querySelector('button[aria-haspopup="menu"]');
      expect(navToggleButton).toBeInTheDocument();
    });
  });
  it('renders a button with the hamburger icon and text', () => {
    const { container } = render(<NavToggleButton icon="hamburger" text="Open menu" />);
    const button = container.querySelector(':only-child');
    expect(button).toHaveTextContent('Open menu');
    const svg = button?.querySelector('svg');
    expect(svg?.querySelectorAll('line')).toHaveLength(3);
  });
  it('renders a button with the close icon and text', () => {
    const { container } = render(<NavToggleButton icon="close" text="Close menu" />);
    const button = container.querySelector(':only-child');
    expect(button).toHaveTextContent('Close menu');
    const svg = button?.querySelector('svg');
    expect(svg?.querySelectorAll('line')).toHaveLength(2);
  });
  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<NavToggleButton ref={ref} icon="hamburger" />);
    const button = container.querySelector('button');
    expect(ref.current).toBe(button);
    expect(button).toBeInTheDocument();
  });
  it('renders a button with the subtle-button appearance', () => {
    const { container } = render(<NavToggleButton icon="hamburger" />);
    const element = container.querySelector(':only-child');
    const button = element?.querySelector(':only-child');
    expect(button).toHaveClass('utrecht-button');
    expect(button).toHaveClass('utrecht-button--subtle');
  });
});
