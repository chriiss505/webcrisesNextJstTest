"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Terminal.module.scss";

export default function Terminal() {
  const [isMounted, setIsMounted] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    { text: "Bienvenido al terminal de WEB-CRISES", type: "system" },
    { text: "Escribe cualquier comando (o cualquier cosa)", type: "system" },
    { text: "--------------------------------------", type: "system" },
    { text: "SYSTEM MANIFESTO", type: "title" },
    { text: "", type: "empty" },
    { text: "$ whoami", type: "command" },
    { text: "web-crises-collective", type: "response" },
    { text: "", type: "empty" },
    { text: "$ mission --show", type: "command" },
    {
      text: "[•] Fusionar arte y tecnología\n[•] Democratizar creación digital\n[•] Desafiar narrativas convencionales",
      type: "response",
    },
    { text: "", type: "empty" },
    { text: "$ values --list", type: "command" },
    {
      text: "[✓] Transparencia radical\n[✓] Experimentación constante\n[✓] Colaboración interdisciplinar",
      type: "response",
    },
    { text: "", type: "empty" },
    { text: "// Escribe cualquier comando y presiona Enter", type: "comment" },
  ]);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    playSound();
    const command = input.trim().toLowerCase();
    let responseText;

    if (command === "y") {
      responseText = `
           +      ,WWWWW,  WW   WW  WWWWWW,  WW  ,WWWWW, WWWWWWWW
           +      WW'  WW  WW   WW  WW  'WW  WW  WW'  ''    WW
           +      WW       WWWWWWW+ WWWWWW'  WW  'WWWWW,    WW
 +         +      WW.  WW  WW  +WW  WW+'WW.  WW  ,,  'WW    WW
   ++     +++     'WWWWW'  WW   WW +WW  'WW. WW  'WWWWW'    WW
     ++   +++   ++
 ++   +++ +++ +++   ++   +        +
+   ++  +++++++  ++   ++   ++                      WW  ,WWWWW,
 + +  +++ +++ +++  + +                             WW  WW'
++ +++++++++++++++++ +++++ +++  ++                 WW  'WWWWW,
 + +  +++ +++ +++  + +                             WW  ,   'WW
+   ++  +++++++  ++   ++   ++                      WW  'WWWWW'
 ++   +++ +++ +++   ++   +        +
     ++   +++   ++
   ++     +++      ++        WWWWWW,  ,WWWWW,  WWWWWW,  WW.  WW
 +         +          +      WW   WW  WW   WW  WW  .WW  WWW. WW
           +                 WWWWWW,  WW   WW  WWWWWW'  WW'W,WW
           +                 WW   WW  WW   WW  WW 'WW.  WW 'WWW
           +                 WWWWWW'  'WWWWW'  WW  'WW. WW  'WW


`;
    } else if (command === "n") {
      responseText = "NO SALVATION PROTOCOL INITIATED ▓░░░░";
    } else {
      responseText = "crises are artists";
    }

    const newOutput = [
      ...output,
      { text: `$ ${input}`, type: "command" },
      { text: responseText, type: "response" },
    ];
    setOutput(newOutput);
    setInput("");

    setTimeout(() => {
      terminalBodyRef.current?.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 10);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const playSound = () => {
    if (typeof window === "undefined") return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      console.error("Error al reproducir sonido:", e);
    }
  };

  if (!isMounted) {
    return (
      <div className={styles.terminal}>
        <div className={styles.retroHeader}>
          <span>// CRISES MANIFESTO</span>
          <span className={styles.signal}>
            ◆ ARE YOU A CULT LEADER? ◆ ⧖ DECIDE :: [Y] ∆ [N] ▄▄▄{" "}
          </span>
        </div>
        <div className={styles.terminalBody}>
          <div className={styles.system}>Cargando terminal interactiva...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.terminal}>
      <div className={styles.retroHeader}>
        <span>// CRISES MANIFESTO</span>
        <span className={styles.signal}>
          ✶ ARE YOU A CULT LEADER? [Y/N] ▄▄▄
        </span>
      </div>

      <div
        className={styles.terminalBody}
        ref={terminalBodyRef}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        {output.map((item, i) => (
          <div key={i} className={styles[item.type]}>
            {/* Pasamos la ref terminalBodyRef para scroll automático */}
            <Typewriter text={item.text} terminalBodyRef={terminalBodyRef} />
          </div>
        ))}
      </div>

      <form className={styles.terminalInput} onSubmit={handleSubmit}>
        <span>$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          aria-label="Terminal input"
        />

        <button
          type="submit"
          className={styles.mobileEnterButton}
          aria-label="Enviar comando"
        >
          ↵
        </button>
      </form>
    </div>
  );
}

function Typewriter({ text, terminalBodyRef }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const typing = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;

      // Scroll down smooth cada vez que se añade un carácter
      if (terminalBodyRef?.current) {
        terminalBodyRef.current.scrollTo({
          top: terminalBodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      if (i > text.length) clearInterval(typing);
    }, 5);

    return () => clearInterval(typing);
  }, [text, terminalBodyRef]);

  return <>{displayedText}</>;
}
