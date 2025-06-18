import logo from "../assets/aryon-logo.png";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuClipboardCopy,
  LuLogOut
} from "react-icons/lu";
import { PiStarFourBold } from "react-icons/pi";
import { MdReportGmailerrorred } from "react-icons/md";
import SidebarItem from "../components/layoutComponents/SidebarItem";
import SidebarFooter from "../components/layoutComponents/SidebarFooter";

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
    icon:<LuLogOut />,
    link: "/logout",
  },
];

export default function Sidebar() {
  return (
    <aside className="p-2 h-full flex flex-col justify-between">
      <div>
        <img src={logo} alt="logo" className="mb-6 px-2 py-1" />
        <p className="text-sm mb-3 px-2 py-1">Platform</p>
        <nav>
          <ul className="space-y-2">
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
    </aside>
  );
}
