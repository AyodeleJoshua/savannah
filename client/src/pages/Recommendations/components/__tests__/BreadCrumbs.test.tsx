import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BreadCrumbs } from '../BreadCrumbs';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BreadCrumbs', () => {
  const defaultProps = {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Recommendations', href: '/recommendations' },
      { label: 'Archive', href: '/recommendations/archive' },
    ],
  };

  it('renders all breadcrumb items', () => {
    renderWithRouter(<BreadCrumbs {...defaultProps} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
  });

  it('renders correct number of chevron separators', () => {
    renderWithRouter(<BreadCrumbs {...defaultProps} />);

    const chevrons = screen.getAllByTestId('chevron-container');
    expect(chevrons).toHaveLength(2);
  });

  it('applies correct styling to first item', () => {
    renderWithRouter(<BreadCrumbs {...defaultProps} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('text-gray-400');
  });

  it('applies correct styling to non-first items', () => {
    renderWithRouter(<BreadCrumbs {...defaultProps} />);

    const recommendationsLink = screen.getByText('Recommendations').closest('a');
    const archiveLink = screen.getByText('Archive').closest('a');
    
    expect(recommendationsLink).toHaveClass('text-gray-800', 'font-medium');
    expect(archiveLink).toHaveClass('text-gray-800', 'font-medium');
  });

  it('renders with single item', () => {
    const singleItemProps = {
      items: [{ label: 'Home', href: '/' }],
    };

    renderWithRouter(<BreadCrumbs {...singleItemProps} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    renderWithRouter(<BreadCrumbs {...defaultProps} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');

    const list = nav.querySelector('ol');
    expect(list).toBeInTheDocument();
  });
}); 