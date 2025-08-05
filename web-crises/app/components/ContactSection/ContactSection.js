"use client";

import { useState } from "react";
import styles from "./ContactSection.module.scss";

export default function ContactoSection() {
  const [copied, setCopied] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const email = "contacto@crises.studio";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacto" className={styles.contactoSection}>
      {/* Estilo retroHeader igual que teletexto */}
      <div className={styles.retroHeader}>
        <span>// CONTACTO · CRISES ✶ STUDIO</span>
        <span className={styles.signal}>CHANNEL :: ACTIVE ◉◉◉▓░</span>
      </div>

      <div className={styles.contactoBox}>
        <h2 className={styles.title}>CONTÁCTANOS</h2>
        <div className={styles.divider}></div>

        <div className={styles.emailRow}>
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
          <span className={styles.copy} onClick={handleCopy}>
            {copied ? "✔ COPIADO" : "✂ COPIAR"}
          </span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.links}>
          <span onClick={() => setShowPrivacy(true)}>
            Política de privacidad
          </span>
          <span onClick={() => setShowCookies(true)}>Política de cookies</span>
        </div>
      </div>

      {/* POPUPS estilo teletexto */}
      {showPrivacy && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button onClick={() => setShowPrivacy(false)}>✕</button>
            <h3>// POLÍTICA DE PRIVACIDAD</h3>
            <p>
              Texto provisional. Aquí irá la política de privacidad completa.
            </p>
          </div>
        </div>
      )}
      {showCookies && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button onClick={() => setShowCookies(false)}>✕</button>
            <h3>// POLÍTICA DE COOKIES</h3>
            <p>Texto provisional. Aquí irá la política de cookies completa.</p>
          </div>
        </div>
      )}
    </section>
  );
}
