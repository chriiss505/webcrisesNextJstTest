"use client";
import React from "react";
import styles from "./ComingSoon.module.scss";

export default function ComingSoon() {
  return (
    <section className={styles.comingSoonSection}>
      <div className={styles.retroHeader}>
        <span>// CANAL+ PROXIMAMENTE</span>
        <span className={styles.signal}>STATUS :: WAITING</span>
      </div>

      <video
        className={styles.videoBg}
        src="/assets/videos/coming-soon.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.textOverlay}>PRÓXIMAMENTE</div>
    </section>
  );
}
