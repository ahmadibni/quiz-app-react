import { useRef } from "react";

function Answers({ answers, userAnswer, answerState, onSelectAnswer }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = userAnswer === answer;
        let buttonClass = null;

        if (answerState === "answered" && isSelected) {
          buttonClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          buttonClass = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelectAnswer(answer)}
              className={buttonClass}
              disabled={answerState !== ""}
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
