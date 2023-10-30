import "./result.scss";

import React, { useEffect } from "react";

export const Result = ({ totalQuestion, result, onTryAgain }) => {
  const [name, setName] = React.useState("");
  const [highScores, setHighScores] = React.useState([]);
  const [showScores, setShowScores] = React.useState(false);


  useEffect((item) => {
    setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
  }, [])
  const handleSave = () => {
    const score = {
      name,
      score: result.score,
    };

    const newHighScores = [...highScores, score].sort(
      (a, b) => b.score - a.score
    );
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScores));
  };

  const handleTryAgain = () => {
    setShowScores(false);
    setHighScores([]);
    onTryAgain();
  }
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total question: <span>{totalQuestion}</span>
      </p>
      <p>
        Total score: <span>{result.score}</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain} className="button">
        Try again
      </button>
      {!showScores ? (
        <div className="score">
          <h3>
            Enter your name below <br /> to save your score!
          </h3>
          <input
            className="score-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <div className="score-button-group">
            <button className="button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((item, i) => {
              return (
                <tr key={`${item.score}${item.name}${i}`}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
