import headerImage from "../assets/quiz-logo.png";

function Header() {
  return (
    <header>
      <img src={headerImage} alt="" />
      <h1>React Quiz</h1>
    </header>
  );
}

export default Header;
