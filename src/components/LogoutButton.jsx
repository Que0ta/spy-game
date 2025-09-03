import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function LogoutButton() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:2000/logout", {
        method: "POST",
        credentials: "include", // send cookie to delete
      });

      const data = await res.json();
      // Clear user state and redirect
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
