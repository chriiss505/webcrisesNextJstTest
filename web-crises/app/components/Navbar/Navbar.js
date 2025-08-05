"use client";
import { createElement, useState, useEffect } from "react";
import ScrambleText from "../ScrambleText/Scrambletext";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { id: "nosotras", text: "nosotras" },
    { id: "manifesto", text: "manifesto" },
    { id: "teletexto", text: "teletexto" },
    { id: "canal", text: "canal+" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector("nav").offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const renderLinks = (mobile = false) => {
    return navItems.map((item) =>
      createElement(
        "a",
        {
          key: item.id,
          href: `#${item.id}`,
          className: styles.navLink,
          onClick: (e) => {
            e.preventDefault();
            scrollToSection(item.id);
          },
        },
        createElement(ScrambleText, null, item.text)
      )
    );
  };

  return createElement(
    "nav",
    { className: styles.navbar },
    isMobile &&
      createElement(
        "button",
        {
          className: `${styles.hamburger} ${isOpen ? styles.open : ""}`,
          onClick: toggleMenu,
          "aria-label": "Menu",
        },
        createElement("span", { className: styles.line }),
        createElement("span", { className: styles.line }),
        createElement("span", { className: styles.line })
      ),
    createElement(
      "div",
      {
        className: `${styles.menuContainer} ${
          isMobile && !isOpen ? styles.hidden : ""
        }`,
      },
      isMobile ? null : renderLinks()
    ),
    isMobile &&
      createElement(
        "div",
        { className: `${styles.mobileMenu} ${isOpen ? styles.open : ""}` },
        renderLinks(true)
      )
  );
}
