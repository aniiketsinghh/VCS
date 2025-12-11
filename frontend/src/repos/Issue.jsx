import React from "react";
import "./Issue.css";

const sampleIssues = [
  {
    id: 1,
    title: "Fix login redirect bug",
    description: "User is not redirected properly after authentication.",
    status: "open",
  },
  {
    id: 2,
    title: "Improve UI responsiveness",
    description: "Sidebar overlaps content on 768px width screens.",
    status: "open",
  },
  {
    id: 3,
    title: "Add search functionality",
    description: "Search users by username and email.",
    status: "closed",
  },
];

const Issues = () => {
  return (
    <section id="issues-wrapper">
      <header className="issues-header">
        <h2>Issues</h2>
      </header>

      <div className="issues-list">
        {sampleIssues.map((issue) => (
          <div className="issue-card" key={issue.id}>
            <div className="issue-top">
              <span
                className={`status-dot ${
                  issue.status === "open" ? "open" : "closed"
                }`}
              ></span>

              <h3 className="issue-title">{issue.title}</h3>
            </div>

            <p className="issue-desc">{issue.description}</p>

            <div className="issue-meta">
              <span className={`issue-status ${issue.status}`}>
                {issue.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Issues;
