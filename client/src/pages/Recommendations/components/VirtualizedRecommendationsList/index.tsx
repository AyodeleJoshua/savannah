import { FixedSizeList as List } from 'react-window';
import { useMemo, useCallback } from 'react';
import Card from '../Card';
import type { Recommendation } from '../../types';
import styles from './styles.module.scss';

interface IVirtualizedRecommendationsListProps {
	recommendations: Recommendation[];
	onCardClick: (recommendation: Recommendation) => void;
	containerHeight: number;
	itemHeight: number;
	onLoadMore?: () => void;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}

interface IRowProps {
	index: number;
	style: React.CSSProperties;
	data: {
		recommendations: Recommendation[];
		onCardClick: (recommendation: Recommendation) => void;
		onLoadMore?: () => void;
		hasNextPage?: boolean;
		isFetchingNextPage?: boolean;
	};
}

const Row = ({ index, style, data }: IRowProps) => {
	const { recommendations, onCardClick, onLoadMore, hasNextPage, isFetchingNextPage } = data;
	
	const isLastItem = index === recommendations.length - 1;
	
	if (isLastItem && hasNextPage && onLoadMore && !isFetchingNextPage) {
		setTimeout(() => {
			onLoadMore();
		}, 0);
	}

	const recommendation = recommendations[index];
	
	if (!recommendation) {
		return null;
	}

	return (
		<div style={style} data-testid={`virtualized-row-${index}`}>
			<Card 
				recommendation={recommendation} 
				onClick={onCardClick} 
			/>
		</div>
	);
};

export default function VirtualizedRecommendationsList({
	recommendations,
	onCardClick,
	containerHeight,
	itemHeight,
	onLoadMore,
	hasNextPage = false,
	isFetchingNextPage = false,
}: IVirtualizedRecommendationsListProps) {
	const itemData = useMemo(() => ({
		recommendations,
		onCardClick,
		onLoadMore,
		hasNextPage,
		isFetchingNextPage,
	}), [recommendations, onCardClick, onLoadMore, hasNextPage, isFetchingNextPage]);

	const itemKey = useCallback((index: number) => {
		const recommendation = recommendations[index];
		return recommendation?.recommendationId || index;
	}, [recommendations]);

	if (recommendations.length === 0) {
		return (
			<div className={styles['virtualized-list__empty']}>
				<p
					className="text-center text-[1.5rem] font-medium"
					data-testid="no-recommendations-message"
				>
					No recommendations found
				</p>
			</div>
		);
	}

	return (
		<div 
			className={styles['virtualized-list__container']}
			data-testid="virtualized-recommendations-list"
		>
			<List
				height={containerHeight}
				width="100%"
				itemCount={recommendations.length}
				itemSize={itemHeight}
				itemData={itemData}
				itemKey={itemKey}
				className={styles['virtualized-list__list']}
				overscanCount={5}
			>
				{Row}
			</List>
		</div>
	);
} 