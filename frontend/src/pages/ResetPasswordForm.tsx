// ResetPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/api/password-reset-confirm/", { uid, token, password });
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Invalid or expired link. Please try again.");
    }
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
        }}>Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: "0.8rem",
            border: "1px solid #90caf9",
            borderRadius: "6px",
            fontSize: "1rem",
            background: "#f0f7ff"
          }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
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
          Reset Password
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
      </form>
    </div>
  );
}

export default ResetPasswordForm;