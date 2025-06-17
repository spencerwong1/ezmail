/* global puter */
import React, { useState, useEffect } from 'react';

export default function EmailGenerator({ aiPrompt, onBack }) {
  const [response, setResponse] = useState('');
  const [copy, setCopy] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isCopyHovering, setIsCopyHovering] = useState(false);
  const [isEditHovering, setIsEditHovering] = useState(false);
  const [isEditHovering1, setIsEditHovering1] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [editInstruction, setEditInstruction] = useState('');
  const [edit, setEdit] = useState('');

  const handleEditSubmission = () => {
    const aiPrompt = `this is what i currently have drafted for my email: ${response}
    please ONLY change these words: ${edit} with the following feedback: ${editInstruction}.
    ensure the remaining words are to be remain unchanged. It is crucial that the remaining words
    remain unchanged.`

    const send = async () => {
      setLoading(true);
      setResponse('…thinking…');
      try {
        const res = await puter.ai.chat(aiPrompt.trim(), { model: "gpt-4.1" });
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

  };

  // Handle Edit button click: capture selected text
  const handleEditClick = () => {
    const selection = window.getSelection().toString();
    if (!selection) {
      alert('Please highlight the text you want to edit first.');
      return;
    }
    setEdit(selection)
    setShowEditor(true);
  };
  
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

      <h1 style={{ marginBottom: '0px', marginTop: '-0', fontSize: '2.5rem'}}>EZMAIL</h1>
      <p
        className='instructions'
        style={{
          paddingLeft: '20px',
          color: 'rgb(243,147,1)',
          fontFamily: 'Inter',
        }}
      >
        Highlight the text you’d like to change, then click “Edit” to refine it.
      </p>

      <div className='box' style={{width: '100%', display: 'flex'}}>
        <div
          className='output'
          style={{
            width: '100%',
            padding: '1rem',
            border: '1px solid white',
            borderRadius: '4px',
            background: 'transparent',
            color: 'white',
            outline: 'none',
            fontFamily: 'Inter',
            fontSize: '1rem',
            resize: 'none',
            overflowY: 'auto',
          }}
        >
          {loading && <p>Thinking...</p>}
          {!loading && <div className="response-text"
          style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            {response}
          </div>}
        </div>
        {/* Editor panel for highlighted text */}
      {showEditor && (
        <div className='output' style={{ width: '30vw', padding: '1rem', border: '1px solid white', borderRadius: '4px' }}>
          <p style={{ marginBottom: '0.5rem', fontFamily: 'Inter' }}>Editing Line:</p>
          <textarea
            readOnly
            value={edit}
            style={{ width: 'calc(100% - 2.5rem)', height: '3rem', padding: '1rem', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', fontFamily: 'Inter', fontSize: '1rem', resize: 'none' }}
          />

          <p style={{ margin: '1rem 0 0.5rem', fontFamily: 'Inter' }}>What change to make?</p>
          <textarea
            className='edit'
            type="text"
            value={editInstruction}
            onChange={e => setEditInstruction(e.target.value)}
            placeholder="e.g.Make it more concise"
            style={{ resize: 'none', width: 'calc(100% - 2.5rem)', padding: '1rem', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', fontFamily: 'Inter', fontSize: '1rem' }}
          />


        <div style={{ marginTop: '15px', height: '30%', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <button
            onClick={() => {
              handleEditSubmission()
            }}
            className='btn'
            style={{
              backgroundColor: 'rgb(243,147,1)',
              color: isEditHovering1 ? 'black' : 'white',
              fontFamily: 'Inter',
              borderRadius: '100px',
              padding: '10px 20px',
              height: '50px',
              width: '210px',
              borderColor: 'rgb(100,100,100)',
              borderStyle: 'solid',
              fontWeight: '700',
              transform: isEditHovering1 ? 'scale(1.1)' : 'scale(1)',
              boxShadow: isEditHovering1 ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={() => setIsEditHovering1(true)}
            onMouseLeave={() => setIsEditHovering1(false)}
          >
            SUBMIT
          </button>
      </div>



        </div>
      )}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
         onClick={() => {
          localStorage.removeItem('aiPrompt');
          onBack();
        }}
        className='btn'
        style={{
          marginTop: '10px',
          backgroundColor: isHovering ? 'rgb(243,147,1)' : 'transparent',
          color: isHovering ? 'black' : 'white',
          fontFamily: 'Inter',
          borderRadius: '100px',
          padding: '10px 20px',
          height: '50px',
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
        RESTART
      </button>

      {/* EDIT BUTTON */}
      <button
        onClick={() => {
          handleEditClick()
        }}
        className='btn'
        style={{
          marginTop: '10px',
          backgroundColor: isEditHovering ? 'rgb(243,147,1)' : 'rgb(243,147,1)',
          color: isEditHovering ? 'black' : 'white',
          fontFamily: 'Inter',
          borderRadius: '100px',
          padding: '10px 20px',
          height: '50px',
          borderColor: 'rgb(100,100,100)',
          borderStyle: 'solid',
          fontWeight: '700',
          transform: isEditHovering ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isEditHovering ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={() => setIsEditHovering(true)}
        onMouseLeave={() => setIsEditHovering(false)}
      >
        EDIT
      </button>

      {/* COPY BUTTON */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(response)
            .then(() => {
              setCopy(true)
            })
            .catch(err => {
              alert('Copy failed: ' + err);
            });
        }}
        className='btn'
        style={{
          marginTop: '10px',
          backgroundColor: 'rgb(0, 163, 108)',
          color: isCopyHovering ? 'black' : 'white',
          fontFamily: 'Inter',
          borderRadius: '100px',
          padding: '10px 20px',
          height: '50px',
          borderColor: 'rgb(100,100,100)',
          borderStyle: 'solid',
          fontWeight: '700',
          transform: isCopyHovering ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isCopyHovering ? '0 8px 20px rgba(0,0,0,0.3)' : 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={() => setIsCopyHovering(true)}
        onMouseLeave={() => setIsCopyHovering(false)}
      >
        {copy ? 'COPIED' : 'COPY'}
      </button>
    </div>
    </div>
  );
}