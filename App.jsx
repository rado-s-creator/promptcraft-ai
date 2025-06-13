import React, { useState } from 'react';

const styles = ["Realistic", "Fantasy", "Cyberpunk", "Minimalist", "Anime", "Dreamy"];

export default function App() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);

  const generatePrompt = () => {
    setPrompt(\`A \${style.toLowerCase()} scene based on uploaded image.\`);
  };

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎨 PromptCraft</h1>
      <input type="file" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
      <select value={style} onChange={(e) => setStyle(e.target.value)} className="my-2 p-1 text-black">
        {styles.map((s) => <option key={s}>{s}</option>)}
      </select>
      <button onClick={generatePrompt} className="bg-blue-600 px-4 py-2 rounded">Generate</button>
      {prompt && (
        <div className="mt-4">
          <p>{prompt}</p>
          <button onClick={downloadPrompt} className="bg-green-600 px-4 py-2 rounded mt-2">Download Prompt</button>
          <div className="mt-2 space-y-1">
            <a className="text-blue-300 underline" href="https://www.bing.com/images/create" target="_blank">→ Generate on Bing</a><br/>
            <a className="text-blue-300 underline" href="https://app.leonardo.ai/" target="_blank">→ Leonardo AI</a><br/>
            <a className="text-blue-300 underline" href="https://openai.com/dall-e" target="_blank">→ DALL·E</a><br/>
            <a className="text-blue-300 underline" href="https://www.midjourney.com/" target="_blank">→ Midjourney</a><br/>
            <a className="text-blue-300 underline" href="https://veo.video" target="_blank">→ VEO 3</a><br/>
            <a className="text-blue-300 underline" href="https://dremina.com" target="_blank">→ Dremina</a>
          </div>
        </div>
      )}
    </div>
  );
}