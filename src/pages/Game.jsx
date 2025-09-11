import React, { useState, useEffect, useContext } from "react";
import { getLobbyInfo } from "../hooks/getLobby";
import { motion } from "framer-motion";
import "./Game.css";
import { div } from "framer-motion/client";

export default function Game() {
  const { readyUsers } = getLobbyInfo();

  if (!readyUsers || readyUsers.length === 0) {
    return <div className="loading">Loading lobby...</div>;
  }

  return (
    <div className="">
      <h1>Дізнайтесь свою роль:</h1>
      <div className="game-block">
        {readyUsers.map((p) => (
          <FlipCard key={p.id} name={p.name} role={p.role} id={p.id} />
        ))}
      </div>
    </div>
  );
}

function FlipCard({ name, role, id }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="card-inner">
        <div className="card-front">{name}</div>
        <div className="card-back">{role}</div>
      </div>
    </div>
  );
}