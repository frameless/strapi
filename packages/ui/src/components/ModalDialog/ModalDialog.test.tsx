import { render } from '@testing-library/react';
import { createRef } from 'react';
import React from 'react';
import { ModalDialog } from './index';
import '@testing-library/jest-dom';

describe('ModalDialog', () => {
  it('renders a design system BEM class name', () => {
    const { container } = render(<ModalDialog />);

    const button = container.querySelector(':only-child');

    expect(button).toHaveClass('utrecht-modal-dialog');
  });

  it('is not visible by default', () => {
    const { container } = render(<ModalDialog />);

    const drawer = container.querySelector(':only-child');

    expect(drawer).not.toBeVisible();
  });

  it('can have a additional class name', () => {
    const { container } = render(<ModalDialog className="large" />);

    const drawer = container.querySelector(':only-child');
    expect(drawer).toHaveClass('large');
    expect(drawer).toHaveClass('utrecht-modal-dialog');
  });

  it('renders rich text content', () => {
    const { container } = render(
      <ModalDialog>
        <h1>Hello, world</h1>
      </ModalDialog>,
    );

    const drawer = container.querySelector(':only-child');

    const richText = drawer?.querySelector('h1');

    expect(richText).toBeInTheDocument();
  });

  it('can be hidden', () => {
    const { container } = render(<ModalDialog hidden />);

    const drawer = container.querySelector(':only-child');

    expect(drawer).not.toBeVisible();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLDialogElement>();

    const { container } = render(<ModalDialog ref={ref} />);

    const drawer = container.querySelector(':only-child');

    expect(ref.current).toBe(drawer);
  });

  it('renders an HTML dialog element', () => {
    const { container } = render(<ModalDialog open />);

    const drawer = container.querySelector('dialog:only-child');

    expect(drawer).toBeInTheDocument();
  });

  it('can be opened with `open` attribute', () => {
    const { container } = render(<ModalDialog open />);
    const drawer = container.querySelector(':only-child');

    expect(drawer).toBeVisible();
  });
});
