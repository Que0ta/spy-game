import { useState, useEffect, useContext } from "react";
import { data, useNavigate } from "react-router-dom";
import { UserContext, PlayersContext, SpyAmount } from "../App";
import { useVerifyUser } from "../hooks/verifyUser";
import AddUser from "../components/UserAdd";
import SpyAmountComponent from "../components/SpyAmount";
import { WordList } from "../components/Words";
import { CustomWordAdd } from "../components/CustomWordAdd";
import "./Navigate.css";
import "./Game.css";

import { loadCustomWords } from "../hooks/customWords";
import { useWords } from "../hooks/getWords";

function Navigation() {
  const navigate = useNavigate();
  const { words, checked, setChecked, loading, error } = useWords();
  const { customWords, customWordsFunc } = loadCustomWords();

  const { spies, setSpies } = useContext(SpyAmount);
  const { user, setUser } = useContext(UserContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const [spiesAm, setSpiesAm] = useState(1);
  const [formData, setFormData] = useState(null);

  // info to pass before game starts
  const [params, setParams] = useState({
    playersParameter: null,
    spyAmountParameter: null,
    wordsParameter: null,
  });

  const [popupOpen, setPopupOpen] = useState(false);

  const handleConfirm = async () => {
    setPopupOpen(false);
    navigate("/game-single");
  };
  
  const handleCancel = async () => {
    await fetch("http://localhost:2000/game-start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      credentials: "include",
    });
    setPopupOpen(false); // just close popup, no navigation
    navigate("/game-single");
  };

  const handleGameStart = async () => {
    const newParams = {
      players: players,
      spyAmount: spies,
      wordsList: formData || checked,
    };

    setParams(newParams);
    try {
      const data = await fetch("http://localhost:2000/lobby", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await data.json();
      const status = result.status;
      if (status === false) {
        await fetch("http://localhost:2000/game-start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newParams),
          credentials: "include",
        });
      } else if (status === true) {
        console.log("There is an active game!");
        setPopupOpen(true);
        // navigate("/game-single", {
        //   state: { showPopup: true },
        // });
      }
    } catch (err) {
      console.log(err);
    }

    // запуск нової гри + очищення попередніх записів (backend)
  };

  //   useEffect(() => {
  //   if (params) {
  //     console.log("Params updated:", params);
  //     // do something after params changes
  //   }
  // }, [params]);

  // Amount spies - passed
  const handleAmountPass = (data) => {
    setSpiesAm(data);
    setSpies({ amount: data });
    // console.log('amount =>',data);
  };

  // checked words list - passed
  const handleFormSubmit = (data) => {
    setFormData(data);
    setChecked(data);
    // console.log('check =>',data);
  };

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

  // handle of delete of user on parameter page
  const handleDelete = (id) => {
    setPlayers((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // update players list
  useEffect(() => {
    if (user) {
      setPlayers((prev) => ({
        ...prev,
        0: user,
      }));
    }
  }, [user, setPlayers]);

  useVerifyUser("/game-settings");
  console.log("оновлено==", params);

  return (
    <div className="navigation-panel">
      {popupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <p><b>Знайдено незавершену гру.</b><br />Бажаєте продовжити ? {location.state?.action}</p>
            <div className="popup-buttons">
              <button className="accept" onClick={handleCancel}>
                Розпочати заново
              </button>
              <button className="decline" onClick={handleConfirm}>
                Так
              </button>
            </div>
          </div>
        </div>
      )}
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
      <SpyAmountComponent
        amountPass={handleAmountPass}
        countUpdate={handleAmountPass}
      />
      <WordList
        customWordsLoad={customWords}
        onData={handleFormSubmit}
        updateDel={customWordsFunc}
      />
      <CustomWordAdd reloadCustomWords={customWordsFunc} />
      <div className="menu-buttons">
        <a className="back-menu" href="/dashboard">
          Назад
        </a>
        <button onClick={handleGameStart}>Нова гра</button>
      </div>
    </div>
  );
}

export default Navigation;
