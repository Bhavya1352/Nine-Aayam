import React, { createContext, useState, useContext } from 'react';

const CursorContext = createContext({
  cursorType: '',
  cursorLabel: '',
  setCursorType: () => {},
  setCursorLabel: () => {},
});

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('');
  const [cursorLabel, setCursorLabel] = useState('');

  const updateCursor = (type, label = '') => {
    setCursorType(type);
    setCursorLabel(label);
    
    document.body.classList.remove(
      'cursor-hovering-explore',
      'cursor-hovering-play',
      'cursor-hovering-view',
      'cursor-hovering-connect'
    );
    
    if (type) {
      document.body.classList.add(`cursor-hovering-${type}`);
    }
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorLabel, setCursor: updateCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
