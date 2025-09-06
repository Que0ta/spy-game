// components/WordList.tsx
import { useState, useEffect } from "react";
import { useWords } from "../hooks/getWords";
import { loadCustomWords } from "../hooks/customWords";
import "./Words.css";

export function WordList() {
  const { words, checked, setChecked, loading, error } = useWords();
  const { customWords, loadingCustom, errorCustom, customWordsFunc } = loadCustomWords();
  
  // Fetch custom words after component mounts
  useEffect(() => {
    customWordsFunc(); // call hook’s fetch function when added new word
  }, [customWordsFunc]);
  
  if (loading) return <p>Loading words...</p>;
  if (loadingCustom) return <p>Loading customWords...</p>;
  
  if (error) return <p>Error: {error}</p>;
  if (errorCustom) return <p>Error with custom words: {error}</p>;
  
  if (!words.length) return <p>No words found.</p>;
  
  const handleToggle = (word) => {
    setChecked((prev) => ({ ...prev, [word]: !prev[word] }));
  };
  
  return (
    <div className="frame-word">
      <h3>
        {" "}
        Список вибраних слів
        <br /> <i>(деактивовані - сірий колір)</i>{" "}
      </h3>
      <ul className="word-list">
        {words.map((word, index) => (
          <li
            key={index}
            className={checked[word] ? "selected" : ""}
            onClick={() => handleToggle(word)}
          >
            <span>{word}</span>
          </li>
        ))}
        {customWords.map((word, index) => (
          <li
            key={index}
            className={`custom ${checked[word] ? "selected" : ""}`}
            onClick={() => handleToggle(word)}
          >
            <span>{word}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
