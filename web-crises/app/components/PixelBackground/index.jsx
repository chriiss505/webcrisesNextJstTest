"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function PixelBackground({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. Obtener dimensiones al montar y en resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 2. Iniciar animación cuando tengamos dimensiones
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setIsLoaded(true);
    }
  }, [dimensions]);

  // 3. Generar bloques de animación
  const generateBlocks = () => {
    const blockWidth = dimensions.width * 0.05;
    const blockHeight = blockWidth; // Bloques cuadrados
    const cols = Math.ceil(dimensions.width / blockWidth);
    const rows = Math.ceil(dimensions.height / blockHeight);

    return { cols, rows, blockWidth, blockHeight };
  };

  // 4. Manejar finalización de animación
  const handleComplete = () => {
    setAnimationComplete(true);
  };

  if (!isLoaded) return null;

  const { cols, rows, blockWidth, blockHeight } = generateBlocks();

  return (
    <>
      {/* Contenido principal (oculto hasta que termine animación) */}
      <div style={{ visibility: "visible" }}>{children}</div>

      {/* Overlay de animación */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <div className={styles.grid}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div key={`col-${colIndex}`} className={styles.column}>
                  {Array.from({ length: rows }).map((_, rowIndex) => (
                    <motion.div
                      key={`block-${colIndex}-${rowIndex}`}
                      className={styles.block}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.random() * 0.4,
                      }}
                      onAnimationComplete={
                        colIndex === cols - 1 && rowIndex === rows - 1
                          ? handleComplete
                          : undefined
                      }
                      style={{
                        width: `${blockWidth}px`,
                        height: `${blockHeight}px`,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
