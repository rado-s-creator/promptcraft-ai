import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [promptFromImage, setPromptFromImage] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedVideo, setGeneratedVideo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setPromptFromImage("A futuristic neon cyberpunk cityscape at night");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {
    setGeneratedImage("https://images.unsplash.com/photo-1504384308090-c894fdcc538d");
  };

  const generateVideo = () => {
    setGeneratedVideo("https://www.w3schools.com/html/mov_bbb.mp4");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">⚡ PromptCraft</h1>
        <p className="text-gray-400">AI Image & Video Prompt Generator</p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">📤 Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 text-gray-300"
          />
          {uploadedImage && (
            <div>
              <img src={uploadedImage} alt="Uploaded" className="rounded-lg w-full max-h-64 object-contain mb-3" />
              <div className="bg-gray-800 p-3 rounded-lg">
                <h3 className="text-lg font-semibold">🧠 Prompt Detected:</h3>
                <p className="text-cyan-300">{promptFromImage}</p>
                <button
                  className="mt-2 px-3 py-1 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400"
                  onClick={() => navigator.clipboard.writeText(promptFromImage)}
                >
                  Copy Prompt
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">✍️ Write Prompt</h2>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 mb-3"
            placeholder="Describe what you want to see..."
            rows={4}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          ></textarea>
          <div className="flex gap-4">
            <button
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-4 py-2 rounded-lg"
              onClick={generateImage}
            >
              🎨 Generate Image
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-400 text-black font-bold px-4 py-2 rounded-lg"
              onClick={generateVideo}
            >
              🎥 Generate Video
            </button>
          </div>

          {generatedImage && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">🖼️ Generated Image</h3>
              <img src={generatedImage} className="rounded-lg mt-2 w-full max-h-64 object-contain" alt="Generated" />
              <a
                href={generatedImage}
                download
                className="block mt-2 text-cyan-400 hover:underline"
              >
                Download Image
              </a>
            </div>
          )}

          {generatedVideo && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">🎬 Generated Video</h3>
              <video
                src={generatedVideo}
                className="rounded-lg mt-2 w-full max-h-64"
                controls
              ></video>
              <a
                href={generatedVideo}
                download
                className="block mt-2 text-cyan-400 hover:underline"
              >
                Download Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
