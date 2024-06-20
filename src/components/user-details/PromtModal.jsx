import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Modal.css"; // Import the CSS for styling

const PromptModal = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-image",
        { prompt }
      );
      const generatedImageUrl = response.data.url;
      console.log("Generated image URL:", response);
      navigate("/image-selection", { state: { generatedImageUrl } });
    } catch (error) {
      console.error(
        "Error generating image:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => navigate("/select-photo")}
        >
          ✕
        </button>
        <input
          type="text"
          className="prompt-input"
          placeholder="Type the Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default PromptModal;
