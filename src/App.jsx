import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // ✅ updated path
import Navigation from "./components/Navigation.jsx";
import Registration from "./components/Register.jsx";
import { createContext, useState } from "react";

export const UserContext = createContext();

// variables for game parameters
export const PlayersContext = createContext();
export const SpyAmount = createContext();


function App() {
  const [user, setUser] = useState(null);
  const [spies, setSpies] = useState({});
  const [players, setPlayers] = useState({});

  return (
    <SpyAmount.Provider value={{ spies, setSpies }}>
      <PlayersContext.Provider value={{ players, setPlayers }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game-settings" element={<Navigation />} />
          </Routes>
        </UserContext.Provider>
      </PlayersContext.Provider>
    </SpyAmount.Provider>
  );
}

export default App;
