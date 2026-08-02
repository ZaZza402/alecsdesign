import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HeroPose =
  | "neutral-stance"
  | "invite-point-forward"
  | "crafting-gesture"
  | "problem-solving-think-pose"
  | "open-arms-trust-pose"
  | "success-pose"
  | "speed-performance";

type PoseMeta = {
  src: string;
  mode: "torso" | "full";
};

const POSES: Record<HeroPose, PoseMeta> = {
  "neutral-stance": {
    src: "/mascot-pose/neutral-stance.webp",
    mode: "torso",
  },
  "invite-point-forward": {
    src: "/mascot-pose/invite-point-forward.webp",
    mode: "torso",
  },
  "crafting-gesture": {
    src: "/mascot-pose/crafting-gesture.webp",
    mode: "torso",
  },
  "problem-solving-think-pose": {
    src: "/mascot-pose/problem-solving-think-pose.webp",
    mode: "torso",
  },
  "open-arms-trust-pose": {
    src: "/mascot-pose/open-arms-trust-pose.webp",
    mode: "torso",
  },
  "success-pose": {
    src: "/mascot-pose/success-pose.webp",
    mode: "torso",
  },
  "speed-performance": {
    src: "/mascot-pose/speed-performance.webp",
    mode: "full",
  },
};

type HeroMascotProps = {
  pose: HeroPose;
  reduceMotion: boolean;
  preloadPoses?: HeroPose[];
  prominence?: "high" | "medium" | "low";
};

const DEFAULT_RATIO_BY_MODE: Record<PoseMeta["mode"], number> = {
  torso: 0.74,
  full: 0.62,
};

const ratioCache = new Map<HeroPose, number>();

const clampRatio = (ratio: number, mode: PoseMeta["mode"]) => {
  if (mode === "full") return Math.min(0.7, Math.max(0.52, ratio));
  return Math.min(0.88, Math.max(0.62, ratio));
};

const loadPoseRatio = (pose: HeroPose): Promise<number> => {
  const cached = ratioCache.get(pose);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const ratio =
        image.naturalWidth > 0 && image.naturalHeight > 0
          ? image.naturalWidth / image.naturalHeight
          : DEFAULT_RATIO_BY_MODE[POSES[pose].mode];
      ratioCache.set(pose, ratio);
      resolve(ratio);
    };
    image.onerror = () => {
      resolve(DEFAULT_RATIO_BY_MODE[POSES[pose].mode]);
    };
    image.src = POSES[pose].src;
  });
};

export default function HeroMascot({
  pose,
  reduceMotion,
  preloadPoses = [],
  prominence = "medium",
}: HeroMascotProps) {
  const [displayPose, setDisplayPose] = useState<HeroPose>(pose);
  const [poseRatio, setPoseRatio] = useState<number>(
    DEFAULT_RATIO_BY_MODE[POSES[pose].mode],
  );

  useEffect(() => {
    setDisplayPose(pose);
  }, [pose]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const uniquePoses = Array.from(new Set([displayPose, ...preloadPoses]));
    uniquePoses.forEach((nextPose) => {
      void loadPoseRatio(nextPose);
    });
  }, [displayPose, preloadPoses]);

  useEffect(() => {
    let active = true;
    const mode = POSES[displayPose].mode;

    void loadPoseRatio(displayPose).then((rawRatio) => {
      if (!active) return;
      setPoseRatio(clampRatio(rawRatio, mode));
    });

    return () => {
      active = false;
    };
  }, [displayPose]);

  const poseMeta = POSES[displayPose];
  const poseClass = `hero-mascot--pose-${displayPose}`;
  const style = {
    "--pose-ar": poseRatio,
    "--pose-scale": poseRatio < 0.6 ? 0.95 : poseRatio > 0.8 ? 0.92 : 1,
    "--pose-y": poseMeta.mode === "full" ? "2px" : "0px",
  } as CSSProperties;

  return (
    <figure
      className={`hero-mascot hero-mascot--${poseMeta.mode} hero-mascot--${prominence} ${poseClass}`}
      style={style}
      aria-hidden="true"
    >
      <div className="hero-mascot__frame">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={displayPose}
            src={poseMeta.src}
            alt=""
            className="hero-mascot__image"
            loading={displayPose === "neutral-stance" ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={displayPose === "neutral-stance" ? "high" : "auto"}
            initial={{
              opacity: 0,
              y: poseMeta.mode === "full" ? 10 : 8,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: poseMeta.mode === "full" ? -8 : -6,
              scale: 0.99,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }
            }
          />
        </AnimatePresence>
      </div>
    </figure>
  );
}
