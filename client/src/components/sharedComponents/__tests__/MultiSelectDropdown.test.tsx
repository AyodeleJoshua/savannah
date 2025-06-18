import { render, screen, fireEvent } from '@testing-library/react';
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
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Filter');
  });

  it('opens dropdown when button is clicked', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByPlaceholderText('Search options...')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('filters options when search term is entered', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const searchInput = screen.getByPlaceholderText('Search options...');
    fireEvent.change(searchInput, { target: { value: 'Option 1' } });
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  it('calls onSelectionChange when option is selected', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const checkbox = screen.getByDisplayValue('1');
    fireEvent.click(checkbox);
    
    expect(defaultProps.onSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('calls onSelectionChange when option is deselected', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const checkbox = screen.getByDisplayValue('1');
    fireEvent.click(checkbox); // Select
    fireEvent.click(checkbox); // Deselect
    
    expect(defaultProps.onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('clears all selections when clear button is clicked', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);
    
    expect(defaultProps.onSelectionChange).toHaveBeenCalledWith([]);
  });

  it('closes dropdown when clicking outside', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByPlaceholderText('Search options...')).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByPlaceholderText('Search options...')).not.toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<MultiSelectDropdown {...defaultProps} placeholder="Custom placeholder" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('renders with custom button text', () => {
    render(<MultiSelectDropdown {...defaultProps} buttonText="Custom Button" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Custom Button');
  });

  it('displays option counts', () => {
    render(<MultiSelectDropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('handles empty options array', () => {
    render(<MultiSelectDropdown {...defaultProps} options={[]} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
}); 