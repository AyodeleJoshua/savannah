import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Card from '../Card';
import type { Recommendation } from '../../types';

// Mock the ValueScore component
vi.mock('../ValueScore', () => ({
  default: ({ score }: { score: number }) => (
    <div data-testid="value-score">Score: {score}</div>
  ),
}));

const mockRecommendation: Recommendation = {
  recommendationId: '1',
  title: 'Test Recommendation',
  description: 'This is a test recommendation description',
  score: 75,
  provider: [1, 2],
  frameworks: [
    { name: 'React', section: 'Frontend', subsection: 'React' },
    { name: 'TypeScript', section: 'Backend', subsection: 'TypeScript' },
  ],
  impactAssessment: {
    totalViolations: 25,
    mostImpactedScope: {
      name: 'Production',
      type: 'Production',
      count: 15,
    },
  },
  furtherReading: [
    { name: 'Documentation', href: 'https://example.com' },
  ],
  reasons: ['This is a test reason'],
  totalHistoricalViolations: 100,
  class: 1,
};

describe('Card', () => {
  const defaultProps = {
    recommendation: mockRecommendation,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders recommendation title', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('Test Recommendation')).toBeInTheDocument();
  });

  it('renders recommendation description', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('This is a test recommendation description')).toBeInTheDocument();
  });

  it('renders value score component', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByTestId('value-score')).toBeInTheDocument();
    expect(screen.getByText('Score: 75')).toBeInTheDocument();
  });

  it('renders impact assessment information', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('Impact assessment')).toBeInTheDocument();
    expect(screen.getByText('25 Violations / month')).toBeInTheDocument();
  });

  it('renders framework tags', () => {
    render(<Card {...defaultProps} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<Card {...defaultProps} />);
    
    const card = screen.getByTestId('card-icon-section');
    fireEvent.click(card);
    
    expect(defaultProps.onClick).toHaveBeenCalledWith(mockRecommendation);
  });

  it('renders cloud provider icons', () => {
    render(<Card {...defaultProps} />);
    const cloudIcons = screen.getAllByTestId('card-icon-section');
    expect(cloudIcons.length).toBeGreaterThan(0);
  });

  it('applies archived styling when isArchived is true', () => {
    render(<Card {...defaultProps} isArchived={true} />);
    
    const card = screen.getByTestId('card-icon-section');
    expect(card).toHaveClass('card__icon-section--archived');
  });

  it('does not apply archived styling when isArchived is false', () => {
    render(<Card {...defaultProps} isArchived={false} />);
    
    const card = screen.getByTestId('card-icon-section');
    expect(card).not.toHaveClass('card__icon-section--archived');
  });

  it('handles recommendation without frameworks', () => {
    const recommendationWithoutFrameworks = {
      ...mockRecommendation,
      frameworks: [],
    };
    
    render(<Card {...defaultProps} recommendation={recommendationWithoutFrameworks} />);
    
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });
}); 