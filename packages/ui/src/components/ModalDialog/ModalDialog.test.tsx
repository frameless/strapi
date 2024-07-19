import { render, screen } from '@testing-library/react';
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

  describe('open dialog', () => {
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

    it('can be hidden', () => {
      const { container } = render(<ModalDialog open hidden />);

      const drawer = container.querySelector(':only-child');

      expect(drawer).not.toBeVisible();
    });
  });
  describe('header', () => {
    it('renders a header', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world' }} />);

      const header = container.querySelector('.utrecht-modal-dialog__header');

      expect(header).toBeInTheDocument();
    });
    it('renders a heading 1 by default', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world' }} />);

      const heading = container.querySelector('h1');

      expect(heading).toBeInTheDocument();
    });
    it('renders a custom heading level', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world', headingLevel: 2 }} />);

      const heading = container.querySelector('h2');

      expect(heading).toBeInTheDocument();
    });
    it('renders a close button by default', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world', closeButton: {} }} />);

      const closeButton = container.querySelector('button');

      expect(closeButton).toBeInTheDocument();
    });
    it('renders a close button with label', () => {
      const { container } = render(
        <ModalDialog header={{ title: 'Hello, world', closeButton: { children: 'Close' } }} />,
      );

      const closeButton = container.querySelector('button');

      expect(closeButton).toHaveTextContent('Close');
    });
    it('renders a close button with icon by default', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world', closeButton: {} }} />);
      const icon = container.querySelector('utrecht-icon-close');
      expect(icon).toBeInTheDocument();
    });
    it('renders a close button with custom icon', () => {
      const { container } = render(
        <ModalDialog header={{ title: 'Hello, world', closeButton: { icon: <span>Close</span> } }} />,
      );
      const icon = container.querySelector('span');
      expect(icon).toBeInTheDocument();
    });
    it('renders a close button with custom icon and label', () => {
      const { container } = render(
        <ModalDialog header={{ title: 'Hello, world', closeButton: { icon: <span>X</span>, children: 'Close' } }} />,
      );
      const icon = container.querySelector('span');
      const label = screen.getByText('Close');

      expect(label).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { container } = render(
        <ModalDialog header={{ title: 'Hello, world', closeButton: { onClick: onClose } }} />,
      );

      const closeButton = container.querySelector('button');

      closeButton?.click();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
    it('renders a design system BEM class name', () => {
      const { container } = render(<ModalDialog header={{ title: 'Hello, world' }} />);

      const footer = container.querySelector('.utrecht-modal-dialog__header');

      expect(footer).toBeInTheDocument();
    });
  });
  describe('footer', () => {
    it('renders a footer', () => {
      const { container } = render(<ModalDialog footer={<button>Close</button>} />);

      const footer = container.querySelector('.utrecht-modal-dialog__footer');

      expect(footer).toBeInTheDocument();
    });
    it('renders a design system BEM class name', () => {
      const { container } = render(<ModalDialog footer={<button>Close</button>} />);

      const footer = container.querySelector('.utrecht-modal-dialog__footer');

      expect(footer).toBeInTheDocument();
    });
  });
  describe('onClose', () => {
    it('calls onClose when the dialog is closed', () => {
      const onClose = jest.fn();
      const { container } = render(<ModalDialog onClose={onClose} open />);

      const dialog = container.querySelector('dialog');

      dialog?.dispatchEvent(new Event('close'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
