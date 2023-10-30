import React from "react";
import { resultInitialState } from "../../data";
import './quiz.scss'
import { AnswerTimer } from "../answer-timer/answer-timer";
import { Result } from "../result/result";
export const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answerIndex, setAnswerIndex] = React.useState(null);
  const [answer, setAnswer] = React.useState(null);
  const [result, setResult] = React.useState(resultInitialState);
  const [showResult, setShowResult] = React.useState(false);
  const [showAnswerTimer, setShowAnswerTimer ] = React.useState(true);
  const [inputAnswer, setInputAnswer ] = React.useState('');

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIndex(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prev) =>
    finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    })
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  }

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  }

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);

    if(e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }
  const getAnswerUi = () => {
    if(type === "FIB") {
      return <input type="text" className="input" value={inputAnswer} onChange={handleInputChange}/>
    }
    return (
      <ul className="list">
              {choices?.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerClick(answer, index)}
                  className={answerIndex === index ? "selected-answer" : null}
                >
                  {answer}
                </li>
              ))}
            </ul>
    )
  }
  return (
    <div className="quiz-container">
      <>
        {!showResult ? (
          <>
          {showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="tota-question">/{questions.length}</span>
            <h2 className="question-title">{question}</h2>
            {getAnswerUi()}
            <div className="footer">
              <button
                className="button"
                onClick={() => onClickNext(answer)}
                disabled={answerIndex === null && !inputAnswer}
              >
                {currentQuestion === question.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <Result result={result} onTryAgain={onTryAgain} totalQuestion={questions.length} />
        )}
      </>
    </div>
  );
};