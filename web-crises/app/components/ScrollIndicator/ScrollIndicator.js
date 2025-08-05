"use client";
import { useEffect, useState } from "react";
import styles from "./ScrollIndicator.module.scss";

const ScrollIndicator = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Calcula la opacidad basada en la posición del scroll
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollPosition / 300); // Ajusta 300 para cambiar la velocidad del fade
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.scrollIndicator} style={{ opacity: opacity }}>
      <div className={styles.mouse}>
        <div className={styles.wheel}></div>
      </div>
      <span className={styles.scrollText}>Scroll</span>
    </div>
  );
};

export default ScrollIndicator;
