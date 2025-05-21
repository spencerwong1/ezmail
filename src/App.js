import React, { useState, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Bar            from './components/Bar';
import TitlePage      from './components/TitlePage';
import Settings       from './components/Settings';
import EmailGenerator from './components/EmailGenerator';

import './App.css';

export default function App() {
  const [screen, setScreen] = useState('title');
  const [aiPrompt, setAiPrompt] = useState('');
  const nodeRef = useRef(null);
  const handleProceed = (promptString) => {
    setAiPrompt(promptString);
    setScreen('email');
  };
  const renderScreen = () => {
    switch (screen) {
      case 'title':
        return <TitlePage onContinue={() => setScreen('settings')} />;
      case 'settings':
        return (
          <Settings
            onBack    = {() => setScreen('title')}
            onProceed= {handleProceed}
          />
        );
      case 'email':
        return <EmailGenerator
          aiPrompt={aiPrompt}             // pass the stored prompt
          onBack={() => setScreen('settings')}
        />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Bar/>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={screen}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div ref={nodeRef}>
            {renderScreen()}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
