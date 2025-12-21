import { useState } from "react";
import Header from "../Header";
import { loginWithEmail, loginWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginWithEmail(email, password);
      console.log("Logged in:", result.user);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.log("Email Login Error:", error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log("Google Login:", result.user);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.log("Google Login Error:", error);
      alert("Login Failed");
    }
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <div className="auth-box">

          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to access GTU Papers</p>

          <form className="auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" type="submit">Login</button>
          </form>

          <div className="divider">or</div>

          <button className="google-btn" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <p className="auth-footer-text">
            Don’t have an account? <a href="/signup">Create one</a>
          </p>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
