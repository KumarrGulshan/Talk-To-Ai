import React, { useState } from 'react';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8080/generate-image?prompt=${encodeURIComponent(prompt)}`
      );
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const urls = await response.json(); // expecting array of URLs
      setImageUrls(Array.isArray(urls) ? urls : []);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='justify-center items-center p-4'>
      <h2 className='font-medium text-xl mb-4'>Generate Image</h2>
      <input className=' border border-b-blue-600 p-2 rounded-lg mb-4'
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
      />
      <button className=' bg-blue-800 hover:bg-blue-950 m-5 mr-2 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 text-gray-50 p-1 rounded-lg' onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='m-2 mr-10' style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Generated ${index}`}
            style={{ width: 150, height: 150, objectFit: 'cover', border: '1px solid #ccc' }}
          />
        ))}

        {/* fill to 4 slots */}
        {[...Array(Math.max(0, 4 - imageUrls.length))].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="empty-image-slot justify-center items-center"
            style={{
              width: 150,
              height: 150,
              border: '1px dashed #aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: 12,
            }}
          >
            Empty
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGenerator;
