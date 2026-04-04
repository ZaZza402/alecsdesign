import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import "./StatsSection.css";

type StatKey = "performance" | "seo" | "accessibility";

const STATS: { key: StatKey; value: number; size: "sm" | "lg" }[] = [
  { key: "performance", value: 99, size: "sm" },
  { key: "seo", value: 100, size: "lg" },
  { key: "accessibility", value: 98, size: "sm" },
];

function AnimatedRing({
  value,
  size,
  triggered,
}: {
  value: number;
  size: "sm" | "lg";
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  const R = size === "lg" ? 52 : 38;
  const SW = size === "lg" ? 6 : 5;
  const S = (R + SW) * 2 + 4;
  const cx = S / 2;
  const cy = S / 2;
  const circ = 2 * Math.PI * R;
  const offset = circ - (count / 100) * circ;

  useEffect(() => {
    if (!triggered) return;
    let animId: number;
    let start: number | null = null;
    const duration = 3200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Smooth easeInOutQuint — single continuous curve, no seams
      // Slow start → fast middle → very slow finish
      const eased =
        progress < 0.5
          ? 16 * Math.pow(progress, 5)
          : 1 - Math.pow(-2 * progress + 2, 5) / 2;
      setCount(Math.round(eased * value));
      if (progress < 1) animId = requestAnimationFrame(step);
      else setCount(value);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [triggered, value]);

  return (
    <div className={`stats-ring stats-ring--${size}`}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} aria-hidden="true">
        {/* track circle */}
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="#fff4f0"
          stroke="#fcd7ca"
          strokeWidth={SW}
        />
        {/* progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="transparent"
          stroke="#f35422"
          strokeWidth={SW}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
      </svg>
      {/* number overlay — avoids SVG text font-family issues */}
      <div className={`stats-ring__number stats-ring__number--${size}`}>
        {count}%
      </div>
    </div>
  );
}

const StatsSection: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section
      className="stats-section"
      ref={ref}
      aria-labelledby="stats-heading"
    >
      <div className="stats-container">
        <h2 id="stats-heading" className="stats-title">
          {t("stats.title")}
        </h2>
        <p className="stats-subtitle">{t("stats.subtitle")}</p>

        <div className="stats-grid">
          {STATS.map(({ key, value, size }) => (
            <div key={key} className={`stats-item stats-item--${key}`}>
              <AnimatedRing value={value} size={size} triggered={inView} />
              <span className="stats-label">{t(`stats.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
