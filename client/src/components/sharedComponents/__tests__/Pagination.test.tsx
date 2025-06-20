import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders pagination information correctly', () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
      />
    );
    
    expect(screen.getByText('Showing 1 of 100 results')).toBeInTheDocument();
  });

  it('calculates start item correctly for first page', () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
      />
    );
    
    expect(screen.getByText('Showing 1 of 100 results')).toBeInTheDocument();
  });

  it('calculates start item correctly for second page', () => {
    render(
      <Pagination
        currentPage={2}
        itemsPerPage={10}
        totalItems={100}
      />
    );
    
    expect(screen.getByText('Showing 11 of 100 results')).toBeInTheDocument();
  });

  it('calculates start item correctly for third page', () => {
    render(
      <Pagination
        currentPage={3}
        itemsPerPage={10}
        totalItems={100}
      />
    );
    
    expect(screen.getByText('Showing 21 of 100 results')).toBeInTheDocument();
  });

  it('handles different items per page', () => {
    render(
      <Pagination
        currentPage={2}
        itemsPerPage={5}
        totalItems={20}
      />
    );
    
    expect(screen.getByText('Showing 6 of 20 results')).toBeInTheDocument();
  });

  it('handles single item per page', () => {
    render(
      <Pagination
        currentPage={5}
        itemsPerPage={1}
        totalItems={10}
      />
    );
    
    expect(screen.getByText('Showing 5 of 10 results')).toBeInTheDocument();
  });

  it('handles zero total items', () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={0}
      />
    );
    
    expect(screen.getByText('Showing 1 of 0 results')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(
      <Pagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
      />
    );
    
    const container = screen.getByTestId('pagination');
    expect(container).toHaveClass('text-gray-600', 'text-[1.4rem]');
  });
}); 