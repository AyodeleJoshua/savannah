import logo from "../assets/aryon-logo.png";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuClipboardCopy,
  LuLogOut,
} from "react-icons/lu";
import { PiStarFourBold } from "react-icons/pi";
import { MdReportGmailerrorred } from "react-icons/md";
import SidebarItem from "../components/layoutComponents/SidebarItem";
import SidebarFooter from "../components/layoutComponents/SidebarFooter";
import styles from "./sidebar.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: <LuLayoutDashboard />,
    link: "/dashboard",
  },
  {
    name: "Recommendations",
    icon: <PiStarFourBold />,
    link: "/recommendations",
  },
  {
    name: "Policies",
    icon: <LuClipboardList />,
    link: "/policies",
  },
  {
    name: "Events",
    icon: <LuClipboardCopy />,
    link: "/events",
  },
  {
    name: "Waiver",
    icon: <MdReportGmailerrorred />,
    link: "/waiver",
  },
  {
    name: "Logout",
    icon: <LuLogOut />,
    link: "/logout",
  },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div className={styles["mobile-header"]}>
        <button
          className={styles["mobile-header__hamburger"]}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <aside
        className={`${styles["sidebar__container"]} ${
          isSidebarOpen ? styles["sidebar__container--open"] : ""
        }`}
      >
        <div className={styles["sidebar__content"]}>
          <div>
            <img
              src={logo}
              alt="logo"
              className={styles["sidebar__content-logo"]}
            />
            <p className="text-2xl px-2 py-1 lg:mt-10 lg:mb-4">Platform</p>
            <nav>
              <ul className="space-y-3">
                {sidebarItems.map((item) => (
                  <li key={item.link}>
                    <SidebarItem
                      name={item.name}
                      icon={item.icon}
                      link={item.link}
                      isLogout={item.name === "Logout"}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}
