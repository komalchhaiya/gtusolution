import { useState } from "react";
import Header from "../Header";
import { signupWithEmail, loginWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await signupWithEmail(email, password);
      console.log("User Created:", result.user);
      alert("Signup Successful!");
      navigate("/");
    } catch (error) {
      console.log("Signup Error:", error);
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await loginWithGoogle();
      console.log("Google Signup:", result.user);
      alert("Signup Successful!");
      navigate("/");
    } catch (error) {
      console.log("Google Error:", error);
      alert("Google signup failed");
    }
  };

  return (
    <>
      <Header />

      <div className="auth-container">
        <div className="auth-box">

          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Signup to continue</p>

          <form className="auth-form" onSubmit={handleSignup}>
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

            <button className="auth-btn" type="submit">Sign Up</button>
          </form>

          <div className="divider">or</div>

          <button className="google-btn" onClick={handleGoogleSignup}>
            Sign Up with Google
          </button>

          <p className="auth-footer-text">
            Already have an account? <a href="/login">Login</a>
          </p>

        </div>
      </div>
    </>
  );
}

export default SignupPage;
