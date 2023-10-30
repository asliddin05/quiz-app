import React, { useEffect } from 'react';
import './answer-timer.scss';

export const AnswerTimer = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = React.useState(0);
  const [progressLoaded, setProgressLoaded] = React.useState(0);
  const intervalRef = React.useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  
  return (
    <div className="answer-timer-container">
      <div className="progress" style={{
        width: `${progressLoaded}%`,
        backgroundColor: `${
          progressLoaded < 50
          ? 'lightgreen'
          : progressLoaded < 70
          ? 'orange'
          : 'red'
        }`
        }}> {counter} </div>
    </div>
  )
}
