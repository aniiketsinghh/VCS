import React from "react";
import { Link } from "react-router";
import {
  Plus,
  FolderGit2,
  Bug,
  User,
  LogIn,
  LogOut,
  Github
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      
      {/* LEFT — Logo + Title */}
      <Link to="/" className="nav-left">
        <Github size={28} />
        <h2>GitHub Clone</h2>
      </Link>

      {/* RIGHT — Menu */}
      <div className="nav-right">

        <Link className="nav-item" to="/create">
          <Plus size={18} />
          <span>Create</span>
        </Link>

        <Link className="nav-item" to="/repos">
          <FolderGit2 size={18} />
          <span>Repos</span>
        </Link>

        <Link className="nav-item" to="/issues">
          <Bug size={18} />
          <span>Issues</span>
        </Link>

        <Link className="nav-item" to="/profile">
          <User size={18} />
          <span>Profile</span>
        </Link>

        <Link className="nav-item" to="/login">
          <LogIn size={18} />
          <span>Login</span>
        </Link>

        <button className="nav-item btn-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
