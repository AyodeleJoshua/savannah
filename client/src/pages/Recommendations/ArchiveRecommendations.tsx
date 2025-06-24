import { PiArchiveBold } from "react-icons/pi";
import RecommendationDetailsModal from "./components/RecommendationDetailsModal";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import type { Recommendation } from "./types";
import styles from "./styles.module.scss";
import InputFilterWithPagination from "./components/InputFilterWithPagination";
import { debounceSearch } from "../../utils/debounce";
import useGetArchivedRecommendations from "./hooks/useGetAllArchievedRecommendations";
import { BreadCrumbs } from "./components/BreadCrumbs";
import { transformAvailableTagsToOptions } from "./utils/tagOptions";
import FetchingIndicator from "./components/FetchingIndicator";
import VirtualizedRecommendationsList from "./components/VirtualizedRecommendationsList";

export default function ArchiveRecommendations() {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const breadcrumbItems = useMemo(
    () => [
      { label: "Recommendations", href: "/recommendations" },
      { label: "Archive", href: "/recommendations/archived" },
    ],
    [],
  );

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
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
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
    <div className="mt-10" data-testid="archive-page">
      <div className="mb-6">
        <BreadCrumbs items={breadcrumbItems} />
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
        multiSelectOptions={multiSelectOptions}
        pagination={paginationData}
        onMultiselectDropdownChange={handleMultiselectChange}
        onSearchChange={debouncedSearchHandler}
      />
      <div
        className={styles["recommendations__content"]}
        ref={containerRef}
        style={{ height: `${containerHeight}px` }}
      >
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
          isArchived={true}
        />
      )}
    </div>
  );
}
