import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import shield from "../assets/images/shield.png";
import logo from "../assets/images/guardian-logo.png";

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
      {/* Background Particles */}
      <div className="particles" />

      {/* Ambient Background Glow */}
      <div className="background-glow" />

      {/* Floating Gold Particles */}
      <div className="gold-particles" />

      {/* Stage 1 */}
      <AnimatePresence>
        {stage >= 1 && (
          <>
            <motion.div
              className="emerald-dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              className="emerald-glow"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Stage 2 */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            className="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="ring ring1" />
            <div className="ring ring2" />
            <div className="ring ring3" />
            <div className="scanner-line" />
            <div className="scanner-grid" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3 */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            className="shield-outline"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
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
                d="M150 20
                L250 70
                L235 210
                L150 310
                L65 210
                L50 70
                Z"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 4 */}
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
              alt="Shield"
            />

            {/* Shield Glow */}
            <div className="shield-glow"></div>

            {/* Metallic Light Sweep */}
            <div className="light-sweep"></div>

            {/* AI Network */}
            <div className="network">
              <span className="node node1"></span>
              <span className="node node2"></span>
              <span className="node node3"></span>
              <span className="node node4"></span>

              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Stage 5 */}
      {stage >= 5 && (
        <>
          <motion.div
            className="gold-pulse"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 2.5,
              opacity: 0.7,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          <div className="gold-ring"></div>
        </>
      )}

      {/* Stage 6 */}
      <AnimatePresence>
        {stage >= 6 && (
          <>
            <motion.img
              src={logo}
              className="guardian-logo"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              alt="GuardianAI"
            />

            <motion.p
              className="tagline"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
            >
              PREDICT • PROTECT • PREVENT
            </motion.p>
          </>
        )}
      </AnimatePresence>

      {/* Stage 7 */}
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

          <p className="loading-text">Initializing GuardianAI...</p>
        </div>
      )}
      {/* HUD Corners */}
      <div className="corner corner-top-left"></div>
      <div className="corner corner-top-right"></div>
      <div className="corner corner-bottom-left"></div>
      <div className="corner corner-bottom-right"></div>
    </div>
  );
}
