import React, { useState } from "react";

export default function Signup({ onSignup, goToSignin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, age }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Signup successful!");
        onSignup(); // go to signin page automatically
      } else {
        alert(data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <span 
          style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }} 
          onClick={goToSignin}
        >
          Signin
        </span>
      </p>
    </div>
  );
}
