function ForgotPassword() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#2563eb,#7c3aed)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          width: "420px",
          borderRadius: "18px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Forgot Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Password reset feature coming soon.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
