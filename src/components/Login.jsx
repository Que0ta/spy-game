import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    fetch("http://localhost:2000/dashboard", {
      method: "GET",
      credentials: "include", // send cookie
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          navigate("/dashboard"); // user is logged in, redirect
        }
      })
      .catch(err => {
        console.log("Not logged in", err);
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      setStatus(data.status);

      if (data.status === "logged") {
        navigate("/dashboard"); // redirect after login
      }
    } catch (err) {
      setStatus("network error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login into account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="status-message">
        {status === "not" && (
          <span className="not-found">Логіну не знайдено!</span>
        )}
        {status === "network error" && (
          <span className="not-found">Помилка мережі!</span>
        )}
        {status === "pass" && (
          <span className="not-found">Неправильний пароль!</span>
        )}
      </div>
    </div>
  );
}

export default Login;
