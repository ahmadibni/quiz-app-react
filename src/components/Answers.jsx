import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerState, onSelectAnswer }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let buttonClass = null;
        let buttonDisabled = false;

        if (answerState === "answered" && isSelected) {
          buttonClass = "selected";
          buttonDisabled = true;
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          buttonDisabled = true;
          buttonClass = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelectAnswer(answer)}
              className={buttonClass}
              disabled={buttonDisabled}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
