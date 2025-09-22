import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin({ username, password }))
      .unwrap()
      .then(() => navigate("/chat"))
      .catch(() => {});
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      {error && <div className="error-popup">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* ✅ Link to Sign Up */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don’t have an account?{" "}
        <Link to="/signup" style={{ color: "#4facfe", fontWeight: "bold" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
