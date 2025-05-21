/* global puter */
import React, { useState, useEffect } from 'react';

export default function EmailGenerator({ aiPrompt, onBack }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading]   = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // This effect runs once when the component appears (or whenever aiPrompt changes)
  useEffect(() => {
    if (!aiPrompt?.trim()) {
      setResponse('Please enter a prompt.');
      return;
    }

    const send = async () => {
      setLoading(true);
      setResponse('…thinking…');
      try {
        const res = await puter.ai.chat(aiPrompt.trim());
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

    send();
  }, [aiPrompt]);  // re-run if aiPrompt ever changes

  return (
    <div style={{
      height: 'calc(100vh - 80px)',
      width: '95%',
      backgroundColor: 'rgb(33,33,33)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '2rem',
      color: 'white',
    }}>


      <button
        onClick={onBack}
        style={{
          marginTop: '10px',
          backgroundColor: isHovering ? 'white' : 'transparent',
          color: isHovering ? 'black' : 'white',
          fontSize: '18px',
          fontFamily: 'Inter',
          borderRadius: '100px',
          padding: '10px 20px',
          height: '50px',
          width: '210px',
          borderColor: 'rgb(100,100,100)',
          borderStyle: 'solid',
          fontWeight: '700',
          transform: isHovering ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHovering ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        GO BACK
      </button>

      {loading && <p>Sending…</p>}
      {!loading && <div style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
        {response}
      </div>}
    </div>
  );
}
