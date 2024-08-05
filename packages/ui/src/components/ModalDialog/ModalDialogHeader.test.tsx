import { render } from '@testing-library/react';
import { createRef } from 'react';
import React from 'react';
import { ModalDialogHeader } from './ModalDialogHeader';
import '@testing-library/jest-dom';

describe('ModalDialogHeader', () => {
  it('renders a design system BEM class name', () => {
    const { container } = render(<ModalDialogHeader />);

    expect(container.querySelector(':only-child')).toHaveClass('utrecht-modal-dialog__header');
  });

  it('can have a additional class name', () => {
    const { container } = render(<ModalDialogHeader className="custom-css-class" />);

    const header = container.querySelector(':only-child');
    expect(header).toHaveClass('custom-css-class');
    expect(header).toHaveClass('utrecht-modal-dialog__header');
  });

  it('renders rich text content', () => {
    const { container } = render(
      <ModalDialogHeader>
        <h1>Hello, world</h1>
      </ModalDialogHeader>,
    );

    const header = container.querySelector(':only-child');

    const richText = header?.querySelector('h1');

    expect(richText).toBeInTheDocument();
  });

  it('can be hidden', () => {
    const { container } = render(<ModalDialogHeader hidden />);

    const header = container.querySelector(':only-child');

    expect(header).not.toBeVisible();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLDivElement>();

    const { container } = render(<ModalDialogHeader ref={ref} />);

    const header = container.querySelector(':only-child');

    expect(ref.current).toBe(header);
  });
});
