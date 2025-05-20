import React from 'react';
import TitlePage from './components/TitlePage';
import Bar from './components/Bar';
import EmailGenerator from './components/EmailGenerator';

// Full-screen red container reaching top of viewport without using className utilities
export default function App() {
  return (

    // R:	243	G:	147	B:	1 orange
    // R:	4	G:	42	B:	47: dark green (background)
    // R:	166	G:	88	B:	72: rubber red
    // R:	149	G:	171	B:	167: robot hand (lighter)
    // R:	33	G:	33	B:	33: chatgpt colour
    // R:	48	G:	48	B:	48: chatgpt colour lighter

    <div>
      <Bar/>
      <TitlePage/>
      {/* <EmailGenerator /> */}
    </div>
  );
}