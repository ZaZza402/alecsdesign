import { motion } from "framer-motion";
import type { HeroPose } from "./HeroMascot";
import "./StoryMascot.css";

type StoryMascotProps = {
  pose: HeroPose;
  align?: "left" | "right" | "center";
  size?: "sm" | "md";
  delay?: number;
};

const POSE_SRC: Record<HeroPose, string> = {
  "neutral-stance": "/mascot-pose/neutral-stance.webp",
  "invite-point-forward": "/mascot-pose/invite-point-forward.webp",
  "crafting-gesture": "/mascot-pose/crafting-gesture.webp",
  "problem-solving-think-pose": "/mascot-pose/problem-solving-think-pose.webp",
  "open-arms-trust-pose": "/mascot-pose/open-arms-trust-pose.webp",
  "success-pose": "/mascot-pose/success-pose.webp",
  "speed-performance": "/mascot-pose/speed-performance.webp",
};

const StoryMascot = ({
  pose,
  align = "right",
  size = "md",
  delay = 0,
}: StoryMascotProps) => {
  return (
    <motion.figure
      className={`story-mascot story-mascot--${align} story-mascot--${size}`}
      aria-hidden="true"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={POSE_SRC[pose]} alt="" loading="lazy" decoding="async" />
    </motion.figure>
  );
};

export default StoryMascot;
