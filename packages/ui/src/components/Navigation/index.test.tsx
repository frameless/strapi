import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';

// ESM-native mocking — must use unstable_mockModule, must come before dynamic imports
jest.unstable_mockModule('../../hooks', () => ({
  useClickOutside: jest.fn(),
  useDialog: jest.fn(),
  useLockBody: jest.fn().mockImplementation(({ visible }: any) => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }),
}));

// Dynamic imports MUST come after unstable_mockModule calls
const { useClickOutside } = await import('../../hooks');
const { Navigation } = await import('./index');

const mockedUseClickOutside = jest.mocked(useClickOutside);

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
    mockedUseClickOutside.mockImplementation(() => {});

    HTMLDialogElement.prototype.show = jest.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.showModal = jest.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = jest.fn(function (this: HTMLDialogElement) {
      this.open = false;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Navigation component', () => {
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    expect(container.querySelector(':only-child')).toBeInTheDocument();
  });

  test('should render the Navigation list', () => {
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    const nav = container.querySelector('nav');
    const navListItems = nav?.querySelectorAll('li a');

    expect(navListItems?.length).toBe(2);
    navListItems?.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href');
      expect(item).toHaveTextContent(/Home|About/);
    });
    expect(nav).toBeInTheDocument();
  });

  test('should always render the hamburger toggle button', () => {
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  test('should toggle the dialog when hamburger button is clicked', () => {
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Menu' }));
    expect(container.querySelector('dialog[open]')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  test('should close the dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);

    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
    const dialog = container.querySelector('dialog[open]');
    expect(dialog).toHaveAttribute('open');

    await user.click(screen.getByRole('button', { name: 'Close Menu' }));
    expect(container.querySelector('nav')).toBeInTheDocument();
    await waitFor(() => {
      expect(container.querySelector('dialog[open]')).not.toBeInTheDocument();
    });
  });

  test('should close the drawer when clicking outside', () => {
    const clickOutsideHandler = jest.fn();
    mockedUseClickOutside.mockImplementation((...args: unknown[]) => {
      const handler = args[1] as () => void;
      clickOutsideHandler.mockImplementation(handler);
    });

    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    const dialog = container.querySelector('dialog[open]');
    clickOutsideHandler();
    expect(dialog).not.toBeInTheDocument();
  });

  test('should lock body scroll when drawer is open', () => {
    render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Menu' }));
    expect(document.body).toHaveStyle('overflow: hidden');
  });

  test('FocusTrap traps focus within the drawer when it is open', async () => {
    const user = userEvent.setup();
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);

    fireEvent.click(screen.getByRole('button', { name: 'Open Menu' }));

    await waitFor(() => {
      expect(container.querySelector('dialog')).toBeInTheDocument();
      expect(screen.getByText('Close Menu')).toHaveFocus();
    });

    const dialog = container.querySelector('dialog')!;
    await user.tab();
    await waitFor(() => expect(within(dialog).getByText('Home')).toHaveFocus());
    await user.tab();
    await waitFor(() => expect(within(dialog).getByText('About')).toHaveFocus());
    await user.tab();
    await waitFor(() => expect(within(dialog).getByText('Close Menu')).toHaveFocus());
  });

  test('FocusTrap should deactivate when the drawer is closed', async () => {
    const user = userEvent.setup();
    render(<Navigation list={mockList} toggleButton={mockToggleButton} />);

    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
    await user.click(screen.getByText('Close Menu'));
    await waitFor(() => expect(screen.getByText('Open Menu')).toHaveFocus());
  });

  test('Pressing Escape should close the drawer and deactivate FocusTrap', async () => {
    const user = userEvent.setup();
    render(<Navigation list={mockList} toggleButton={mockToggleButton} />);

    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(screen.getByRole('button', { name: 'Open Menu' })).toHaveFocus());
  });

  test('should render navigation list items', () => {
    const { container } = render(<Navigation list={mockList} toggleButton={mockToggleButton} />);
    const navListItems = container.querySelector('nav')?.querySelectorAll('li a');

    navListItems?.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('href');
      expect(item).toHaveTextContent(/Home|About/);
    });
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
