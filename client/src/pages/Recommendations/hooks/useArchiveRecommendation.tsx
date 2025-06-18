import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveRecommendation } from "../services/recommendations";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useArchiveRecommendation = (isArchived: boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (recommendationId: string) =>
      archiveRecommendation(
        recommendationId,
        isArchived ? "unarchive" : "archive",
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recommendations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["archivedRecommendations"],
      });
      toast.success(
        isArchived
          ? "Recommendation unarchived successfully"
          : "Recommendation archived successfully",
      );
      navigate(`/recommendations${isArchived ? "" : "/archived"}`);
    },
    onError: (error) => {
      console.error("Failed to archive recommendation:", error);
      toast.error(
        error?.message ?? "Failed to archive recommendation. Please try again.",
      );
    },
  });
};

export default useArchiveRecommendation;
