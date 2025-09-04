import React, { useContext } from "react";
import { SpyAmount, PlayersContext } from "../App";
import "./Spy.css";

export default function SpyAmountComponent() {
  const { spies, setSpies } = useContext(SpyAmount);
  const { players, setPlayers } = useContext(PlayersContext);

  const increase = () => {
    // console.log(spies.amount);
    if (spies.amount < Object.keys(players).length - 1) {
      setSpies({ amount: spies.amount + 1 });
    }
  };

  const decrease = () => {
    // console.log(spies.amount);
    if (spies.amount > 1) {
      setSpies({ amount: spies.amount - 1 });
    }
  };

  return (
    <div className="spy-amount-container">
      <h3>К-сть шпигунів: {spies.amount ?? 0}</h3>
      <button onClick={decrease} className="spy-settings decrease">
        {" "}
        -{" "}
      </button>
      <button onClick={increase} className="spy-settings increase">
        {" "}
        +{" "}
      </button>
    </div>
  );
}
