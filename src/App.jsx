import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './pages/Dashboard.jsx'; // ✅ updated path

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
