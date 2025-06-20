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
    <div className="lg:flex lg:h-screen lg:overflow-y-clip 3xl:max-w-[1440px] 3xl:mx-auto">
      <Sidebar />
      <main className="px-[2rem] xl:px-[4rem] overflow-y-auto grow">
        <Outlet />
      </main>
    </div>
  );
}
