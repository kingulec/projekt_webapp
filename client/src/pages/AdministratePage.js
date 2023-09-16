import React, { useEffect, useState } from "react";
import axios from "axios";

function AdministratePage() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  return (
    <div>
      <h1>Administrate Page</h1>
      <p>Welcome, Administrator!</p>
      <h2>User List:</h2>
      
    </div>
  );
}

export default AdministratePage;
