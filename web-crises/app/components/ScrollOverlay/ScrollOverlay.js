"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollOverlay({ children, speed = 0.5 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 50}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          y,
          scale,
          width: "100%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
