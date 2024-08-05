import { render } from '@testing-library/react';
import { createRef } from 'react';
import React from 'react';
import { ModalDialogFooter } from './ModalDialogFooter';
import '@testing-library/jest-dom';

describe('ModalDialogFooter', () => {
  it('renders a design system BEM class name', () => {
    const { container } = render(<ModalDialogFooter />);

    expect(container.querySelector(':only-child')).toHaveClass('utrecht-modal-dialog__footer');
  });

  it('can have a additional class name', () => {
    const { container } = render(<ModalDialogFooter className="custom-css-class" />);

    const footer = container.querySelector(':only-child');
    expect(footer).toHaveClass('custom-css-class');
    expect(footer).toHaveClass('utrecht-modal-dialog__footer');
  });

  it('renders rich text content', () => {
    const { container } = render(
      <ModalDialogFooter>
        <p>Footer content</p>
      </ModalDialogFooter>,
    );

    const footer = container.querySelector(':only-child');

    const richText = footer?.querySelector('p');

    expect(richText).toBeInTheDocument();
  });

  it('can be hidden', () => {
    const { container } = render(<ModalDialogFooter hidden />);

    const footer = container.querySelector(':only-child');

    expect(footer).not.toBeVisible();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLDivElement>();

    const { container } = render(<ModalDialogFooter ref={ref} />);

    const footer = container.querySelector(':only-child');

    expect(ref.current).toBe(footer);
  });
});
