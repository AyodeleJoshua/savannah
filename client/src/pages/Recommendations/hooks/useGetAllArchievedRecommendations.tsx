import { useInfiniteQuery } from "@tanstack/react-query";
import { getArchivedRecommendations } from "../services/recommendations";
import { useState } from "react";

const useGetArchivedRecommendations = () => {
  const LIMIT = 10;

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["archivedRecommendations", search, tags],
    queryFn: ({ pageParam }) =>
      getArchivedRecommendations(pageParam, LIMIT, search, tags),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.cursor?.next || undefined,
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setSearch,
    setTags,
  };
};

export default useGetArchivedRecommendations;
