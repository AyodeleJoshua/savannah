import { PiStarFourFill, PiArchiveBold } from "react-icons/pi";
import Card from "./components/Card/index";
import RecommendationDetailsModal from "./components/RecommendationDetailsModal";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import useGetRecommendations from "./hooks/useGetRecommendations";
import type { Recommendation } from "./types";
import styles from "./styles.module.scss";
import InputFilterWithPagination from "./components/InputFilterWithPagination";
import { Link } from "react-router-dom";
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

  if (error as any)
    return (
      <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
      </div>
    );

  // TODO: Use skeleton for loading state
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="flex items-center gap-2">
          <span className="text-2xl font-medium">Recommendations</span>
          <span className="text-[var(--color-text-active)]">
            <PiStarFourFill size={20} />
          </span>
        </h2>
        <Link
          to="/recommendations/archived"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-500 cursor-pointer"
        >
          <PiArchiveBold size={20} /> Archive
        </Link>
      </div>
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
        className={`mt-12 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto ${styles["scrollbar-hide"]}`}
      >
        {data?.pages[0]?.data?.length === 0 && (
          <p className="text-center text-2xl font-medium">
            No recommendations found
          </p>
        )}

        {data?.pages.map((page) =>
          page.data?.map((recommendation, index) => {
            if (page.data.length === index + 1) {
              return (
                <div ref={ref} key={recommendation.recommendationId}>
                  <Card
                    key={recommendation.recommendationId}
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
        {isLoading && <p className="mb-4">Loading...</p>}
        {isFetchingNextPage && <p className="mb-4">Fetching next page...</p>}
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
