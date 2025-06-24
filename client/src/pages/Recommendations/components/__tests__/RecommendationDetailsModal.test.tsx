import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RecommendationDetailsModal from '../RecommendationDetailsModal';
import type { Recommendation } from '../../types';

// Mock the ValueScore component
vi.mock('../ValueScore', () => ({
  default: ({ score }: { score: number }) => (
    <div data-testid="value-score">Score: {score}</div>
  ),
}));

// Mock the useArchiveRecommendation hook
vi.mock('../../hooks/useArchiveRecommendation', () => ({
  default: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
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

describe('RecommendationDetailsModal', () => {
  const defaultProps = {
    recommendation: mockRecommendation,
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when isOpen is true', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Test Recommendation')).toBeInTheDocument();
    expect(screen.getByText('This is a test recommendation description')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<RecommendationDetailsModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Recommendation')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders value score component', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    expect(screen.getByTestId('value-score')).toBeInTheDocument();
    expect(screen.getByText('Score: 75')).toBeInTheDocument();
  });

  it('renders impact assessment cards', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Impact Assessment')).toBeInTheDocument();
    expect(screen.getByText('Overall')).toBeInTheDocument();
    expect(screen.getByText('Most impacted scope')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('renders further reading links', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    const link = screen.getByText('Documentation');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders provider icons correctly', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    // Should render provider icons based on provider IDs
    const providerIcons = screen.getAllByRole('generic').filter(el => 
      el.querySelector('svg')
    );
    expect(providerIcons.length).toBeGreaterThan(0);
  });

  it('handles escape key press', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles click outside modal', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    const overlays = screen.getAllByRole('generic');
    const overlay = overlays.find(el => 
      el.className.includes('modal-overlay')
    );
    fireEvent.mouseDown(overlay!);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('renders archived state correctly', () => {
    render(<RecommendationDetailsModal {...defaultProps} isArchived={true} />);
    
    // Should render archive-related content
    expect(screen.getByText('Test Recommendation')).toBeInTheDocument();
  });

  it('renders all sections correctly', () => {
    render(<RecommendationDetailsModal {...defaultProps} />);
    
    expect(screen.getByTestId('modal-description')).toBeInTheDocument();
    expect(screen.getByText('Resources enforced by policy')).toBeInTheDocument();
    expect(screen.getByText('Reasons')).toBeInTheDocument();
    expect(screen.getByText('Impact Assessment')).toBeInTheDocument();
    expect(screen.getByText('Further Reading')).toBeInTheDocument();
  });
}); 