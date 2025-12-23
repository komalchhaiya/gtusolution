import { useContext, useEffect } from "react";
import { loginWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log("Google Login:", result.user);
      navigate("/");
    } catch (error) {
  console.error("Google Login Error:", error);
  setError(error.message);
}
  };

  if (loading) {
    return (
      <div className="auth-loading">
        Loading...
      </div>
    );
  }

  if (user) return null;

  return (
    <>
      {/* INTERNAL CSS */}
      <style>
        {`
        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f4f0ec, #dbd4cb);
          padding: 1rem;
          box-sizing: border-box;
        }

        .auth-box {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          padding: 3rem 2.5rem;
          border-radius: 18px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.15);
          border: 1px solid #ccc1b3;
          text-align: center;
          animation: fadeIn 0.6s ease;
        }

        .auth-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0c0b07;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          font-size: 0.95rem;
          color: #6b533c;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .google-btn {
          width: 100%;
          padding: 0.9rem;
          border-radius: 12px;
          border: 1px solid #b9a185;
          background: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.25s ease;
          color: #0c0b07;
        }

        .google-btn:hover {
          background: #f4f0ec;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        }

        .google-btn:active {
          transform: translateY(0);
        }

        .auth-loading {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          color: #6b533c;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .auth-box {
            padding: 2.5rem 2rem;
          }
          .auth-title {
            font-size: 1.45rem;
          }
        }

        @media (max-width: 480px) {
          .auth-box {
            padding: 2.2rem 1.6rem;
            border-radius: 14px;
          }
          .auth-title {
            font-size: 1.35rem;
          }
          .auth-subtitle {
            font-size: 0.9rem;
          }
        }
        `}
      </style>

      {/* UI */}
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Welcome to GTU Papers</h2>
          <p className="auth-subtitle">
            Access accurate, easy-to-understand GTU paper solutions anytime,
            anywhere.
          </p>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
