import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { lazy, Suspense, useEffect } from "react";
import RecommendationsRoutes from "./routes/privateRoutes/RecommendationsRoutes";
import { getItemFromStorage } from "./utils/browserStorage";
import { constants } from "./utils/constants";
import ToastDefault from "./utils/ToastDefault";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const authToken = getItemFromStorage(constants.AUTH_TOKEN);
    if (authToken) {
      login();
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="recommendations/*"
              element={<RecommendationsRoutes />}
            />
          </Route>
          <Route
            path="/*"
            element={<Navigate to="/recommendations" replace={true} />}
          />
        </Routes>
      </Suspense>
      <ToastDefault />
    </>
  );
}

export default App;
