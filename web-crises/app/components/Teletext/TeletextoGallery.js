"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./TeletextoGallery.module.scss";

const galleryImages = Array.from(
  { length: 17 },
  (_, i) => `/assets/images/teletext/${i + 1}.png`
);

const TeletextoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <section id="teletexto" className={styles.teletextoSection}>
      <div className={styles.retroHeader}>
        <span>// PROYECTO:-TELETEXTO™ — de nuevo en nuestras vidas</span>
        <span className={styles.signal}>
          STATUS :: FINNISHED&&EXHIBITED ▓▓▓░░
        </span>
      </div>
      <div className={styles.teletextoGrid}>
        {/* Columna izquierda: Título y descripción */}
        <div className={styles.teletextoInfo}>
          <h2 className={styles.title}>TELETEXTO </h2>
          <div className={styles.divider}></div>

          <p className={styles.subtitle}>// DISTOPIA · IMAGEN DIGITAL · IA</p>
          <p className={styles.description}>
            <div className={styles.divider}></div>
            Encrypted transmission from Nexus archive. Visual decoding in
            progress...Encrypted transmission from Nexus archive. Visual
            decoding in progress...Encrypted transmission from Nexus archive.
            Visual decoding in progress...Encrypted transmission from Nexus
            archive. Visual decoding in progress...
          </p>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            // AÑO : 2024 // CentreCivic Guinardó // StripArt 2023 Winner
            Project
          </p>
        </div>

        {/* Columna derecha: Imagen principal */}
        <div className={styles.imagePlaceholder}>
          <Image
            src={selectedImage}
            alt="Imagen seleccionada"
            fill
            className={styles.mainImage}
            style={{ objectFit: "contain" }}
            priority
          />
          <p className={styles.imageNote}>
            Click en las imágenes para verlas mejor
          </p>
        </div>
      </div>
      {/* Primer carrusel (derecha a izquierda) */}
      <div className={styles.galleryCarousel}>
        <div className={styles.carouselTrack}>
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`first-${index}`}
              className={styles.carouselItem}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={120}
                className={styles.thumbnail}
                priority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Segundo carrusel (izquierda a derecha) */}
      <div className={styles.galleryCarousel}>
        <div className={`${styles.carouselTrack} ${styles.reverseScroll}`}>
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`second-${index}`}
              className={styles.carouselItem}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={120}
                height={120}
                className={styles.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeletextoGallery;
