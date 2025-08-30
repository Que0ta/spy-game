import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:2000/logout", {
        method: "POST",
        credentials: "include", // send cookie to delete
      });

      const data = await res.json();
      console.log(data);

      // Clear user state and redirect
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const [user, setUser] = useState(null);
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
    <div>
      <h2>Welcome, {user}!</h2>
      <p>This is your secure dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
