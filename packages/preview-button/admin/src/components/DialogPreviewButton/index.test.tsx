import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import '@testing-library/jest-dom';
import { DialogPreviewButton } from './index';

describe('DialogPreviewButton', () => {
  const mockPreviewButtonClick = jest.fn();
  const mockCloseButtonClick = jest.fn();
  const mockStartActionClick = jest.fn();
  const mockEndActionClick = jest.fn();

  const defaultProps = {
    previewButton: {
      onClick: mockPreviewButtonClick,
      label: 'Preview',
    },
    dialog: {
      ref: createRef<HTMLDialogElement>(),
      title: 'Preview Dialog',
      body: <p>Dialog content</p>,
      closeButton: {
        onClick: mockCloseButtonClick,
        label: 'Close',
      },
      startAction: {
        onClick: mockStartActionClick,
        label: 'Cancel',
      },
      endAction: {
        onClick: mockEndActionClick,
        label: 'Confirm',
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders preview button with correct label', () => {
    render(<DialogPreviewButton {...defaultProps} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders dialog with title', () => {
    render(<DialogPreviewButton {...defaultProps} />);
    expect(screen.getByText('Preview Dialog')).toBeInTheDocument();
  });

  it('renders dialog body content', () => {
    render(<DialogPreviewButton {...defaultProps} />);
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('calls preview button onClick when clicked', async () => {
    const user = userEvent.setup();
    render(<DialogPreviewButton {...defaultProps} />);
    
    await user.click(screen.getByText('Preview'));
    expect(mockPreviewButtonClick).toHaveBeenCalledTimes(1);
  });

  it('renders with utrecht-theme class', () => {
    const { container } = render(<DialogPreviewButton {...defaultProps} />);
    expect(container.querySelector('.utrecht-theme')).toBeInTheDocument();
  });

  it('renders dialog body with utrecht-html class', () => {
    const { container } = render(<DialogPreviewButton {...defaultProps} />);
    expect(container.querySelector('.utrecht-html')).toBeInTheDocument();
  });
});
