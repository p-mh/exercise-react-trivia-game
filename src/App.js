import React, { Component } from 'react';
import axios from 'axios';

import Begin from './components/Begin.js';
import InGame from './components/InGame.js';
import AfterGame from './components/AfterGame.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestScore: 0,
      points: 0,
      timer: 0,
      gameState: 'BEGIN',
    };
  }
  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const {
      data: { token },
    } = await axios.get('https://opentdb.com/api_token.php?command=request');
    this.sessionToken = token;
  }

  clearInterval = () => clearInterval(this.intervalTimer);
  begin = () => {
    const futurTimeEnd = Date.now() + 20.999 * 1000;
    this.setState({
      points: 0,
      timer: 20,
      gameState: 'IN_GAME',
    });
    this.clearInterval();

    this.intervalTimer = setInterval(() => {
      const { timer, points, bestScore } = this.state;
      if (timer > 0) {
        const timeLeft = futurTimeEnd - Date.now();
        this.setState({
          timer: Math.floor((timeLeft % (1000 * 60)) / 1000),
        });
      } else {
        const newBestScore = points > bestScore ? points : bestScore;
        this.setState({
          gameState: 'AFTER_GAME',
          bestScore: newBestScore,
        });
        this.clearInterval();
      }
    }, 100);
  };

  addPoint = () => {
    this.setState({
      points: this.state.points + 1,
    });
  };

  render() {
    const { gameState, timer, points, bestScore } = this.state;

    return (
      <div className="App">
        <h1 className="title">Trivia</h1>
        <h1 className="subtitle">Quiz</h1>
        <div className="game-content">
          <Begin gameState={gameState} begin={this.begin.bind(this)} />
          <InGame
            gameState={gameState}
            timer={timer}
            points={points}
            sessionToken={this.sessionToken}
            addPoint={this.addPoint.bind(this)}
          />
          <AfterGame
            gameState={gameState}
            points={points}
            bestScore={bestScore}
            begin={this.begin.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
