// AccountPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function AccountPage({ loggedInUsername }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/account`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [loggedInUsername]);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h1>Your Account</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
     
    </div>
  );
}

export default AccountPage;
