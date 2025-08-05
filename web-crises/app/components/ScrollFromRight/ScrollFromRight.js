"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollFromRight({
  children,
  speed = 100,
  delay = 0,
  stiffness = 100,
  damping = 10,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [speed, 0], {
    stiffness,
    damping,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: speed, opacity: 0 }}
      style={{
        x,
        opacity,
        transition: {
          delay,
          type: "spring",
          stiffness,
          damping,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
