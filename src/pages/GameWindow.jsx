import { useState, useEffect } from "react";
import { getLobbyInfo } from "../hooks/getLobby";
import { useWords } from "../hooks/getWords";
import { usePostData } from "../hooks/postPlayerCheck";
import "./GameW.css";
import { select } from "framer-motion/client";

function GameWindow() {
  const { readyUsers, readyLobby } = getLobbyInfo();
  const { words } = useWords();
  const { postData, error } = usePostData("http://localhost:2000/update-role");

  const [selected, setSelected] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const statusMap = {
    found: "status-grey",
    kicked: "status-red",
  };

  const imageMap = {
    found: "./spy.png",
    kicked: "./civilian.png",
  };

  const voting = async () => {
    if (selectedRole === "spy") {
      const playerSend = [selected, "found"];
      const result = await postData(playerSend);
      //   console.log(result);
    } else if (selectedRole === "civilian") {
      const playerSend = [selected, "kicked"];
      const result = await postData(playerSend);
      //   console.log(result);
    }
    readyLobby();
    console.log("voted!");
  };

  return (
    <div className="game-window">
      <div className="players-list">
        {readyUsers?.map((player, index) => (
          <div
            key={index}
            className={`user ${selected === player.name ? "chosen-one" : ""} ${
              player.status && statusMap[player.status]
            }`}
            onClick={() => {
              setSelected(player.name);
              setSelectedRole(player.role);
              readyLobby();
            }}
          >
            <span>{player.name}</span>
            {player.status ? (
              <img
                className="detection-image detection deleteUser"
                width="40px"
                src={imageMap[player.status]}
                alt="check"
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="menu-buttons">
        <a className="back-menu" href="/dashboard">
          Назад
        </a>
        <button onClick={voting}>Голосування</button>
      </div>
    </div>
  );
}

export default GameWindow;
