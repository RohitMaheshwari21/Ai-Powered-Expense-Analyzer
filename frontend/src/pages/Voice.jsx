import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Voice() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const uploadAudio = async () => {

        if (!file) {
            alert("Please select an audio file");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

            const response = await api.post(
                "/voice/transcribe",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            alert("Voice processing failed");
        }

        setLoading(false);
    };

    return (
        <Layout>

            <h1>Voice Assistant</h1>

            <br />

            <input
                type="file"
                accept=".wav,.mp3,.m4a"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />

            <button
                onClick={uploadAudio}
                style={{
                    marginLeft: "10px"
                }}
            >
                Upload Audio
            </button>

            <br />
            <br />

            {
                loading && (
                    <h3>
                        Processing Audio...
                    </h3>
                )
            }

            {
                result && (
                    <div
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>Transcription</h3>

                        <p>
                            {result.transcription}
                        </p>

                        <h3>Extracted Title</h3>

                        <p>
                            {result.title}
                        </p>

                        <h3>Amount</h3>

                        <p>
                            Rs. {result.amount}
                        </p>

                        <h3>Predicted Category</h3>

                        <p>
                            {result.predicted_category}
                        </p>

                    </div>
                )
            }

        </Layout>
    );
}

export default Voice;