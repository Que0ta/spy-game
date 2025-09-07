import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, PlayersContext } from "../App";
import { useVerifyUser } from "../hooks/verifyUser";
import AddUser from "./UserAdd";
import SpyAmountComponent from "./SpyAmount";
import {WordList} from "./Words";
import { CustomWordAdd } from "./CustomWordAdd";
import "./Navigate.css";

import { loadCustomWords } from "../hooks/customWords";
import { useWords } from "../hooks/getWords";


function Navigation() {
  const navigate = useNavigate();
  const { customWords, customWordsFunc } = loadCustomWords();
  useEffect(() => {
      fetch("http://localhost:2000/dashboard", {
        method: "GET",
        credentials: "include", // sends cookie
      })
        .then((res) => {
          if (!res.ok) {
            navigate("/"); // unauthorized
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data?.user) setUser(data.user);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }, [navigate]);

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
            {user != value ? (
              <button className="deleteUser" onClick={() => handleDelete(key)}>
                ✕
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
      <AddUser />
      <SpyAmountComponent />
      <WordList customWordsLoad={customWords}/>
      <CustomWordAdd reloadCustomWords={customWordsFunc}/> 
      <div className="menu-buttons">
        <a className="back-menu" href="/dashboard">Назад</a>
        <button>Нова гра</button>
      </div>
    </div>
  );
}

export default Navigation;
