import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Advisor() {

    const [advice, setAdvice] = useState([]);

    useEffect(() => {
        fetchAdvice();
    }, []);

    const fetchAdvice = async () => {

        try {

            const response = await api.get(
                "/advisor/",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setAdvice(response.data.advice);

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <Layout>

            <h1>AI Financial Advisor</h1>

            <div
                style={{
                    marginTop: "20px"
                }}
            >

                {
                    advice.length === 0
                    ? (
                        <div
                            style={{
                                background: "#f8fafc",
                                padding: "20px",
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        >
                            No advice available.
                        </div>
                    )
                    : (
                        advice.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    background: "#f1f5f9",
                                    padding: "15px",
                                    marginBottom: "15px",
                                    borderRadius: "10px",
                                    border: "1px solid #cbd5e1",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                                }}
                            >
                                <strong>Recommendation {index + 1}</strong>

                                <p
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "0"
                                    }}
                                >
                                    {item}
                                </p>
                            </div>
                        ))
                    )
                }

            </div>

        </Layout>
    );
}

export default Advisor;