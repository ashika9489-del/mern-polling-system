// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePoll from "./components/CreatePoll";
import PollList from "./components/PollList";
import PollDetail from "./components/PollDetail";
import Home from "./components/Home"; // ✅ Home page
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check if user is logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* ✅ Navbar visible on all pages */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <div className="main-content">
        <Routes>
          {/* ✅ Home Page */}
          <Route path="/" element={<Home />} />

          {/* ✅ Polls List Page */}
          <Route path="/polls" element={<PollList />} />

          {/* ✅ Login Page */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* ✅ Register Page */}
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected Create Poll Page */}
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreatePoll /> : <Navigate to="/login" replace />
            }
          />

          {/* ✅ Protected Poll Detail Page */}
          <Route
            path="/poll/:id"
            element={
              isAuthenticated ? <PollDetail /> : <Navigate to="/login" replace />
            }
          />

          {/* ✅ Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
