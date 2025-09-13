import React, { useState, useEffect, useContext } from "react";
import { getLobbyInfo } from "../hooks/getLobby";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";
import "./Game.css";

export default function Game() {
  const { readyUsers } = getLobbyInfo();
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // 0 = front, 1 = back, 2 = black

  if (!readyUsers || readyUsers.length === 0) {
    return <div className="loading">Loading lobby...</div>;
  }

  const player = readyUsers[index];

  const handleClick = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // if on black card, show the role again
      setStep(1);
    }
    if (step < 2) setStep(step + 1);
  };

  const handleDragEnd = (_event, info) => {
    const swipeThreshold = 70; // distance
    const velocityThreshold = 600; // speed

    if (
      step === 2 &&
      (Math.abs(info.offset.y) > swipeThreshold ||
        Math.abs(info.velocity.y) > velocityThreshold)
    ) {
      setStep(0);
      setIndex((prev) => (prev + 1 >= readyUsers.length ? 0 : prev + 1));
    }
  };

  return (
    <div className="game-container">
      <h1>Дізнайтесь свою роль</h1>

      <div className="card-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={player.id + "-" + step}
            drag={step === 2 ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }} // no permanent move
            dragElastic={0.2} // small stretch
            dragMomentum={false} // avoid drifting sideways
            style={{ x: 0 }} // lock X-axis
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            initial={step === 2 ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={step === 2 ? { y: 0, opacity: 0 } : { y: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`card ${
              step === 0
                ? "card-front"
                : step === 1
                ? "card-back"
                : "card-black"
            }`}
          >
            {step === 0 && <span className="card-text">{player.name}</span>}
            {step === 1 && <span className="card-text">{player.role}</span>}
            {/* step === 2 has no content inside card */}
            {step === 2 && (
              <p className="hint">Swipe up or down to see the next card</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="progress">
        {index + 1} / {readyUsers.length}
      </p>
    </div>
  );
}
