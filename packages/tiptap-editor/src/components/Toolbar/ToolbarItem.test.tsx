import { fireEvent, render, screen } from '@testing-library/react';
import { TbBold } from 'react-icons/tb';
import { ToolbarItem } from './ToolbarItem';

describe('ToolbarItem', () => {
  it('renders correctly', () => {
    const { container } = render(<ToolbarItem label="Bold" isActive />);
    expect(container).toBeInTheDocument();
  });
  it('renders correctly with disabled state', () => {
    render(<ToolbarItem label="Bold" disabled />);
    const button = screen.getByRole('button');

    expect(button.getAttribute('disabled')).toBeDefined();
  });
  it('should render utrecht-button--primary-action CSS class if isActive prop is true', () => {
    render(<ToolbarItem label="Bold" isActive />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('utrecht-button--primary-action');
  });
  it('should render utrecht-button--secondary-action CSS class by default', () => {
    render(<ToolbarItem label="Bold" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('utrecht-button--secondary-action');
  });
  it('should render with icon if icon prop is provided', () => {
    const { container } = render(<ToolbarItem label="Bold" icon={<TbBold />} />);
    const icon = container.querySelector('.utrecht-tiptap-toolbar__icon');
    expect(icon).toBeInTheDocument();
  });
  it('should render with label if label prop is provided', async () => {
    const { getByText } = render(<ToolbarItem label="Bold" />);
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    expect(getByText('Bold')).toBeInTheDocument();
  });
  it('should call onClick prop when clicked', () => {
    const onClick = jest.fn();
    render(<ToolbarItem label="Bold" onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
  it('should not call onClick prop when clicked and disabled is true', () => {
    const onClick = jest.fn();
    render(<ToolbarItem label="Bold" onClick={onClick} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
