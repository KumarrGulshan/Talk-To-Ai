import React, { useState } from 'react';

function ChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const askAi = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.text();
      setResponse(data);
    } catch (err) {
      console.error('Error generating response:', err);
      setError('Failed to get response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-medium text-xl '>
      <h2 className='mb-4'>Talk To AI</h2>
      <input className='border p-2 rounded-lg'
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask your question here"
      />
      <button className='m-5 mr-2 bg-blue-800 hover:bg-blue-950 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg' onClick={askAi} disabled={loading}>
        {loading ? 'Asking...' : 'Ask AI'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h4>Response:</h4>
        <p className=''>{response}</p>
      </div>
    </div>
  );
}

export default ChatComponent;
