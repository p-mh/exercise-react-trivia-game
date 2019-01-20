import React from 'react';
import Questions from './Questions.js';

import './ingame.css';

const InGame = ({ gameState, timer, points, sessionToken, addPoint }) =>
  gameState === 'IN_GAME' && (
    <div className="ingame">
      <div className="time-left">Time left : {timer}</div>
      <div className="points">{points} points</div>
      <Questions sessionToken={sessionToken} addPoint={addPoint} />
    </div>
  );

export default InGame;
