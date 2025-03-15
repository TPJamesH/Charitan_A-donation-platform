import React, { useState } from "react";
import axios from "axios";

const Display = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = () => {
    setLoading(true); // Show loading state
    setError(null); // Reset error state

    axios
      .get("http://localhost:3010/user", {
        withCredentials: true, // Enable sending cookies/auth headers
      })
      .then((response) => {
        setUserData(response.data); // Set the data
      })
      .catch((err) => {
        setError(err.message); // Handle errors
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div>
      <h1>User Data</h1>
      <button onClick={fetchUserData} disabled={loading}>
        {loading ? "Loading..." : "Fetch User Data"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {userData && (
        <ul>
          {Object.entries(userData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Display;
