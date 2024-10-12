import { useState, useCallback, useRef } from "react";
import QuizQuestion from "./QuizQuestion.jsx";
import QUESTION from "../question.js";
import Summary from "./Summary.jsx";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;

  const quizIsOver = activeQuestion === QUESTION.length;

  const handleSetAnswers = useCallback((selectedAnswer) => {
    if (quizIsOver) {
      return;
    }
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  const handleSkipAnswers = useCallback(() => {
    handleSetAnswers(null);
  }, [handleSetAnswers]);

  if (quizIsOver) {
    return <Summary userAnswers={userAnswers} />;
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
