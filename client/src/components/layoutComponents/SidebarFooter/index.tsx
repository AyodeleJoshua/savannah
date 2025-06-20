import styles from "./styles.module.scss";

export default function SidebarFooter() {
  return (
    <div className={`${styles["sidebar-footer__container"]}`}>
      <div className={`${styles["sidebar-footer__icon"]}`}>YL</div>
      <div>
        <p className="font-semibold leading-none text-xl xl:text-2xl">Yair Lad</p>
        <p className="text-lg xl:text-xl">Yair@aryon.security</p>
      </div>
    </div>
  );
}
