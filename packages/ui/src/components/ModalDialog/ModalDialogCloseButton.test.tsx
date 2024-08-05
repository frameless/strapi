import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import React from 'react';
import { ModalDialogCloseButton } from './ModalDialogCloseButton';
import '@testing-library/jest-dom';

describe('ModalDialogCloseButton', () => {
  it('renders a design system BEM class name', () => {
    const { container } = render(<ModalDialogCloseButton />);

    expect(container.querySelector(':only-child')).toHaveClass('utrecht-modal-dialog__close-button');
  });
  it('can have a additional class name', () => {
    const { container } = render(<ModalDialogCloseButton className="custom-css-class" />);

    const closeButton = container.querySelector(':only-child');
    expect(closeButton).toHaveClass('custom-css-class');
    expect(closeButton).toHaveClass('utrecht-modal-dialog__close-button');
  });
  it('can be hidden', () => {
    const { container } = render(<ModalDialogCloseButton hidden />);

    const body = container.querySelector(':only-child');

    expect(body).not.toBeVisible();
  });
  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLButtonElement>();

    const { container } = render(<ModalDialogCloseButton ref={ref} />);

    const body = container.querySelector(':only-child');

    expect(ref.current).toBe(body);
  });
  it('renders an icon by default', () => {
    const { container } = render(<ModalDialogCloseButton />);

    const button = container.querySelector(':only-child');
    const icon = button?.querySelector('utrecht-icon-close');
    expect(icon).toBeInTheDocument();
  });
  it('renders an custom icon', () => {
    const { container } = render(<ModalDialogCloseButton icon={<span>Icon</span>} />);

    const closeButton = container.querySelector(':only-child');

    const icon = closeButton?.querySelector('span');

    expect(icon).toBeInTheDocument();
  });
  it('renders a label', () => {
    const { container } = render(
      <ModalDialogCloseButton>
        <span>Label</span>
      </ModalDialogCloseButton>,
    );

    const closeButton = container.querySelector(':only-child');

    const label = closeButton?.querySelector('span');

    expect(label).toHaveTextContent('Label');
  });
  it('calls onClick when clicked', () => {
    const onClose = jest.fn();
    render(<ModalDialogCloseButton onClick={onClose} />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
  it('renders accessible button', () => {
    render(<ModalDialogCloseButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
