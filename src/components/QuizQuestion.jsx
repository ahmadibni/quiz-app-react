import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import QUESTION from "../question.js";

function QuizQuestion({ myIndex, onSkip, onSelectAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isTrue: null,
  });

  let timeout = 2000;
  if (answer.selectedAnswer) {
    timeout = 1000;
  }
  if (answer.isTrue !== null) {
    timeout = 2000;
  }

  function handleSelectAnswer(selected) {
    setAnswer({
      selectedAnswer: selected,
      isTrue: null,
    });

    setTimeout(() => {
      const isTrue = QUESTION[myIndex].answers[0] === selected;

      setAnswer({
        selectedAnswer: selected,
        isTrue: isTrue,
      });

      setTimeout(() => {
        onSelectAnswer(selected);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isTrue !== null) {
    answerState = answer.isTrue ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <ProgressBar
        key={timeout}
        onTimeout={answer.selectedAnswer === "" ? onSkip : null}
        timeout={timeout}
        mode={answerState}
      />
      <h2>{QUESTION[myIndex].text}</h2>
      <Answers
        answers={QUESTION[myIndex].answers}
        userAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}

export default QuizQuestion;
