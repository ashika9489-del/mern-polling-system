// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleCreatePollClick = () => {
    navigate("/create");
  };

  const handleViewPollsClick = () => {
    navigate("/polls");
  };

  const handleMyPollsClick = () => {
    navigate("/mypolls");
  };

  return (
    <div className="home-container">
      <div className="floating-card">
        <h1 className="title">🎯 Welcome to QuickPoll!</h1>
        <p className="subtitle">
          Create polls, share them instantly, and watch live voting results!  
          It’s fast, fun, and free.
        </p>

        <div className="button-group">
          <button className="btn create" onClick={handleCreatePollClick}>
            ➕ Create Poll
          </button>
          <button className="btn view" onClick={handleViewPollsClick}>
            📊 View All Polls
          </button>
          <button className="btn mypolls" onClick={handleMyPollsClick}>
            👤 My Polls
          </button>
        </div>
      </div>

      <footer className="footer">
        <p>💡 Made with ❤️ for instant decision making</p>
      </footer>
    </div>
  );
}

export default Home;
