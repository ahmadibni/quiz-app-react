import imgComplete from "../assets/quiz-complete.png";
import QUESTION from "../question.js";

function Summary({ userAnswers }) {
  let skippedAnswers = 0;
  let correctAnswers = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === null) {
      skippedAnswers++;
    } else if (answer === QUESTION[index].answers[0]) {
      correctAnswers++;
    }
  });

  const skippedAnswersPercentage = Math.round(
    (skippedAnswers / QUESTION.length) * 100
  );
  const correctAnswersPercentage = Math.round(
    (correctAnswers / QUESTION.length) * 100
  );
  const wrongAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage;

  return (
    <div id="summary">
      <img src={imgComplete} alt="Trophy Icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage}%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{wrongAnswersPercentage}%</span>
          <span className="text">wrong</span>
        </p>
      </div>
      <ol>
        {QUESTION.map((item, index) => {
          let cssClass = "user-answer";
          if (userAnswers[index] === null) {
            cssClass += " skipped";
          } else if (userAnswers[index] === QUESTION[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{item.text}</p>
              <p className={cssClass}>{userAnswers[index] ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Summary;
