import { render, screen } from '@testing-library/react';
import ValueScore from '../ValueScore';

describe('ValueScore', () => {
  it('renders value score label', () => {
    render(<ValueScore score={50} />);
    
    expect(screen.getByText('Value score')).toBeInTheDocument();
  });

  it('renders correct number of score boxes', () => {
    render(<ValueScore score={50} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    expect(scoreBoxes).toHaveLength(4);
  });

  it('activates correct number of boxes for score 25', () => {
    render(<ValueScore score={25} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    expect(scoreBoxes[0]).toHaveClass('score__value-box');
    expect(scoreBoxes[1]).toHaveClass('score__value-box--inactive');
    expect(scoreBoxes[2]).toHaveClass('score__value-box--inactive');
    expect(scoreBoxes[3]).toHaveClass('score__value-box--inactive');
  });

  it('activates correct number of boxes for score 50', () => {
    render(<ValueScore score={50} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    expect(scoreBoxes[0]).toHaveClass('score__value-box');
    expect(scoreBoxes[1]).toHaveClass('score__value-box');
    expect(scoreBoxes[2]).toHaveClass('score__value-box--inactive');
    expect(scoreBoxes[3]).toHaveClass('score__value-box--inactive');
  });

  it('activates correct number of boxes for score 75', () => {
    render(<ValueScore score={75} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    expect(scoreBoxes[0]).toHaveClass('score__value-box');
    expect(scoreBoxes[1]).toHaveClass('score__value-box');
    expect(scoreBoxes[2]).toHaveClass('score__value-box');
    expect(scoreBoxes[3]).toHaveClass('score__value-box--inactive');
  });

  it('activates all boxes for score 100', () => {
    render(<ValueScore score={100} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    scoreBoxes.forEach(box => {
      expect(box).toHaveClass('score__value-box');
    });
  });

  it('handles score above 100', () => {
    render(<ValueScore score={150} />);
    
    const scoreBoxes = screen.getAllByTestId('score-box');
    scoreBoxes.forEach(box => {
      expect(box).toHaveClass('score__value-box');
    });
  });
}); 