import React from 'react';
import PlayButton from './PlayButton.js';

import './aftergame.css';

const BestScore = ({ points, bestScore }) =>
  points === bestScore ? (
    <div className="text">
      <p>You made {points} points</p>
      <p>Congrat, it's your best score !</p>
    </div>
  ) : (
    <div className="text">
      <p>You made {points} points</p>
      <p>Your best score is {bestScore} points</p>
    </div>
  );

const AfterGame = ({ gameState, points, begin, bestScore }) =>
  gameState === 'AFTER_GAME' && (
    <div className="aftergame">
      <BestScore points={points} bestScore={bestScore} />
      <PlayButton onClick={begin}>Play again !</PlayButton>
    </div>
  );

export default AfterGame;
