import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "username",
    bio: "This is your bio. Edit it later 🙂",
    followers: 10,
    following: 3,
    posts: 12,
  });
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3002/api/user/userProfile`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page-wrapper">
        {/* HEADER */}
        <div className="insta-profile-header">

          {/* LEFT: PROFILE IMAGE */}
          <div className="insta-profile-left">
            <div className="insta-profile-img"></div>
          </div>

          {/* RIGHT: USERNAME, STATS, BIO */}
          <div className="insta-profile-right">
            <div className="insta-username-row">
              <h2>{userDetails.username}</h2>
          
            </div>

            <div className="insta-stats">
              <p><strong>{userDetails.posts}</strong> posts</p>
              <p><strong>{userDetails.followers}</strong> followers</p>
              <p><strong>{userDetails.following}</strong> following</p>
            </div>

            <div className="insta-bio">
              <p>{userDetails.bio}</p>
            </div>
          </div>
        </div>

        <hr className="insta-divider" />

        {/* CONTENT GRID */}
        <div className="insta-content">
          <HeatMapProfile />
        </div>

        {/* LOGOUT BUTTON */}
        <button id="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
