import { useState, useCallback, useRef } from "react";
import QUESTION from "../question.js";
import imgComplete from "../assets/quiz-complete.png";
import QuizQuestion from "./QuizQuestion.jsx";

function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsOver = activeQuestion === QUESTION.length;

  console.log(activeQuestion);

  const handleSelectAnswers = useCallback(
    (selected) => {
      if (quizIsOver) {
        return;
      }
      setAnswerState("answered");
      setUserAnswers((prev) => [...prev, selected]);

      setTimeout(() => {
        if (QUESTION[activeQuestion].answers[0] === selected) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestion]
  );

  const handleSkipAnswers = useCallback(() => {
    handleSelectAnswers(null);
  }, []);

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
              <p className="user-answer">{userAnswers[index]}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <section id="quiz">
      <QuizQuestion
        key={activeQuestion}
        question={QUESTION[activeQuestion]}
        selectedAnswer={userAnswers[activeQuestion]}
        answerState={answerState}
        onTimeout={handleSkipAnswers}
        onSelectAnswer={handleSelectAnswers}
      />
    </section>
  );
}
export default Quiz;
