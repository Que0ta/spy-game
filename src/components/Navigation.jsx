import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, PlayersContext } from "../App";
import { useVerifyUser } from "../hooks/verifyUser";
import AddUser from "./UserAdd";
import SpyAmountComponent from "./SpyAmount";
import "./Navigate.css";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const handleDelete = (id) => {
    setPlayers((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  useEffect(() => {
    if (user) {
      setPlayers((prev) => ({
        ...prev,
        0: user,
      }));
    }
  }, [user, setPlayers]);

  useVerifyUser("/game-settings");

  return (
    <div className="navigation-panel">
      <h1>Додані гравці:</h1>
      <ul className="users-list">
        {Object.entries(players).map(([key, value]) => (
          <li className="user" key={key}>
            <span>{value}</span>
            {user != value ? <button className="deleteUser" onClick={() => handleDelete(key)}>
                ✕
                </button> : ''}
          </li>
        ))}
      </ul>
      <AddUser />
    <SpyAmountComponent />
      
    </div>
  );
}

export default Navigation;
