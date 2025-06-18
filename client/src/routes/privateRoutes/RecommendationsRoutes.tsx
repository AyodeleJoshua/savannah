import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Recommendations = lazy(() => import("../../pages/Recommendations/index"));
const ArchiveRecommendations = lazy(() => import("../../pages/Recommendations/ArchiveRecommendations"));

export default function RecommendationsRoutes() {
  return (
    <Routes>
      <Route index element={<Recommendations />} />
      <Route path="archived" element={<ArchiveRecommendations />} />
      <Route
        path="/*"
        element={<Navigate to="/recommendations" replace={true} />}
      />
    </Routes>
  );
}
