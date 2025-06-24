import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VirtualizedRecommendationsList from "../VirtualizedRecommendationsList";
import type { Recommendation } from "../../types";

// Mock react-window
vi.mock('react-window', () => ({
	FixedSizeList: ({ 
		children, 
		itemCount, 
		itemData 
	}: {
		children: (props: { 
			index: number; 
			style: React.CSSProperties; 
			data: {
				recommendations: Recommendation[];
				onCardClick: (recommendation: Recommendation) => void;
				onLoadMore?: () => void;
				hasNextPage?: boolean;
				isFetchingNextPage?: boolean;
			};
		}) => React.ReactElement;
		itemCount: number;
		itemData: {
			recommendations: Recommendation[];
			onCardClick: (recommendation: Recommendation) => void;
			onLoadMore?: () => void;
			hasNextPage?: boolean;
			isFetchingNextPage?: boolean;
		};
	}) => (
		<div data-testid="virtualized-list">
			{Array.from({ length: Math.min(itemCount, 3) }, (_, index) => 
				children({ index, style: {}, data: itemData })
			)}
		</div>
	),
}));

const mockRecommendations: Recommendation[] = [
	{
		recommendationId: "1",
		title: "Test Recommendation 1",
		description: "Test description 1",
		score: 75,
		frameworks: [],
		impactAssessment: { 
			totalViolations: 10,
			mostImpactedScope: {
				name: "Test Scope",
				type: "resource",
				count: 5
			}
		},
		provider: [],
		reasons: [],
		totalHistoricalViolations: 0,
		furtherReading: [],
		class: 0,
	},
	{
		recommendationId: "2",
		title: "Test Recommendation 2",
		description: "Test description 2",
		score: 85,
		frameworks: [],
		impactAssessment: { 
			totalViolations: 15,
			mostImpactedScope: {
				name: "Test Scope 2",
				type: "resource",
				count: 8
			}
		},
		provider: [],
		reasons: [],
		totalHistoricalViolations: 0,
		furtherReading: [],
		class: 0,
	},
];

const mockOnCardClick = vi.fn();

describe('VirtualizedRecommendationsList', () => {
	it('renders recommendations list', () => {
		render(
			<VirtualizedRecommendationsList
				recommendations={mockRecommendations}
				onCardClick={mockOnCardClick}
				containerHeight={600}
				itemHeight={200}
			/>
		);

		expect(screen.getByTestId('virtualized-recommendations-list')).toBeInTheDocument();
		expect(screen.getByTestId('virtualized-list')).toBeInTheDocument();
	});

	it('shows empty state when no recommendations', () => {
		render(
			<VirtualizedRecommendationsList
				recommendations={[]}
				onCardClick={mockOnCardClick}
				containerHeight={600}
				itemHeight={200}
			/>
		);

		expect(screen.getByTestId('no-recommendations-message')).toBeInTheDocument();
		expect(screen.getByText('No recommendations found')).toBeInTheDocument();
	});

	it('renders correct number of items', () => {
		render(
			<VirtualizedRecommendationsList
				recommendations={mockRecommendations}
				onCardClick={mockOnCardClick}
				containerHeight={600}
				itemHeight={200}
			/>
		);

		// Should render up to 3 items (limited by our mock)
		expect(screen.getByTestId('virtualized-row-0')).toBeInTheDocument();
		expect(screen.getByTestId('virtualized-row-1')).toBeInTheDocument();
	});
}); 