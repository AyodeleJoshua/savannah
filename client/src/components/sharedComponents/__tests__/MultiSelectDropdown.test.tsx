import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MultiSelectDropdown from '../MultiSelectDropdown';

describe('MultiSelectDropdown', () => {
  const defaultOptions = [
    { id: '1', label: 'Option 1', count: 10 },
    { id: '2', label: 'Option 2', count: 5 },
    { id: '3', label: 'Option 3', count: 15 },
  ];

  const defaultProps = {
    options: defaultOptions,
    onSelectionChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dropdown button', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const dropdownButton = screen.getByTestId("multi-select-dropdown");
    expect(dropdownButton).toBeInTheDocument();
    expect(dropdownButton).toHaveTextContent('Filter');
  });

  it('renders with custom button text', () => {
    render(<MultiSelectDropdown {...defaultProps} buttonText="Custom Button" />);
    
    const dropdownButton = screen.getByTestId("multi-select-dropdown");
    expect(dropdownButton).toHaveTextContent('Custom Button');
  });

  it('handles empty options array', () => {
    render(<MultiSelectDropdown {...defaultProps} options={[]} />);
    
    const dropdownButton = screen.getByTestId("multi-select-dropdown");
    expect(dropdownButton).toBeInTheDocument();
  });
}); 