import { apiClient } from "../../../services/axiosSetup";
import type { RecommendationResponse } from "../types";

export const getAllRecommendations = async (
  cursor?: string,
  limit?: number,
  search?: string,
  tags?: string[],
): Promise<RecommendationResponse> => {
  const response = await apiClient.get("/recommendations", {
    params: { cursor, limit, search, tags: tags?.join(",") },
  });
  return response.data;
};

export const getArchivedRecommendations = async (
  cursor?: string,
  limit?: number,
  search?: string,
  tags?: string[],
): Promise<RecommendationResponse> => {
  const response = await apiClient.get("/recommendations/archive", {
    params: { cursor, limit, search, tags: tags?.join(",") },
  });
  return response.data;
};

export const archiveRecommendation = async (
  recommendationId: string,
  action: "archive" | "unarchive",
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(
    `/recommendations/${recommendationId}/${action}`,
  );
  return response.data;
};
