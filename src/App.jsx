import React, { useState } from 'react';

const promptStyles = [
  'Midjourney',
  'DALL·E',
  'Leonardo',
  'VEO',
  'Dremina'
];

const darkStyles = {
  backgroundColor: '#121212',
  color: '#ffffff'
};

const lightStyles = {
  backgroundColor: '#f9f9f9',
  color: '#000000'
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(promptStyles[0]);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const handleSave = () => {
    const newPrompt = `${style}: ${prompt}`;
    setSavedPrompts([...savedPrompts, newPrompt]);
    localStorage.setItem('savedPrompts', JSON.stringify([...savedPrompts, newPrompt]));
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`${style}: ${prompt}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "prompt.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', ...(isDark ? darkStyles : lightStyles) }}>
      <h1>🎨 PromptCraft</h1>

      <label htmlFor="style">Select Style:</label>
      <select id="style" value={style} onChange={(e) => setStyle(e.target.value)}>
        {promptStyles.map((styleOption) => (
          <option key={styleOption} value={styleOption}>{styleOption}</option>
        ))}
      </select>

      <br /><br />

      <textarea
        rows="4"
        cols="50"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <br /><br />

      <button onClick={() => alert(`${style}: ${prompt}`)}>Generate Prompt</button>
      <button onClick={handleDownload}>Download Prompt</button>
      <button onClick={handleSave}>Save to Collection</button>
      <button onClick={() => alert('Coming soon: AI Art generation!')}>Generate AI Art 🎨</button>

      <br /><br />

      <label>
        <input type="checkbox" checked={isDark} onChange={() => setIsDark(!isDark)} />
        Dark Mode
      </label>

      <hr />

      <h2>🗃️ Saved Prompts</h2>
      <ul>
        {savedPrompts.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}

export default App;
