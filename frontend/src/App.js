import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./app/components/SignIn";
import SignUp from "./app/components/SignUp";
import ChatPage from "./app/components/ChatPage";
import LandingPage from "./app/components/LandingPage";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        {/* ✅ Show Sign In / Sign Up only if user is NOT logged in */}
        {!user && (
          <nav style={{ padding: "10px" }}>
            <Link to="/signin">Sign In</Link> |{" "}
            <Link to="/signup">Sign Up</Link>
          </nav>
        )}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
