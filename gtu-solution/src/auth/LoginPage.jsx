import { useContext, useEffect } from "react";
import Header from "../Header";
import { loginWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  // If already logged in, skip login page
  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [loading, user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log("Google Login:", result.user);
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
          <p className="auth-subtitle">Login with Google to access GTU Papers</p>

          <button className="google-btn" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
