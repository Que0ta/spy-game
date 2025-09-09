import { useState, useEffect, useContext } from "react";
import { getLobbyInfo } from "../hooks/getLobby";
import "./Game.css";

function Game() {
  const { readyUsers, chosenWord, readyLobby } = getLobbyInfo();

  console.log(readyUsers);
  console.log(chosenWord);


  return <div>Test window</div>;
}

export default Game;
