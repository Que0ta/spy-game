import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      setStatus(data.status); // "logged" or "not logged"
      console.log(data);
      if (data.status === "logged") {
        // redirect after successful login
        navigate("/dashboard", { state: { username: data.login } });
      } else{
        setStatus(data.status);
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
