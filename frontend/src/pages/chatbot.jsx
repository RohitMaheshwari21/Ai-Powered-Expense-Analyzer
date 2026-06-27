import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Chatbot() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/chat/",
                {
                    question
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {

            console.error(error);

            alert("Failed to get response");
        }
    };

    return (
        <Layout>

            <h1>AI Financial Chatbot</h1>

            <form onSubmit={askQuestion}>

                <textarea
                    rows="4"
                    cols="60"
                    placeholder="Ask anything about your expenses..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Ask AI
                </button>

            </form>

            {answer && (

                <div
                    style={{
                        marginTop: "30px",
                        padding: "15px",
                        border: "1px solid #ccc"
                    }}
                >
                    <h3>Response</h3>

                    <p>{answer}</p>

                </div>

            )}

        </Layout>
    );
}

export default Chatbot;