import React, { useState } from "react";
import "./poll.css";

const PollCreate = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          options: options.filter((opt) => opt.trim() !== ""),
        }),
      });

      if (res.ok) {
        setMessage("✅ Poll created successfully!");
        setQuestion("");
        setOptions(["", ""]);
      } else {
        setMessage("❌ Failed to create poll!");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error creating poll!");
    }
  };

  return (
    <div className="poll-create">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}

        <button type="button" onClick={addOption}>
          ➕ Add Option
        </button>

        <button type="submit" className="create-btn">
          Create Poll
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PollCreate;
