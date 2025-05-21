import React, { useState } from 'react';

export default function Settings({ onBack, onProceed }) {
  const [isContinueHovering, setContinueIsHovering] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [tone, setTone] = useState('Formal');
  const toneOptions = ['Casual', 'Formal', 'Apologetic', 'Sincere'];

  const [name, setName] = useState('');
  const [length, setLength] = useState(50);
  const [topic, setTopic] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)',
        color: 'white',
        padding: '0px',
        gap: '1.5rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Settings</h1>


      {/* Name input */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <p style={{ marginBottom: '0.5rem', fontFamily: 'Inter' }}>Addressee:</p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="E.g. Hiring Team, Mr Andrew"
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            border: '1px solid white',
            borderRadius: '4px',
            background: 'transparent',
            color: 'white',
            outline: 'none',
            fontFamily: 'Inter',
            height: '3rem',
            fontSize: '1rem'
          }}
        />
      </div>

      {/* Tone selector */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '0.5rem', fontFamily: 'Inter' }}>Tone:</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {toneOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setTone(opt)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid white',
                borderRadius: '4px',
                background: tone === opt ? 'white' : 'transparent',
                color: tone === opt ? 'rgb(33,33,33)' : 'white',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Length slider */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <p style={{ marginBottom: '0.5rem', fontFamily: 'Inter' }}>
          Email length preference:
          <span style={{ marginLeft: '0.5rem', fontWeight: 'bold' }}>
            {length <= 33 ? 'Short' : length <= 66 ? 'Medium' : 'Long'}
          </span>
        </p>
        <input
          type="range"
          min="0"
          max="100"
          value={length}
          onChange={e => setLength(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>
      </div>

      {/* Topic input */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
        <p style={{ marginBottom: '0.5rem', fontFamily: 'Inter' }}>
          What is this email about?
        </p>
        <textarea
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="E.g. Project deadline, thank you note…"
          style={{
            width: '100%',
            height: '6rem',
            padding: '1rem',
            border: '1px solid white',
            borderRadius: '4px',
            background: 'transparent',
            color: 'white',
            outline: 'none',
            fontFamily: 'Inter',
            fontSize: '1rem',
            resize: 'none'
          }}
        />
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            marginTop: '10px',
            backgroundColor: isHovering ? 'rgb(243,147,1)' : 'transparent',
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

        <button
          onClick={() => {
            const aiPrompt = `
    please write me an email addressing ${name}, with a ${tone.toLowerCase()} tone, ` +
              `around ${length} words, covering: ${topic}`;
            onProceed(aiPrompt);
          }}
          style={{
            marginTop: '10px',
            backgroundColor: isContinueHovering ? 'rgb(243,147,1)' : 'transparent',
            color: isContinueHovering ? 'black' : 'white',
            fontSize: '18px',
            fontFamily: 'Inter',
            borderRadius: '100px',
            padding: '10px 20px',
            height: '50px',
            width: '210px',
            borderColor: 'rgb(100,100,100)',
            borderStyle: 'solid',
            fontWeight: '700',
            transform: isContinueHovering ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isContinueHovering ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={() => setContinueIsHovering(true)}
          onMouseLeave={() => setContinueIsHovering(false)}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
