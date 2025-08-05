"use client";
import Image from "next/image";
import styles from "./RetroCard.module.scss";

export default function RetroCard({
  headerText = "東京 CRISES ART COLLECTIVE",
  signalText = "↳ CREATIVE INDEX: MAXED ◉◉◉◉◉◉▓▓▒░",
  officerLabel = "SPECIES ",
  name = "CRISTINA SÁNCHEZ",
  photoSrc = "/default-photo.jpg",
  species = "HUMAN",
  securityCode = "86753-X-2025",
  japaneseTitle = "クリエイティブ・デザイナー",
  englishTitle = "CREATIVE DESIGNER",
  authText = "AUTHORIZED TO DESIGN, CREATE, AND BUILD EXPERIENCES THAT CONNECT HUMANS AND INTERFACES.",
  sinceYear = "1992",
  footerText = "PROPERTY OF CRISTINA SÁNCHEZ DESIGN STUDIO",
}) {
  return (
    <div className={styles.retroCard}>
      <div className={styles.retroHeader}>
        <span>{headerText}</span>
        <span className={styles.signal}>{signalText}</span>
      </div>
      <div className={styles.retroId}>
        <span className={styles.label}>{officerLabel}</span>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.retroBody}>
        <Image
          src={photoSrc}
          alt={name}
          width={100}
          height={120}
          className={styles.photo}
        />
        <div className={styles.info}>
          <p>
            <strong>{species}</strong>
          </p>
          <p>SEC CODE {securityCode}</p>
          <p>{japaneseTitle}</p>
          <p>{englishTitle}</p>
        </div>
      </div>
      <div className={styles.retroAuth}>
        {authText} <br />
        AVOIDING BUGS SINCE {sinceYear}.
      </div>
      <div className={styles.retroFooter}>{footerText}</div>
    </div>
  );
}
