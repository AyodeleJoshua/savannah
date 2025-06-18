import styles from "./styles.module.scss";

export default function ValueScore({ score }: { score: number }) {
  const getActiveValueBoxes = (score: number): number => {
    if (score <= 25) return 1;
    if (score <= 50) return 2;
    if (score <= 75) return 3;
    return 4;
  };

  const activeBoxes = getActiveValueBoxes(score);
  const totalBoxes = 4;
  return (
    <div className="w-full flex items-center justify-center gap-4 mt-4">
      <p className="whitespace-nowrap">Value score</p>
      <div className={styles["score__value-score"]}>
        {Array.from({ length: totalBoxes }, (_, index) => (
          <span
            key={index}
            className={
              index < activeBoxes
                ? `${styles["score__value-box"]} score__value-box`
                : `${styles["score__value-box--inactive"]} score__value-box--inactive`
            }
            data-testid="score-box"
          />
        ))}
      </div>
    </div>
  );
}
