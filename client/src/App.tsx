import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { lazy, Suspense, useEffect } from "react";
import RecommendationsRoutes from "./routes/privateRoutes/RecommendationsRoutes";
import { getItemFromStorage } from "./utils/browserStorage";
import { constants } from "./utils/constants";
import { Toaster } from "react-hot-toast";

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
            element={<Navigate to="/dashboard" replace={true} />}
          />
        </Routes>
      </Suspense>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
