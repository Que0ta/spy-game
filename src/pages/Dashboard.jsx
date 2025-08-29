import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const username = location.state?.username || "User";

  return (
    <div>
      <h1>Welcome to Dashboard, {username}!</h1>
      <p>You are now logged in.</p>
    </div>
  );
}

export default Dashboard;
