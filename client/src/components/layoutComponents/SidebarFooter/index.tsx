import styles from "./styles.module.scss";

export default function SidebarFooter() {
  return (
    <div className={`${styles["sidebar-footer__container"]}`}>
      <div className={`${styles["sidebar-footer__icon"]}`}>YL</div>
      <div>
        <p className="font-semibold leading-none">Yair Lad</p>
        <p className="text-xs">Yair@aryon.security</p>
      </div>
    </div>
  );
}
