import React, { useState } from 'react'

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(URL.createObjectURL(file))
      setPrompt('An ultra-detailed description from image') // Placeholder
    }
  }

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', color: '#0ff' }}>🎨 PromptCraft</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br /><br />
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{ width: '100%', maxWidth: 600, padding: 10, borderRadius: 8, background: '#111', color: '#0ff' }}
      />
      <br />
      <button onClick={() => navigator.clipboard.writeText(prompt)} style={{ margin: 10 }}>📋 Copy Prompt</button>
      <button onClick={() => downloadPrompt(prompt)} style={{ margin: 10 }}>⬇️ Download</button>
      {image && <div><h3>Preview:</h3><img src={image} alt="Uploaded" style={{ maxWidth: 400, marginTop: 20 }} /></div>}
    </div>
  )
}

function downloadPrompt(prompt) {
  const blob = new Blob([prompt], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'prompt.txt'
  a.click()
  URL.revokeObjectURL(url)
}