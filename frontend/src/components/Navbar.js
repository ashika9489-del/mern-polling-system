// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🗳️ Polling System
      </div>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/polls">Polls</Link>
            <Link to="/create">Create Poll</Link>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {/* 👇 Use same button style for Login & Register */}
            <button className="logout-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="logout-btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
