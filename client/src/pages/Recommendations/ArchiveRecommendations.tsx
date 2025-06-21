import { PiArchiveBold } from "react-icons/pi";
import Card from "./components/Card/index";
import RecommendationDetailsModal from "./components/RecommendationDetailsModal";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import type { Recommendation } from "./types";
import styles from "./styles.module.scss";
import InputFilterWithPagination from "./components/InputFilterWithPagination";
import { debounceSearch } from "../../utils/debounce";
import useGetArchivedRecommendations from "./hooks/useGetAllArchievedRecommendations";
import { BreadCrumbs } from "./components/BreadCrumbs";
import FetchingIndicator from "./components/FetchingIndicator";

export default function ArchiveRecommendations() {
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
  } = useGetArchivedRecommendations();

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

  // TODO: Use skeleton for loading state
  return (
    <div className="mt-10" data-testid="archive-page">
      <div className="mb-6">
        <BreadCrumbs
          items={[
            { label: "Recommendations", href: "/recommendations" },
            { label: "Archive", href: "/recommendations/archived" },
          ]}
        />
      </div>
      <div className="flex justify-between">
        <h2 className="flex items-center gap-2">
          <span className="text-3xl font-medium" data-testid="archive-title">
            Recommendations Archive
          </span>
          <span>
            <PiArchiveBold size={20} />
          </span>
        </h2>
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
          <p
            className="text-center text-2xl font-medium"
            data-testid="no-archived-message"
          >
            No archived recommendations found
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
                    isArchived
                  />
                </div>
              );
            }
            return (
              <Card
                key={recommendation.recommendationId}
                recommendation={recommendation}
                onClick={handleCardClick}
                isArchived
              />
            );
          }),
        )}
        {isLoading && (
          <p className="mb-4" data-testid="loading-indicator">
            Loading...
          </p>
        )}
        {isFetchingNextPage && <FetchingIndicator />}
      </div>

      {/* Recommendation Details Modal */}
      {selectedRecommendation && (
        <RecommendationDetailsModal
          recommendation={selectedRecommendation}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isArchived={true}
        />
      )}
    </div>
  );
}
