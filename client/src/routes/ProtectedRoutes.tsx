import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getItemFromStorage } from "../utils/browserStorage";
import { useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import { constants } from "../utils/constants";

export default function ProtectedRoutes() {
  const authToken = getItemFromStorage(constants.AUTH_TOKEN);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!authToken) {
      navigate("/login?referal=");
    }
  }, [location.pathname, authToken]);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <main className="px-4 py-8 grow 2xl:grow-0 shrink">
        <Outlet />
      </main>
    </div>
  );
}
