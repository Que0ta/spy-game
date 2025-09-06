import { useState, useContext } from "react";
import "./CustomWord.css";

export function CustomWordAdd({ reloadCustomWords } ) {
  const statusMessage = document.querySelector(".status-header");
  const [word, setWord] = useState("");
  const [addStatus, setaddStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) return; // Don't send empty strings

    try {
      const response = await fetch("http://localhost:2000/add-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // sends cookie
        body: JSON.stringify({ word }),
      });

      const result = await response.json();
      console.log("Server response:", result);
      setaddStatus(result.status);
      setWord("");
      if (result.status === "success" && reloadCustomWords) {
        reloadCustomWords(); // refresh the customWords list in Words.jsx
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (!addStatus && statusMessage) statusMessage.style.display = "none";
  else if (addStatus && statusMessage) {
    statusMessage.style.display = "block";
    setTimeout(()=>{
      statusMessage.style.display = 'none';
      statusMessage.classList.remove('success');
    }, 1000)
  }

  return (
    <div className="addCustomWord">
      <h4
        className={`status-header ${
          addStatus === "success"
            ? "success"
            : addStatus === "false"
            ? "error"
            : "hidden"
        }`}
      >
        {addStatus === "success"
          ? "Успішно додано!"
          : addStatus === "false"
          ? "Таке слово вже є!"
          : ""}
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button className="add-word" type="submit">
          Додати
        </button>
      </form>
    </div>
  );
}
