// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Travel from "./pages/Travel.jsx";
import Errands from "./pages/Errands.jsx";
import Carpool from "./pages/Carpool.jsx";
import Emergency from "./pages/Emergency.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/login.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/errands" element={<Errands />} />
        <Route path="/carpool" element={<Carpool />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
