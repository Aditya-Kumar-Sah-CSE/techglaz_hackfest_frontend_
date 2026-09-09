import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import shield from "../assets/images/suraksha-shield.png";
import logo from "../assets/images/suraksha-ai-logo.png";

import "./SplashScreen.css";

export default function SplashScreen() {
  const navigate = useNavigate();

  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1800),
      setTimeout(() => setStage(4), 2800),
      setTimeout(() => setStage(5), 4000),
      setTimeout(() => setStage(6), 5000),
      setTimeout(() => setStage(7), 6000),

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 7500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* ==============================
          BACKGROUND
      ============================== */}

      <div className="particles" />
      <div className="background-glow" />
      <div className="gold-particles" />

      {/* ==============================
          STAGE 1 — AI ACTIVATION
      ============================== */}

      <AnimatePresence>
        {stage >= 1 && (
          <>
            <motion.div
              className="emerald-dot"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1.4,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
              }}
            />

            <motion.div
              className="emerald-glow"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1.8,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 1,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ==============================
          STAGE 2 — RADAR SCANNER
      ============================== */}

      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            className="scanner"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <div className="ring ring1" />
            <div className="ring ring2" />
            <div className="ring ring3" />

            <div className="scanner-line" />
            <div className="scanner-grid" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================
          STAGE 3 — SHIELD OUTLINE
      ============================== */}

      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            className="shield-outline"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <svg width="250" height="280" viewBox="0 0 300 340">
              <defs>
                <linearGradient id="shieldStroke">
                  <stop offset="0%" stopColor="#00ffb3" />

                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>

              <path
                className="shield-path premium-path"
                stroke="url(#shieldStroke)"
                fill="none"
                d="
                  M150 20
                  L250 70
                  L235 210
                  L150 310
                  L65 210
                  L50 70
                  Z
                "
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================
          STAGE 4 — SURAKSHA SHIELD
      ============================== */}

      <AnimatePresence>
        {stage >= 4 && (
          <>
            <motion.img
              src={shield}
              className="shield-image"
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
              }}
              alt="Suraksha AI Security Shield"
            />

            {/* Shield Glow */}
            <div className="shield-glow" />

            {/* Metallic Light Sweep */}
            <div className="light-sweep" />

            {/* AI Detection Network */}
            <div className="network">
              <span className="node node1" />
              <span className="node node2" />
              <span className="node node3" />
              <span className="node node4" />

              <span className="line line1" />
              <span className="line line2" />
              <span className="line line3" />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ==============================
          STAGE 5 — SECURITY PULSE
      ============================== */}

      {stage >= 5 && (
        <>
          <motion.div
            className="gold-pulse"
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              scale: 2.5,
              opacity: 0.7,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <div className="gold-ring" />
        </>
      )}

      {/* ==============================
    STAGE 6 — SURAKSHA AI LOGO
============================== */}

      <AnimatePresence>
        {stage >= 6 && (
          <div className="suraksha-logo-container">
            <motion.img
              src={logo}
              className="suraksha-logo"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              alt="Suraksha AI"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ==============================
          STAGE 7 — INITIALIZATION
      ============================== */}

      {stage >= 7 && (
        <div className="loading-wrapper">
          <motion.div
            className="loading-ring"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <p className="loading-text">Initializing Suraksha AI...</p>
        </div>
      )}

      {/* ==============================
          HUD CORNERS
      ============================== */}

      <div className="corner corner-top-left" />
      <div className="corner corner-top-right" />
      <div className="corner corner-bottom-left" />
      <div className="corner corner-bottom-right" />
    </div>
  );
}
