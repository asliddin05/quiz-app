import { useEffect, useState } from "react"
import { Quiz } from "./components/quiz/quiz"

function App() {

  const [ questions, setQuestions ] = useState([]);

  useEffect(() => {
    getQuestions();
  }, [])


  const getQuestions = async () => {
    try {
      const res = await fetch('https://644982a3e7eb3378ca4ba471.mockapi.io/questions');
      const questionResponse = await res.json();

      setQuestions(questionResponse)
    } catch (error) {
      console.log(error);
    }
  }
  return (questions.length && <Quiz questions={questions} />)
}

export default App
