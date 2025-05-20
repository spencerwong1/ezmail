/* global puter */
import React, { useState } from 'react';

export default function EmailGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setResponse('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setResponse('…thinking…');

    try {
      const res = await puter.ai.chat(trimmed);
      // If res is an object, extract content or fallback to toString()
      const text = typeof res === 'object'
        ? res.message?.content ?? res.toString()
        : res;
      setResponse(text);
    } catch (err) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <input
        type="text"
        className="w-full max-w-md p-2 border border-gray-300 rounded"
        placeholder="Type your prompt here…"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Send'}
      </button>
      <div className="w-full max-w-2xl whitespace-pre-wrap text-center">
        {response}
      </div>
    </div>
  );
}
