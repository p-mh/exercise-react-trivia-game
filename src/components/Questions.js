import React, { Component } from 'react';
import axios from 'axios';
import shuffle from 'lodash.shuffle';

import './questions.css';

export class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      correct_answer: '',
      answers: [],
    };
  }
  componentDidMount() {
    this.getNewQuestion();
  }
  async getNewQuestion() {
    const {
      data: { results },
    } = await axios.get(
      `https://opentdb.com/api.php?amount=1&difficulty=easy&token=${
        this.props.sessionToken
      }`
    );
    const { question, correct_answer, incorrect_answers } = results[0];
    this.setState({
      question,
      correct_answer,
      answers: shuffle([correct_answer, ...incorrect_answers]),
    });
  }

  checkAnswer(userAnswer) {
    if (userAnswer === this.state.correct_answer) {
      this.props.addPoint();
    }
    this.setState({
      question: null,
      correct_answer: '',
      answers: [],
    });
    this.getNewQuestion();
  }

  render() {
    const { question, answers } = this.state;
    if (!question) {
      return (
        <div className="loading">
          <i className="fas fa-spinner fa-spin" />
        </div>
      );
    } else {
      const answersMapped = answers.map(value => (
        <button
          key={value}
          className="answer-btn"
          onClick={this.checkAnswer.bind(this, value)}
        >
          {value.replace(/&#039;/g, "'")}
        </button>
      ));
      return (
        <div className="questions">
          <div className="question">
            <p>{question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</p>
          </div>
          <div className="answers">{answersMapped}</div>
        </div>
      );
    }
  }
}

export default Questions;
