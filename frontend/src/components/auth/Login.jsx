import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../../authContext";
import logo from "../../assets/github-mark-white.svg";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3002/api/user/login",
        { email, password }
      );

      // Save token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      // Update auth context
      setCurrentUser(res.data.user);

      setLoading(false);

      // Redirect using React Router
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <form className="login-left-form" onSubmit={handleLogin}>
        <div className="login-left">
          <div className="login-logo-container">
            <img className="logo-login" src={logo} alt="Logo" />
          </div>

          <div className="login-box-wrapper">
            <h1 className="login-title">Sign In</h1>

            <div className="login-box">
              <div className="input-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="pass-box">
              <p>
                New to our VCS? <Link to="/signup">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <h1>Version Control System</h1>
        <p>
          Welcome to your personal GitHub-like version control system.
          Manage repositories, issues, commits, and collaborate like a pro —
          all within a lightning fast and powerful developer interface.
        </p>

        <ul>
          <li>⚡ Create and manage repositories</li>
          <li>🐛 Track and resolve issues</li>
          <li>📌 Star and organize your work</li>
          <li>👥 Collaborate with your team</li>
          <li>🔐 Secure login & encrypted authentication</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
