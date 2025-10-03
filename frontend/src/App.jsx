import React, { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("signup"); // signup → signin → dashboard

  return (
    <div>
      {page === "signup" && (
        <Signup 
          onSignup={() => setPage("signin")}
          goToSignin={() => setPage("signin")} 
        />
      )}
      {page === "signin" && <Signin onSignin={() => setPage("dashboard")} />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
}
