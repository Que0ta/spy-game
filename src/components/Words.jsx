// components/WordList.tsx
import { useWords } from "../hooks/getWords";
import "./Words.css";

export function WordList() {
  const { words, checked, setChecked, loading, error } = useWords();

  if (loading) return <p>Loading words...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!words.length) return <p>No words found.</p>;

  const handleToggle = (word) => {
    setChecked((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  return (
    <div className="frame-word">
    <h3> Список вибраних слів<br/> <i>(вибрані - зелений колір)</i> </h3>
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
      </ul>
    </div>
  );
}
