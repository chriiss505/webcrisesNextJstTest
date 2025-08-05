"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";

import PixelBackground from "./components/PixelBackground";
import ScrambleText from "./components/ScrambleText/Scrambletext";
import ScrollOverlay from "./components/ScrollOverlay/ScrollOverlay";
import ScrollFromRight from "./components/ScrollFromRight/ScrollFromRight";
import Terminal from "./components/Terminal/Terminal";
import TeletextoGallery from "./components/Teletext/TeletextoGallery";
import Navbar from "./components/Navbar/Navbar";
import RetroCard from "./components/RetroCard/RetroCard";
import ScrollIndicator from "./components/ScrollIndicator/ScrollIndicator";
import ContactSection from "./components/ContactSection/ContactSection";
import ComingSoon from "./components/ComingSoon/ComingSoon";

export default function Home() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  };
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />
      <PixelBackground dimensions={dimensions}>
        <ScrollIndicator />
        {/* Hero Section */}
        <section id="hero" className={styles.hero}>
          <div className={styles.logoContainer}>
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              fill
              className={styles.floatingLogo}
              style={{ objectFit: "contain" }}
            />
          </div>
        </section>
        <div className={styles.scrollContainer}>
          {/* Sección Nosotras */}

          <ScrollOverlay>
            <section id="nosotras" className={styles.nosotrasContainer}>
              <RetroCard
                name="HUMAN"
                species="CRIS COCO"
                photoSrc="/assets/images/persona2.gif"
                englishTitle="DIGITAL ARTIST"
                japaneseTitle="デジタルアーティスト"
                securityCode="12345-Y-2023"
                sinceYear="1992"
                authText="AUTHORIZED TO CREATE DIGITAL ART AND IMMERSIVE EXPERIENCES."
                footerText="PROPERTY OF CRISES ART STUDIO"
              />
              <RetroCard
                name="HUMAN"
                species="CRIS CREMADES"
                photoSrc="/assets/images/persona1.gif"
                englishTitle="CURATOR"
                japaneseTitle="デジタルアーティスト"
                securityCode="12345-Y-2023"
                sinceYear="1992"
                authText="AUTHORIZED TO CREATE DIGITAL ART AND IMMERSIVE EXPERIENCES."
                footerText="PROPERTY OF CRISES ART STUDIO"
              />
            </section>
          </ScrollOverlay>
          {/* Sección Manifesto */}

          <ScrollOverlay>
            <section id="manifesto" className={styles.manifesto}>
              <Terminal />
            </section>
          </ScrollOverlay>

          {/* Sección Teletexto */}

          <ScrollOverlay>
            <TeletextoGallery />
          </ScrollOverlay>
          <ScrollOverlay>
            <section className={styles.noPaddingTop}>
              <ComingSoon />
            </section>
          </ScrollOverlay>

          <ScrollOverlay>
            <ContactSection />
          </ScrollOverlay>
        </div>
      </PixelBackground>
    </main>
  );
}
