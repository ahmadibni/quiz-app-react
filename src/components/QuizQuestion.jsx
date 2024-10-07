import ProgressBar from "./ProgressBar";
import Answers from "./Answers";

function QuizQuestion({ question, selectedAnswer, answerState, onTimeout, onSelectAnswer }) {
  return (
    <div id="question">
      <ProgressBar onTimeout={onTimeout} timeout={5000} />
      <h2>{question.text}</h2>
      <Answers
        answers={question.answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelectAnswer={onSelectAnswer}
      />
    </div>
  );
}

export default QuizQuestion;
