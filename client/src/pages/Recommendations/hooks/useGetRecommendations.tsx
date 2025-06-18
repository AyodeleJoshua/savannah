import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllRecommendations } from "../services/recommendations";
import { useState } from "react";

interface useGetRecommendationsParams {
  limit?: number;
}

const useGetRecommendations = (params: useGetRecommendationsParams = {}) => {
  const { limit = 10 } = params;

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
    queryKey: ["recommendations", search, tags],
    queryFn: ({ pageParam }) =>
      getAllRecommendations(pageParam, limit, search, tags),
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

export default useGetRecommendations;
