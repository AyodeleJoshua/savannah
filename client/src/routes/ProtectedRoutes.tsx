import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/browserStorage";
import { useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import { FloatingThemeToggle } from "../components/sharedComponents/FloatingThemeToggle";

export default function ProtectedRoutes() {
  const authToken = isAuthenticated();
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
      <main className="px-[2rem] xl:px-[4rem] overflow-y-auto grow relative">
        <Outlet />
        <FloatingThemeToggle />
      </main>
    </div>
  );
}
