import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("user_id");
      try {
        const res = await fetch(`http://127.0.0.1:8000/profile/${userId}`);
        const data = await res.json();
        if (res.ok) setProfile(data);
        else alert(data.detail);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
