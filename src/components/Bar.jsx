import React, { useState } from 'react';

export default function Bar() {
  const [isHovering, setIsHovering] = useState(false);

  const buttonStyle = {
    background: 'transparent',
    color: isHovering ? 'rgb(243,147,1)' : 'white',
    border: 'transparent',
    borderRadius: '10px',
    padding: '30px',
    fontSize: '20px',
    lineHeight: '22px',
    cursor: 'pointer',
    fontFamily: 'Inter',
    fontWeight: '700',
    letterSpacing: '0.02em',
  };

  return (
    <div style={{
      display: 'flex',
      backgroundColor: 'rgb(33,33,33)',
      height: '80px',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 30px',
      fontSize: '20px',
    }}>
      <div />

      <button
        className="profile-button"
        style={buttonStyle}
        onClick={() => {
          window.location.href = 'https://spencerwong1.github.io/';
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        Profile
      </button>
    </div>
  );
}
