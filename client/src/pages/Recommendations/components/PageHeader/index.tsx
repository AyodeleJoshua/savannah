import { PiArchiveBold, PiStarFourFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function PageHeader() {
  return (
    <div className={styles["header"]} data-testid="page-header">
      <h2 className="flex items-center gap-2">
        <span className={styles["header__title"]}>
          Recommendations
        </span>
        <span className="text-[var(--color-text-active)]">
          <PiStarFourFill size={20} />
        </span>
      </h2>
      <Link
        to="/recommendations/archived"
        className={styles["header__link"]}
        data-testid="archive-link"
      >
        <PiArchiveBold size={20} /> Archive
      </Link>
    </div>
  );
}
