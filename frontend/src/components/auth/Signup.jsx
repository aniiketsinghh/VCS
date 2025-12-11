import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router";

import logo from "../../assets/github-mark-white.svg";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/api/user/signup", {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.user);

      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
      setLoading(false);
    }
  };

return (
  <div className="signup-page">

    {/* LEFT SIDE — INTRO */}
    <div className="signup-left">
      <h1>Join the Version Control System</h1>
      <p>
        Create your account and start managing repositories, tracking issues,
        committing code, and collaborating with developers — all inside a
        modern and powerful VCS platform.
      </p>

      <ul>
        <li>📦 Create repositories</li>
        <li>🧩 Organize your work</li>
        <li>🔐 Secure authentication</li>
        <li>👥 Team collaboration</li>
        <li>⚡ Lightning fast workflow</li>
      </ul>
    </div>

    {/* RIGHT SIDE — SIGNUP FORM */}
    <form className="signup-right-form" onSubmit={handleSignup}>
      <div className="signup-right">

        <div className="signup-logo-container">
          <img className="logo-login" src={logo} alt="Logo" />
        </div>

        <div className="signup-box-wrapper">

          <h1 className="signup-title">Create your account</h1>

          <div className="signup-box">
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                autoComplete="off"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email address</label>
              <input
                type="email"
                autoComplete="off"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                autoComplete="off"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="signup-btn" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </div>

          <div className="pass-box">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

      </div>
    </form>

  </div>
);

};

export default Signup;
