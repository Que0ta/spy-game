import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { UserContext } from "../App";
import { useVerifyUser } from "../hooks/verifyUser";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        navigate("/");
      });
  }, [navigate]);
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user}!</h2>
      <p>This is your secure dashboard.</p>
      <LogoutButton> </LogoutButton>
      <a href="/game">test</a>
    </div>
  );
}

export default Dashboard;
