import { render } from '@testing-library/react';
import { createRef } from 'react';
import React from 'react';
import { ModalDialogBody } from './ModalDialogBody';
import '@testing-library/jest-dom';

describe('ModalDialogBody', () => {
  it('renders a design system BEM class name', () => {
    const { container } = render(<ModalDialogBody />);

    expect(container.querySelector(':only-child')).toHaveClass('utrecht-modal-dialog__body');
  });

  it('can have a additional class name', () => {
    const { container } = render(<ModalDialogBody className="custom-css-class" />);

    const body = container.querySelector(':only-child');
    expect(body).toHaveClass('custom-css-class');
    expect(body).toHaveClass('utrecht-modal-dialog__body');
  });

  it('renders rich text content', () => {
    const { container } = render(
      <ModalDialogBody>
        <p>Body content</p>
      </ModalDialogBody>,
    );

    const body = container.querySelector(':only-child');

    const richText = body?.querySelector('p');

    expect(richText).toBeInTheDocument();
  });

  it('can be hidden', () => {
    const { container } = render(<ModalDialogBody hidden />);

    const body = container.querySelector(':only-child');

    expect(body).not.toBeVisible();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLDivElement>();

    const { container } = render(<ModalDialogBody ref={ref} />);

    const body = container.querySelector(':only-child');

    expect(ref.current).toBe(body);
  });
});
