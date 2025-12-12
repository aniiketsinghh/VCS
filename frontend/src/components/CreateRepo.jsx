
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./CreateRepo.css";
import Navbar from "./Navbar";


const CreateRepo = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("loading...");
  const [repos, setRepos] = useState({
    name: "",
    description: "",
    visibility: "Public",
    addReadme: false,
    addGitignore: false,
    addLicense: false,
  });


   useEffect(() => {
  
      const fetchRepositories = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/api/repo/create`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();
          setRepos(data.repositories);
        } catch (err) {
          console.error("Error while fecthing repositories: ", err);
        }
      };
  
      fetchRepositories();
    }, []);
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.username) {
      setUsername(userData.username);
    } else {
      setUsername("Guest");
    }
  }, []);

 

  const handleCreate = async () => {
    if (!repos.name.trim()) {
      alert("Repository name is required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3002/repo/create",
        repos,
        { withCredentials: true }
      );
      console.log(res);
      alert("Repository created successfully");
      navigate("/getallrepos");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (<>
    <Navbar/>
    <div className="create-repo-wrapper">
      <div className="create-repo-container">

        <h1 className="title">Create a new repository</h1>
        <p className="subtitle">
          Repositories contain a project's files and stores its version history.
        </p>

        {/* Step 1 */}
        <div className="step-box">
          <h2 className="step-title">General</h2>

          <div className="two-col">

            {/* Owner */}
            <div className="col">
              <label className="label">Owner *</label>
              <div className="box-input">{username}</div>
            </div>

            {/* Repo Name */}
            <div className="col">
              <label className="label">Repository name *</label>
              <input
                type="text"
                className="input"
                placeholder="my-awesome-repo"
                value={repos.name}
                onChange={(e) =>
                  setRepos({ ...repos, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <label className="label mt-5">Description (optional)</label>
          <textarea
            rows={3}
            className="textarea"
            placeholder="Write a short description..."
            value={repos.description}
            onChange={(e) =>
              setRepos({ ...repos, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <h2 className="step-title">Configuration</h2>

          {/* Visibility */}
          <label className="label">Choose visibility *</label>

<div className="visibility-options">
  <label className="visibility-option">
    <input
      type="radio"
      name="visibility"
      value="Public"
      checked={repos.visibility === "Public"}
      onChange={(e) =>
        setRepos({ ...repos, visibility: e.target.value })
      }
    />
    <div>
      <div className="v-title">Public</div>
      <div className="v-desc">Anyone on the internet can see this repository.</div>
    </div>
  </label>

  <label className="visibility-option">
    <input
      type="radio"
      name="visibility"
      value="Private"
      checked={repos.visibility === "Private"}
      onChange={(e) =>
        setRepos({ ...repos, visibility: e.target.value })
      }
    />
    <div>
      <div className="v-title">Private</div>
      <div className="v-desc">No one can see this repository except you.</div>
    </div>
  </label>
</div>



          {/* README */}
          <div className="config-row">
            <div>
              <h3 className="config-title">Add README</h3>
              <p className="config-desc">Used for longer descriptions.</p>
            </div>
            <input
              type="checkbox"
              checked={repos.addReadme}
              onChange={() =>
                setRepos({ ...repos, addReadme: !repos.addReadme })
              }
              className="toggle"
            />
          </div>

          {/* Gitignore */}
          <div className="config-row">
            <div>
              <h3 className="config-title">Add .gitignore</h3>
              <p className="config-desc">Tells git which files not to track.</p>
            </div>
            <input
              type="checkbox"
              checked={repos.addGitignore}
              onChange={() =>
                setRepos({ ...repos, addGitignore: !repos.addGitignore })
              }
              className="toggle"
            />
          </div>

          {/* License */}
          <div className="config-row">
            <div>
              <h3 className="config-title">Add license</h3>
              <p className="config-desc">Helps others use your code.</p>
            </div>
            <input
              type="checkbox"
              checked={repos.addLicense}
              onChange={() =>
                setRepos({ ...repos, addLicense: !repos.addLicense })
              }
              className="toggle"
            />
          </div>
        </div>

        {/* Button */}
        <button className="create-btn" onClick={handleCreate}>
          Create repository
        </button>

      </div>
    </div>
    </>
  );
};

export default CreateRepo;



