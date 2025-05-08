import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Navigation } from './index';
import { useScreenSize } from '../../hooks';
import { useClickOutside } from '../../hooks';
jest.mock('../../hooks/useClickOutside.ts', () => ({
  useClickOutside: jest.fn(),
}));

jest.mock('../../hooks/useScreenSize.ts');

const mockList = [
  { textContent: 'Home', href: '/' },
  { textContent: 'About', href: '/about' },
];
const mockToggleButton = {
  openText: 'Open Menu',
  closeText: 'Close Menu',
};
describe('Navigation Component', () => {
  beforeEach(() => {
    (useScreenSize as jest.Mock).mockReturnValue(1024); // default desktop size
    HTMLDialogElement.prototype.show = jest.fn(function () {
      // eslint-disable-next-line no-invalid-this
      this.open = true;
    });

    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      // eslint-disable-next-line no-invalid-this
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function () {
      // eslint-disable-next-line no-invalid-this
      this.open = false;
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders Navigation component', () => {
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={768} toggleButton={mockToggleButton} />);
    const nav = container.querySelector(':only-child');
    expect(nav).toBeInTheDocument();
  });
  test('should render the Navigation list on desktop view', () => {
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={768} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const navList = nav?.querySelector(':only-child');
    const navListItems = navList?.querySelectorAll('li a');

    expect(navListItems?.length).toBe(2);
    navListItems?.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href');
      expect(item).toHaveTextContent(/Home|About/);
    });
    expect(navList).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  test('should render the hamburger button in mobile view', () => {
    (useScreenSize as jest.Mock).mockReturnValue(500); // mobile size
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={768} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });

    expect(hamburgerButton).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });

  test('should toggle the dialog when hamburger button is clicked', () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // mobile size
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });

    fireEvent.click(hamburgerButton as HTMLButtonElement);
    const dialog = container.querySelector('dialog[open]');
    expect(nav).toBeInTheDocument();
    expect(dialog).toBeInTheDocument();
  });

  test('should close the dialog when close button is clicked', async () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // mobile size
    const user = userEvent.setup();
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });

    await user.click(hamburgerButton as HTMLButtonElement);

    const dialog = container.querySelector('dialog[open]');
    const closeButton = screen.getByRole('button', { name: 'Close Menu' });
    expect(dialog).toHaveAttribute('open');
    await user.click(closeButton as HTMLButtonElement);

    expect(nav).toBeInTheDocument();
    expect(dialog).toBeInTheDocument();
    await waitFor(() => {
      expect(container.querySelector('dialog[open]')).not.toBeInTheDocument();
    });
  });

  test('should close the drawer when clicking outside', () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // mobile size
    const clickOutsideHandler = jest.fn();
    (useClickOutside as jest.Mock).mockImplementation((ref, handler) => {
      clickOutsideHandler.mockImplementation(handler);
    });

    const { container } = render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);
    const dialog = container.querySelector('dialog[open]');
    clickOutsideHandler();
    expect(dialog).not.toBeInTheDocument();
  });
  test('should lock body scroll when drawer is open', () => {
    (useScreenSize as jest.Mock).mockReturnValue(500); // Mobile view
    render(<Navigation list={mockList} mobileBreakpoint={768} toggleButton={mockToggleButton} />);

    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(hamburgerButton);

    expect(document.body).toHaveStyle('overflow: hidden');
  });
  test('FocusTrap traps focus within the drawer when it is open', async () => {
    const user = userEvent.setup();
    (useScreenSize as jest.Mock).mockReturnValue(450); // Mobile view
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);

    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const dialog = container.querySelector('dialog');
      expect(dialog).toBeInTheDocument();
      const focusableElement = screen.getByText('Close Menu');
      expect(focusableElement).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      const closeButton = screen.getByText('Home');
      expect(closeButton).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      const closeButton = screen.getByText('About');
      expect(closeButton).toHaveFocus();
    });
    // Navigating backward through the focus trap and looping back to the start
    await user.tab();
    await waitFor(() => {
      const closeButton = screen.getByText('Close Menu');
      expect(closeButton).toHaveFocus();
    });
  });
  test('FocusTrap should deactivate when the drawer is closed', async () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // Mobile view
    const user = userEvent.setup();
    render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);
    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(hamburgerButton);
    const closeButton = screen.getByText('Close Menu');
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.getByText('Open Menu')).toHaveFocus();
    });
  });
  test('Pressing Escape should close the drawer and deactivate FocusTrap', async () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // Mobile view
    const user = userEvent.setup();
    render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);

    const hamburgerButton = screen.getByRole('button', { name: 'Open Menu' });
    await user.click(hamburgerButton);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Open Menu' })).toHaveFocus();
    });
  });
  test('should render the Navigation list on mobile view', () => {
    (useScreenSize as jest.Mock).mockReturnValue(450); // mobile size
    const { container } = render(<Navigation list={mockList} mobileBreakpoint={600} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const navList = nav?.querySelector(':only-child');
    const navListItems = navList?.querySelectorAll('li a');

    navListItems?.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href');
      expect(item).toHaveTextContent(/Home|About/);
    });
    expect(navList).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
  });
});
