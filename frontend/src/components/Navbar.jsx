import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <div
            style={{
                background: "#ffffff",
                padding: "15px 25px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}
        >
            <div>
                <h2
                    style={{
                        margin: 0,
                        color: "#1e293b"
                    }}
                >
                    AI Expense Analyzer
                </h2>

                <p
                    style={{
                        margin: 0,
                        fontSize: "14px",
                        color: "#64748b"
                    }}
                >
                    Personal Finance Dashboard
                </p>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Navbar;