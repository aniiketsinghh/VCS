import React from "react";
import { Link } from "react-router";
import { FolderGit2, Bug } from "lucide-react";
import "./RepoNavbar.css";

const Navbar = () => {
  return (
    <nav className="dark-nav">

      {/* LEFT — LOGO + BRAND */}
      <Link to="/" className="nav-logo">
        <img 
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="avatar"
          className="nav-avatar"
        />
        <h2>GitHub</h2>
      </Link>

      {/* RIGHT — MENU */}
      <div className="nav-links">

        <Link to="/repos" className="nav-item">
          <FolderGit2 size={18} />
          <span>All Repos</span>
        </Link>

        <Link to="/issues" className="nav-item">
          <Bug size={18} />
          <span>Issues</span>
        </Link>

        {/* Avatar on the right */}
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=dev"
          alt="user avatar"
          className="user-avatar"
        />
      </div>

    </nav>
  );
};

export default Navbar;
