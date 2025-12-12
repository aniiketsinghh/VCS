import React, { useEffect, useState } from "react";
import "./AllRepos.css";


const AllRepos = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch your backend repos here
    // For demo:
    setRepos([
      { _id: 1, name: "looksy-video-app", description: "A WebRTC-based video chat app" },
      { _id: 2, name: "stock-trader", description: "Full-stack trading simulation app" },
      { _id: 3, name: "mern-auth", description: "MERN authentication boilerplate" },
    ]);
  }, []);

  return (
    <div id="all-repos-container">
      <h1>All Repositories</h1>

      <div className="repos-list">
        {repos.map((repo) => (
          <div className="repo-card" key={repo._id}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRepos;
