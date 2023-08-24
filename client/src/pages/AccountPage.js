import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile({ loggedInUsername }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/user/${loggedInUsername}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (loggedInUsername) {
      fetchUserData();
    }
  }, [loggedInUsername]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {userData.login}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Birth Date:</strong> {userData.birth_date}</p>
    </div>
  );
}

export default UserProfile;
