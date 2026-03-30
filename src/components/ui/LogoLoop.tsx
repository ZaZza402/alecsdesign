import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./LogoLoop.css";

type ImageLogoItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
};

type NodeLogoItem = {
  node: React.ReactNode;
  href?: string;
  title?: string;
};

type LogoItem = ImageLogoItem | NodeLogoItem;

interface LogoLoopProps {
  logos: LogoItem[];
  direction?: "left" | "right";
  speed?: number;
  gap?: number;
  logoHeight?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  ariaLabel?: string;
}

function isImageItem(item: LogoItem): item is ImageLogoItem {
  return "src" in item;
}

const LogoLoopComponent: React.FC<LogoLoopProps> = ({
  logos,
  direction = "left",
  speed = 80,
  gap = 48,
  logoHeight = 40,
  fadeOut = true,
  fadeOutColor = "#ffffff",
  scaleOnHover = false,
  hoverSpeed,
  pauseOnHover = false,
  ariaLabel = "Logo loop",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef<boolean>(false);
  const [copyCount, setCopyCount] = useState(3);

  // singleWidth stored as a ref — updating it does NOT restart the RAF loop
  const singleWidthRef = useRef<number>(0);

  // Recompute singleWidth after the DOM updates for the current copyCount
  useEffect(() => {
    if (!trackRef.current) return;
    const children = Array.from(trackRef.current.children) as HTMLElement[];
    if (children.length === 0 || copyCount === 0) return;
    const perSet = Math.round(children.length / copyCount);
    let width = 0;
    for (let i = 0; i < perSet; i++) {
      const child = children[i];
      if (child) width += child.offsetWidth + gap;
    }
    singleWidthRef.current = width;
  }, [copyCount, gap]);

  const updateCopyCount = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const children = Array.from(trackRef.current.children) as HTMLElement[];
    if (children.length === 0) return;
    const singleItemWidth = children[0]?.offsetWidth ?? 0;
    const estimatedSingleWidth = logos.length * (singleItemWidth + gap);
    if (estimatedSingleWidth === 0) return;
    const needed = Math.ceil((containerWidth * 3) / estimatedSingleWidth) + 1;
    setCopyCount(Math.max(needed, 3));
  }, [logos.length, gap]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateCopyCount();
    });
    if (containerRef.current) observer.observe(containerRef.current);
    updateCopyCount();
    return () => observer.disconnect();
  }, [updateCopyCount]);

  // RAF loop — stable deps, never restarts due to copyCount/singleWidth changes
  useEffect(() => {
    let lastTime: number | null = null;
    const dir = direction === "left" ? -1 : 1;

    const step = (timestamp: number) => {
      if (lastTime === null) {
        lastTime = timestamp;
      }
      // Clamp delta to 50ms so a hidden tab resuming doesn't cause a jump
      const delta = Math.min(timestamp - lastTime, 50);
      lastTime = timestamp;

      const currentSpeed =
        isHoveringRef.current && pauseOnHover
          ? 0
          : isHoveringRef.current && hoverSpeed != null
            ? hoverSpeed
            : speed;

      positionRef.current += dir * currentSpeed * (delta / 1000);

      const sw = singleWidthRef.current || 1;
      if (positionRef.current <= -sw) {
        positionRef.current += sw;
      } else if (positionRef.current >= 0 && dir > 0) {
        positionRef.current -= sw;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [direction, speed, hoverSpeed, pauseOnHover]); // singleWidth intentionally excluded

  const allLogos = useMemo(() => {
    const copies = [];
    for (let i = 0; i < copyCount; i++) {
      copies.push(...logos);
    }
    return copies;
  }, [logos, copyCount]);

  const fadeMask = fadeOut
    ? {
        maskImage: `linear-gradient(to right, transparent 0%, ${fadeOutColor} 12%, ${fadeOutColor} 88%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, ${fadeOutColor} 12%, ${fadeOutColor} 88%, transparent 100%)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      className="logoloop"
      aria-label={ariaLabel}
      style={fadeMask}
      onMouseEnter={() => {
        isHoveringRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="logoloop__track"
        style={{ gap: `${gap}px` }}
      >
        {allLogos.map((logo, index) => {
          const content = isImageItem(logo) ? (
            <img
              src={logo.src}
              alt={logo.alt ?? ""}
              className="logoloop__img"
              style={{ height: `${logoHeight}px`, width: "auto" }}
              draggable={false}
              aria-hidden={!logo.alt}
            />
          ) : (
            <span
              className="logoloop__node"
              style={{ height: `${logoHeight}px` }}
            >
              {logo.node}
            </span>
          );

          const key = `logo-${index}`;

          const inner = (
            <div
              key={key}
              className={`logoloop__item${scaleOnHover ? " logoloop__item--scalable" : ""}`}
              title={logo.title}
              style={{ flexShrink: 0 }}
            >
              {content}
            </div>
          );

          if (logo.href) {
            return (
              <a
                key={key}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="logoloop__link"
              >
                {inner}
              </a>
            );
          }

          return inner;
        })}
      </div>
    </div>
  );
};

export const LogoLoop = React.memo(LogoLoopComponent);
export default LogoLoop;
