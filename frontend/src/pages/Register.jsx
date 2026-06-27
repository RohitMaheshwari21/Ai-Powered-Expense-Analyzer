import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [name, setName] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();


    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration Successful"
      );
    } catch (error) {
      console.log("REGISTER ERROR:", error.response);

      alert(
        JSON.stringify(
          error.response?.data
        )
      );
    }


  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          width: "420px",
          borderRadius: "18px",
          boxShadow:
            "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign:
              "center",
            color: "#1e293b",
          }}
        >
          Create Account </h1>


        <p
          style={{
            textAlign:
              "center",
            color: "#64748b",
            marginBottom:
              "25px",
          }}
        >
          AI Expense Analyzer
        </p>

        <form
          onSubmit={
            handleRegister
          }
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
            }}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom:
                "15px",
              borderRadius:
                "8px",
              border:
                "1px solid #cbd5e1",
            }}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius:
                "8px",
              border:
                "1px solid #cbd5e1",
            }}
          />

          <div
            style={{
              marginTop: "10px",
              marginBottom:
                "15px",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={
                  showPassword
                }
                onChange={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              />
              {" "}Show Password
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background:
                "#2563eb",
              color: "white",
              border: "none",
              borderRadius:
                "8px",
              cursor:
                "pointer",
              fontWeight:
                "bold",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "20px",
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>


  );
}

export default Register;