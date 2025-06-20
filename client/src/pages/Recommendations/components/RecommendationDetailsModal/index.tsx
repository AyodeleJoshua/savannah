import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { RiBox3Line } from "react-icons/ri";
import { FaAws } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import styles from "./styles.module.scss";
import type { Recommendation } from "../../types";
import { LuBoxes } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";
import ValueScore from "../ValueScore";
import { FiArchive } from "react-icons/fi";
import useArchiveRecommendation from "../../hooks/useArchiveRecommendation";

interface IRecommendationDetailsModalProps {
  recommendation: Recommendation;
  isOpen: boolean;
  onClose: () => void;
  isArchived?: boolean;
}

export default function RecommendationDetailsModal({
  recommendation,
  isOpen,
  onClose,
  isArchived = false,
}: IRecommendationDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const {
    mutate: archiveRecommendation,
    isPending: isArchivingRecommendation,
  } = useArchiveRecommendation(isArchived);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const getProviderIcon = (providerId: number) => {
    switch (providerId) {
      case 1:
        return <FaAws />;
      case 2:
        return <SiGooglecloud />;
      case 3:
        return <VscAzure />;
      default:
        return <RiBox3Line />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]} data-testid="modal-overlay">
      <div
        className={styles["modal"]}
        ref={modalRef}
        data-testid="recommendation-modal"
        role="dialog"
      >
        <div className={styles["modal__header"]}>
          <div className={styles["modal__header-content"]}>
            <div className={styles["modal__header-icon"]}>
              <LuBoxes />
            </div>
            <div className={styles["modal__header-text"]}>
              <h2 className={styles["modal__title"]} data-testid="modal-title">
                {recommendation.title}
              </h2>
              <div className={styles["modal__score-providers"]}>
                <ValueScore score={recommendation.score} />
                <div className={styles["modal__providers"]}>
                  {recommendation.provider.map((providerId) => (
                    <span
                      key={providerId}
                      className={styles["modal__provider-icon"]}
                    >
                      {getProviderIcon(providerId)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            className={styles["modal__close-button"]}
            onClick={onClose}
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <IoClose />
          </button>
        </div>

        <div className={styles["modal__content"]}>
          <div className={styles["modal__section"]}>
            <h3 className={styles["modal__section-title"]}>Description</h3>
            <p className={styles["modal__description"]}>
              {recommendation.description}
            </p>
          </div>

          <div className={styles["modal__section"]}>
            <div className={styles["modal__row"]}>
              <span className={styles["modal__icon"]}>
                <RiBox3Line />
              </span>
              <span className={styles["modal__section-title"]}>
                Resources enforced by policy
              </span>
            </div>
            <div className={styles["modal__tags"]}>
              <span className={styles["modal__tag"]}>
                Linux virtual machines
              </span>
            </div>
          </div>
          <div className={styles["modal__section"]}>
            <div className={styles["modal__row"]}>
              <span className={styles["modal__icon"]}>
                <RiBox3Line />
              </span>
              <span className={styles["modal__section-title"]}>Reasons</span>
            </div>
            <div className={styles["modal__tags"]}>
              <span className={styles["modal__tag"]}>
                Based on Repeating Alerts
              </span>
            </div>
          </div>

          <div className={styles["modal__section"]}>
            <div className={styles["modal__row"]}>
              <span className={styles["modal__icon"]}>
                <LuBoxes />
              </span>
              <span className={styles["modal__section-title"]}>
                Impact Assessment
              </span>
            </div>
            <div className={styles["modal__impact-cards"]}>
              <div className={styles["modal__impact-card"]}>
                <div className={styles["modal__impact-card-label"]}>
                  Overall
                </div>
                <div className={styles["modal__impact-card-value"]}>
                  Violations
                  <span className={styles["modal__impact-card-number"]}>
                    {recommendation.impactAssessment.totalViolations}
                  </span>
                </div>
              </div>
              <div className={styles["modal__impact-card"]}>
                <div className={styles["modal__impact-card-label"]}>
                  Most impacted scope
                </div>
                <div className={styles["modal__impact-card-value"]}>
                  {recommendation.impactAssessment.mostImpactedScope.name}
                  <span className={styles["modal__impact-card-number"]}>
                    {recommendation.impactAssessment.mostImpactedScope.count}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["modal__section"]}>
            <div className={styles["modal__section-title"]}>
              Further Reading
            </div>
            <ul>
              {recommendation.furtherReading.map((reading) => (
                <li key={reading.href}>
                  <a
                    href={reading.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg"
                  >
                    {reading.name} <FaExternalLinkAlt />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles["modal__footer"]}>
          <button
            className={`${styles["modal__button"]} ${styles["modal__button--ghost"]} text-2xl`}
            onClick={() =>
              archiveRecommendation(recommendation.recommendationId)
            }
            disabled={isArchivingRecommendation}
          >
            <FiArchive size={24} />
            {isArchived ? "Unarchive" : "Archive"}
            {isArchivingRecommendation && isArchived && "Unarchiving..."}
            {isArchivingRecommendation && !isArchived && "Archiving..."}
          </button>
          <button
            className={`${styles["modal__button"]} ${styles["modal__button--primary"]} text-2xl`}
          >
            Configure Policy
          </button>
        </div>
      </div>
    </div>
  );
}
