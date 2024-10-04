import { useState, useCallback, useRef } from "react";
import QUESTION from "../question.js";
import imgComplete from "../assets/quiz-complete.png";
import ProgressBar from "./ProgressBar.jsx";
import { useEffect } from "react";

function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const activeQuestion = userAnswers.length;
  const quizIsOver = activeQuestion === QUESTION.length;
  let buttonClass = null;

  useEffect(() => {
    if (!quizIsOver) {
      const answers = [...QUESTION[activeQuestion].answers];
      answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [activeQuestion]);

  function handleSelectAnswers(selected) {
    setSelectedAnswer((prev) => {
      if (prev === selected) {
        buttonClass = "selected";
      }
      return selected;
    });
  }

  function checkAnswer(selected) {
    const isTrue = QUESTION[activeQuestion].answers[0] === selected;
    setUserAnswers((prev) => [
      ...prev,
      { isTrue, answer: selected || "No Answer" },
    ]);
  }

  const handleTimeout = useCallback(() => {
    if (quizIsOver) {
      return;
    }
    checkAnswer(selectedAnswer);
  }, [activeQuestion]);

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={imgComplete} alt="" />
        <h2>Quiz Completed!</h2>
        <ol>
          {QUESTION.map((item, index) => (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{item.text}</p>
              <p className="user-answer">{userAnswers[index].answer}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <section id="quiz">
      <div id="question">
        <ProgressBar
          key={activeQuestion}
          onTimeout={handleTimeout}
          timeout={5000}
        />
        <h2>{QUESTION[activeQuestion].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li className="answer" key={answer}>
              <button
                onClick={() => handleSelectAnswers(answer)}
                className={buttonClass}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Quiz;
