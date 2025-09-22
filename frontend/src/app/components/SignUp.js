import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");

    dispatch(signup({ username, password }))
      .unwrap()
      .then(() => navigate("/signin"))
      .catch((err) => {
        setError(err?.message || "Signup failed. Try again.");
      });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      {/* ✅ Error box */}
      {error && <div className="error-popup">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "1rem" }}
        />
        <button type="submit" style={{ marginTop: "1rem", width: "100%" }}>
          Sign Up
        </button>
      </form>

      {/* ✅ Link to Sign In */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/signin" style={{ color: "#4facfe", fontWeight: "bold" }}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
