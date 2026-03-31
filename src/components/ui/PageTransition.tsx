import { motion } from "framer-motion";
import { type ReactNode, useLayoutEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  // Scroll to top when the NEW page mounts.
  // With AnimatePresence mode="wait", the old page has fully exited before
  // this fires — so the scroll jump is invisible to the user.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
