import React, { useState } from 'react';
const PUBLIC = process.env.PUBLIC_URL;

export default function TitlePage({ onContinue }) {
  const [isHovering, setIsHovering] = useState(false);
  const features = [
    'Draft new emails in seconds',
    'Adjust tone on the fly (Formal, Casual, Sincere, etc.)',
    'Directly edit selected text',
    'Copy-paste the generated text directly into your inbox'
  ];
  return (
    <div
      className="title-page-container"
      style={{
        height: 'calc(100vh - 80px)',
        width: '90%',
        paddingLeft: '5%',
      }}
    >
      
      <div style={{
        paddingBottom: '50px',
      }}>
      <h1 style={{
        color: 'white',
        fontSize: '80px',
        fontFamily: 'Inter',
        marginBottom: '0px',
        fontWeight: '4000',
        letterSpacing: '0.05em',
      }}>
        EZMAIL
      </h1>
      
      <div style={{ color: 'white', fontFamily: 'Inter', maxWidth: '600px', lineHeight: 1.6 }}>
      <p>
        EZMail is an AI-powered email assistant built on the OpenAI API. It lets you:
      </p>
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
        {features.map((feat, i) => (
          <li key={i}>{feat}</li>
        ))}
      </ul>
      <p style={{ marginTop: '1rem' }}>
        With EZMail, you’ll compose professional, on-brand emails effortlessly—no writer’s block required.
      </p>
      
    </div>
        
      <button
        style={{
          marginTop: '10px',
          backgroundColor: isHovering ? 'rgb(243,147,1)': 'transparent' ,
          color: isHovering ? 'black': 'white',
          fontSize: '18px',
          fontFamily: 'Inter',
          borderRadius: '100px',
          padding: '10px 20px',
          height: '50px',
          width: '210px',
          borderColor: 'rgb(100,100,100)',
          borderStyle: 'solid',
          fontWeight: '700',
          transform:      isHovering ? 'scale(1.1)' : 'scale(1)',
          boxShadow:      isHovering ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          transition:     'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onContinue}
      >
        GET STARTED
      </button>
      
      </div>
        <div
          className={'background-image'}
          style={{
            backgroundSize: 'contain',
            height: 'calc(100vh - 80px)',
            width: '95%',
            backgroundImage: `url(${PUBLIC}/hand.png)`,   // note the backticks!
            backgroundRepeat: 'no-repeat',
            alignItems: 'center',
          }}
        />
    </div>
  );
}


