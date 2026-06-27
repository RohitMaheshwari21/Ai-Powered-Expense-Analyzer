import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Forecast() {

    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        fetchForecast();
    }, []);

    const fetchForecast = async () => {

        try {

            const response = await api.get(
                "/forecast/next-month",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setPrediction(
                response.data.predicted_expense
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <Layout>

            <h1>Expense Forecast</h1>

            {
                prediction !== null
                ? (
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "10px"
                        }}
                    >
                        <h2>
                            Next Month Predicted Expense
                        </h2>

                        <h1>
                            Rs. {prediction.toFixed(2)}
                        </h1>
                    </div>
                )
                : (
                    <p>Loading prediction...</p>
                )
            }

        </Layout>
    );
}

export default Forecast;