import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        ✨ Welcome to AI Chat
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginBottom: "2rem" }}>
        “Your words have power. Start a conversation and let AI assist you in
        exploring new ideas, solving problems, and learning something new.”
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          to="/signin"
          style={{
            background: "#fff",
            color: "#4facfe",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          style={{
            background: "#ff6b6b",
            color: "#fff",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
