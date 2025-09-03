import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // ✅ updated path
import Navigation from "./components/Navigation.jsx";
import Registration from "./components/Register.jsx";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Navigation />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
