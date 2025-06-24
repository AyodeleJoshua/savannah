import RecommendationDetailsModal from "./components/RecommendationDetailsModal";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import useGetRecommendations from "./hooks/useGetRecommendations";
import type { Recommendation } from "./types";
import styles from "./styles.module.scss";
import InputFilterWithPagination from "./components/InputFilterWithPagination";
import PageHeader from "./components/PageHeader";
import { debounceSearch } from "../../utils/debounce";
import FetchingIndicator from "./components/FetchingIndicator";
import { transformAvailableTagsToOptions } from "./utils/tagOptions";
import VirtualizedRecommendationsList from "./components/VirtualizedRecommendationsList";

export default function Recommendations() {
	const [selectedRecommendation, setSelectedRecommendation] =
		useState<Recommendation | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerHeight, setContainerHeight] = useState(600);

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		setSearch,
		setTags,
	} = useGetRecommendations();

	const flattenedRecommendations = useMemo(() => {
		return data?.pages.flatMap((page) => page.data) || [];
	}, [data?.pages]);

	const paginationData = useMemo(() => {
		const totalItems = data?.pages[0]?.pagination?.totalItems || 0;
		const currentItemsCount = flattenedRecommendations.length;
		const currentPage = Math.ceil(currentItemsCount / 10) || 1;

		return {
			currentPage,
			itemsPerPage: 10,
			totalItems,
		};
	}, [flattenedRecommendations.length, data?.pages[0]?.pagination?.totalItems]);

	const multiSelectOptions = useMemo(() => {
		return transformAvailableTagsToOptions(data?.pages[0]?.availableTags);
	}, [data?.pages[0]?.availableTags]);

	const debouncedSearchHandler = useMemo(
		() =>
			debounceSearch((searchTerm: string) => {
				setSearch(searchTerm);
			}),
		[setSearch],
	);

	const handleCardClick = useCallback((recommendation: Recommendation) => {
		setSelectedRecommendation(recommendation);
		setIsModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
		setSelectedRecommendation(null);
	}, []);

	const handleMultiselectChange = useCallback(
		(selectedItems: string[]) => {
			setTags(selectedItems);
		},
		[setTags],
	);

	const handleLoadMore = useCallback(() => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	useEffect(() => {
		const updateContainerHeight = () => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const topOffset = rect.top;
				const bottomPadding = 20;
				const newHeight = viewportHeight - topOffset - bottomPadding;
				setContainerHeight(Math.max(400, newHeight));
			}
		};

		updateContainerHeight();
		window.addEventListener('resize', updateContainerHeight);
		
		return () => {
			window.removeEventListener('resize', updateContainerHeight);
		};
	}, []);

	const ITEM_HEIGHT = 140;

	if (error)
		return (
			<div className="mt-10" data-testid="error-message">
				{"An error has occurred: " + (error as Error).message}
			</div>
		);

	return (
		<div data-testid="recommendations-page" ref={containerRef}>
			<PageHeader />
			<InputFilterWithPagination
				multiSelectOptions={multiSelectOptions}
				pagination={paginationData}
				onMultiselectDropdownChange={handleMultiselectChange}
				onSearchChange={debouncedSearchHandler}
			/>
			
			<div className={styles["recommendations__content"]}>
				{isLoading && flattenedRecommendations.length === 0 ? (
					<p className="mb-4" data-testid="loading-indicator">
						Loading...
					</p>
				) : (
					<VirtualizedRecommendationsList
						recommendations={flattenedRecommendations}
						onCardClick={handleCardClick}
						containerHeight={containerHeight}
						itemHeight={ITEM_HEIGHT}
						onLoadMore={handleLoadMore}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
					/>
				)}
				
				{isFetchingNextPage && (
					<div className="mt-4">
						<FetchingIndicator />
					</div>
				)}
			</div>

			{/* Recommendation Details Modal */}
			{selectedRecommendation && (
				<RecommendationDetailsModal
					recommendation={selectedRecommendation}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
}
