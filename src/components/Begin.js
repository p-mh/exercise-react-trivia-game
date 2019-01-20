import React from 'react';
import PlayButton from './PlayButton.js';

import './begin.css';

const Begin = ({ gameState, begin }) =>
  gameState === 'BEGIN' && (
    <div className="begin">
      <div className="text-intro">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, et!</p>
      </div>
      <PlayButton onClick={begin}>Play !</PlayButton>
    </div>
  );
export default Begin;
