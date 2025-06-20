import Card from "./components/Card/index";
import RecommendationDetailsModal from "./components/RecommendationDetailsModal";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useGetRecommendations from "./hooks/useGetRecommendations";
import type { Recommendation } from "./types";
import styles from "./styles.module.scss";
import InputFilterWithPagination from "./components/InputFilterWithPagination";
import PageHeader from "./components/PageHeader";
import { debounceSearch } from "../../utils/debounce";

export default function Recommendations() {
  const { ref, inView } = useInView();
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  const handleCardClick = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecommendation(null);
  };

  const debouncedSearchHandler = debounceSearch((searchTerm: string) => {
    setSearch(searchTerm);
  });

  if (error)
    return (
      <div className="mt-10" data-testid="error-message">
        {"An error has occurred: " + (error as Error).message}
      </div>
    );

  return (
    <div data-testid="recommendations-page">
      <PageHeader />
      <InputFilterWithPagination
        multiSelectOptions={
          data?.pages[0]?.availableTags?.providers?.map((provider) => ({
            label: provider,
            count: 0,
            id: provider,
          })) || []
        }
        pagination={{
          currentPage:
            Math.ceil(
              (data?.pages.flatMap((page) => page.data).length || 0) / 10,
            ) || 1,
          itemsPerPage: 10,
          totalItems: data?.pages[0]?.pagination?.totalItems || 0,
        }}
        onMultiselectDropdownChange={(selectedItems) => {
          setTags(selectedItems);
        }}
        onSearchChange={debouncedSearchHandler}
      />
      <div
        className={`${styles["recommendations__content"]} ${styles["scrollbar-hide"]}`}
      >
        {data?.pages[0]?.data?.length === 0 && (
          <p className="text-center text-[1.5rem] font-medium" data-testid="no-recommendations-message">
            No recommendations found
          </p>
        )}

        {data?.pages.map((page) =>
          page.data?.map((recommendation, index) => {
            if (page.data.length === index + 1) {
              return (
                <div ref={ref} key={recommendation.recommendationId}>
                  <Card
                    recommendation={recommendation}
                    onClick={handleCardClick}
                  />
                </div>
              );
            }
            return (
              <Card
                key={recommendation.recommendationId}
                recommendation={recommendation}
                onClick={handleCardClick}
              />
            );
          }),
        )}
        {isLoading && <p className="mb-4" data-testid="loading-indicator">Loading...</p>}
        {isFetchingNextPage && <p className="mb-4" data-testid="loading-more-indicator">Fetching next page...</p>}
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
