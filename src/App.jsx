
import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setPrompt('A futuristic painting of a cyberpunk city in the rain.'); // Sample prompt
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    alert('Prompt copied!');
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'prompt.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>🎨 PromptCraft</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="preview" style={{ width: 300, marginTop: 20 }} />}
      <div style={{ marginTop: 20 }}>
        <textarea value={prompt} readOnly rows={4} style={{ width: '80%', background: '#222', color: '#fff' }} />
        <div>
          <button onClick={handleCopy}>Copy Prompt</button>
          <button onClick={handleDownload}>Download Prompt</button>
        </div>
      </div>
    </div>
  );
};

export default App;
