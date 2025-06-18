import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Input from '../Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const icon = <span data-testid="icon">🔍</span>;
    render(<Input iconLeft={icon} />);
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom input className', () => {
    render(<Input inputClassName="custom-input-class" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input-class');
  });

  it('applies custom wrapper className', () => {
    render(<Input className="custom-wrapper-class" />);
    
    const wrapper = screen.getByRole('textbox').parentElement?.parentElement;
    expect(wrapper).toHaveClass('custom-wrapper-class');
  });

  it('passes through all input props', () => {
    render(
      <Input
        type="email"
        name="email"
        value="test@example.com"
        required
        disabled
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveValue('test@example.com');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it('renders without icon when iconLeft is not provided', () => {
    render(<Input />);
    
    const wrapper = screen.getByRole('textbox').parentElement?.parentElement;
    expect(wrapper?.querySelector('[class*="icon"]')).not.toBeInTheDocument();
  });
}); 