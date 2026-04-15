import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./poll.css";
import "./CreatePoll.css";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🟢 Update option text
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // 🟢 Add new option
  const addOption = () => {
    if (options.length >= 6) {
      setMessage("⚠️ Maximum 6 options allowed!");
      return;
    }
    setOptions([...options, ""]);
  };

  // 🟢 Remove option
  const removeOption = (index) => {
    if (options.length <= 2) {
      setMessage("⚠️ Minimum 2 options required!");
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please log in to create a poll.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
          options: options.filter((opt) => opt.trim() !== ""),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Poll created successfully!");
        setTimeout(() => navigate("/polls"), 1200);
      } else {
        setMessage(data.message || "❌ Server error while creating poll.");
      }
    } catch (error) {
      console.error("❌ Poll creation error:", error);
      setMessage("❌ Server error while creating poll.");
    }
  };

  return (
    <div className="poll-create-container">
      <h2>🗳️ Create a New Poll</h2>

      <form onSubmit={handleSubmit} className="poll-form">
        <input
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {options.map((opt, index) => (
          <div key={index} className="option-row">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            <button
              type="button"
              className="remove-option-btn"
              onClick={() => removeOption(index)}
            >
              ❌
            </button>
          </div>
        ))}

        <div className="button-row">
          <button type="button" onClick={addOption} className="add-option-btn">
            ➕ Add Option
          </button>
          <button type="submit" className="create-poll-btn">
            ✅ Create Poll
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreatePoll;
