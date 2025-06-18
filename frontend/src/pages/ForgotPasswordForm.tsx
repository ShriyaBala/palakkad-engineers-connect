// ForgotPasswordForm.jsx
import axios from "axios";
import React, { useState } from "react";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    setShowResetButton(false);
    try {
      // Replace with your actual API call
      // const res = await axios.post("/api/password-reset/", { email });
      // if (res.data.exists) {
      //   setMessage("Email verified! Click below to reset your password.");
      //   setShowResetButton(true);
      // } else {
      //   setError("This email is not registered.");
      // }
      // DEMO ONLY:
      if (email === "demo@example.com") {
        setMessage("Email verified! Click below to reset your password.");
        setShowResetButton(true);
      } else {
        setError("This email is not registered.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoToReset = () => {
    // Redirect to your reset password page (e.g., /reset-password)
    window.location.href = "/reset-password";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#e3f0fc"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2.5rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(21, 101, 192, 0.10)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem"
        }}
      >
        <h2 style={{
          marginBottom: "0.2rem",
          textAlign: "center",
          color: "#1565c0"
        }}>Forgot Password</h2>
        <p style={{
          color: "#1565c0",
          fontSize: "0.98rem",
          textAlign: "center",
          marginBottom: "0.5rem"
        }}>
          Enter your email address and we’ll verify it for password reset.
        </p>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: "0.8rem",
            border: "1px solid #90caf9",
            borderRadius: "6px",
            fontSize: "1rem",
            background: "#f0f7ff"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          Verify Email
        </button>
        {message && (
          <div style={{
            background: "#e3fcec",
            color: "#1976d2",
            padding: "0.7rem",
            borderRadius: "6px",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{
            background: "#fdecea",
            color: "#d32f2f",
            padding: "0.7rem",
            borderRadius: "6px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}
        {showResetButton && (
          <button
            type="button"
            onClick={handleGoToReset}
            style={{
              marginTop: "1rem",
              padding: "0.8rem",
              background: "#1565c0",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            Go to Reset Password
          </button>
        )}
      </form>
    </div>
  );
}

export default ForgotPasswordForm;