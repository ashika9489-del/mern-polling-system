import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // ✅ Import the CSS file

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "❌ Registration failed! Try again later.");
      }
    } catch (error) {
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Your Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
