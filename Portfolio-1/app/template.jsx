'use client';
import { motion } from "framer-motion";

import useScrollProgress from "@/hooks/useScrollProgress";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

const Template = ({ children }) => {
  const completion = useScrollProgress();
  return (
    <>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: 'linear', delay: 0.2, duration: 0.4 }}
      >
        {children}
      </motion.main>
      {/* completion bar*/}
      <span
        style={{ transform: `scaleX(${completion / 100})`, transformOrigin: 'left' }}
        className="fixed z-50 bg-primary h-[3px] top-0 left-0 right-0 transition-transform duration-200 ease-out"
      ></span>
{/*       <div className="h-[4000px]"></div>
 */}    </>
  );
};

export default Template;
