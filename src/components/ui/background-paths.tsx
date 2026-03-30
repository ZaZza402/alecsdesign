import { useScroll, useTransform, motion } from "framer-motion";

export function BackgroundPaths() {
  const { scrollY } = useScroll();
  // Dots move at ~10% of scroll speed — content scrolls over them
  const y = useTransform(scrollY, [0, 4000], [0, -320]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Parallax dot grid — extended beyond viewport so drift doesn't show edges */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-60px",
          backgroundImage:
            "radial-gradient(circle, #b0bbc8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.9,
          y,
        }}
        animate={{ backgroundPosition: ["0px 0px", "28px 28px"] }}
        transition={{
          backgroundPosition: {
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          },
        }}
      />
      {/* Brand orange bloom — top center, very soft */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70%",
          background:
            "radial-gradient(ellipse 110% 75% at 50% 0%, rgba(243, 84, 34, 0.06) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
