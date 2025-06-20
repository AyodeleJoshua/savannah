import styles from "./styles.module.scss";
import { RiBox3Line } from "react-icons/ri";
import { FaAws } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import type { Recommendation } from "../../types";
import ValueScore from "../ValueScore";

interface CardProps {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
  isArchived?: boolean;
}

export default function Card({
  recommendation,
  onClick,
  isArchived = false,
}: CardProps) {
  return (
    <div
      className={styles.card}
      onClick={() => onClick(recommendation)}
      data-testid="card"
    >
      <div
        className={`${styles["card__icon-section"]} ${
          isArchived ? `${styles["card__icon-section--archived"]} card__icon-section--archived` : ""
        }`}
        data-testid="card-icon-section"
      >
        <span className={styles["card__icon"]}>
          <RiBox3Line />
        </span>
        {isArchived && <span data-testid="archived-indicator" className="archived-indicator">Archived</span>}
      </div>

      <div className={styles["card__content-section"]}>
        <div className="lg:pr-8 flex flex-col justify-between">
          <div className={styles["card__header-row"]}>
            <h2 className={styles["card__title"]} data-testid="recommendation-title">{recommendation?.title}</h2>
            <div className={styles["card__cloud-icons"]}>
              <span>
                <SiGooglecloud />
              </span>
              <span>
                <FaAws />
              </span>
              <span>
                <VscAzure />
              </span>
            </div>
          </div>
          <p className={`${styles["card__description"]} line-clamp-3`}>
            {recommendation?.description}
          </p>
          <div className={styles["card__tags-row"]}>
            {recommendation.frameworks?.map((framework) => (
              <span className={styles["card__tag"]}>{framework.name}</span>
            ))}
          </div>
        </div>
        <div className={styles["card__impact-section"]}>
          <p className={styles["card__impact-title"]}>Impact assessment</p>
          <p className={styles["card__violations"]}>
            {recommendation.impactAssessment?.totalViolations} Violations /
            month
          </p>
          <hr className="w-full border-t border-gray-300" />
          <ValueScore score={recommendation.score} />
        </div>
      </div>
    </div>
  );
}
