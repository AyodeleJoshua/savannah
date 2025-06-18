import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { constants } from "../../../utils/constants";
import { useAuth } from "../../../contexts/AuthContext";

interface SidebarItemProps {
  name: string;
  icon: ReactNode;
  link: string;
  isLogout?: boolean;
}

export default function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(props.link);
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (props.isLogout) {
    return (
      <button
        className={`${styles["sidebar-link"]} w-full bg-transparent border-none`}
        onClick={() => {
          logout();
        }}
      >
        {props.icon}
        {props.name}
      </button>
    );
  }

  return (
    <Link
      to={props.link}
      className={`${styles["sidebar-link"]} ${
        isActive ? styles["sidebar-link--active"] : ""
      }`}
    >
      {props.icon}
      {props.name}
    </Link>
  );
}
