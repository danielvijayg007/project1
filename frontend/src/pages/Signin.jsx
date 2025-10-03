import React, { useState } from "react";

export default function Signin({ onSignin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id); // backend should return user_id
        onSignin(); // go to dashboard
      } else {
        alert(data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Signin failed");
    }
  };

  return (
    <div className="container">
      <h2>Signin</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
}
