import React from 'react';
import './playbutton.css';

const PlayButton = ({ children, onClick }) => {
  return (
    <button className="begin-btn" onClick={onClick.bind(this)}>
      {children}
    </button>
  );
};

export default PlayButton;
