import { useState, useCallback, useRef } from "react";
import imgComplete from "../assets/quiz-complete.png";
import QuizQuestion from "./QuizQuestion.jsx";
import QUESTION from "../question.js";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;

  const quizIsOver = activeQuestion === QUESTION.length;

  const handleSetAnswers = useCallback((selected) => {
    if (quizIsOver) {
      return;
    }
    setUserAnswers((prev) => [...prev, selected]);
  }, []);

  const handleSkipAnswers = useCallback(() => {
    handleSetAnswers(null);
  }, [handleSetAnswers]);

  console.log(activeQuestion);

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
        myIndex={activeQuestion}
        onSkip={handleSkipAnswers}
        onSelectAnswer={handleSetAnswers}
      />
    </section>
  );
}
export default Quiz;
