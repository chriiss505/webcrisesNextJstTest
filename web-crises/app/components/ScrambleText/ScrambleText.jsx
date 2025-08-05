"use client";
import { useEffect, useRef } from "react";

const ScrambleText = ({ children, className }) => {
  const textRef = useRef(null);
  const originalText = children;
  const randomChars = "!@#$%^&*()_+-<>?";

  useEffect(() => {
    const element = textRef.current;
    let intervalId;
    let isScrambling = false;

    const scramble = () => {
      if (isScrambling) return;
      isScrambling = true;

      let iterations = 0;

      intervalId = setInterval(() => {
        element.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) return originalText[index];
            return randomChars.charAt(
              Math.floor(Math.random() * randomChars.length)
            );
          })
          .join("");

        if (iterations >= originalText.length) {
          clearInterval(intervalId);
          isScrambling = false;
        }
        iterations += 1 / 3;
      }, 50);
    };

    const reset = () => {
      clearInterval(intervalId);
      element.textContent = originalText;
      isScrambling = false;
    };

    element.addEventListener("mouseenter", scramble);
    element.addEventListener("mouseleave", reset);

    return () => {
      clearInterval(intervalId);
      element.removeEventListener("mouseenter", scramble);
      element.removeEventListener("mouseleave", reset);
    };
  }, [originalText]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default ScrambleText;
