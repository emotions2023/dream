import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('Sending data:', { dreamElements: input });
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamElements: input }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStory(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>夢物語ジェネレーター</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="夢の要素を入力してください"
      />
      <button onClick={handleSubmit}>物語を生成</button>
      {story && <p>{story}</p>}
    </div>
  );
}