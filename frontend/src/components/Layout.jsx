import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1
                }}
            >
                <Navbar />

                <div
                    style={{
                        padding: "25px",
                        background: "#f8fafc",
                        minHeight: "100vh"
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;