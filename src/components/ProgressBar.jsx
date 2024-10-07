import { useState, useEffect } from "react";

function ProgressBar({ onTimeout, timeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout(true);
    }, timeout);
    // console.log("Timer set");

    return () => {
      // console.log("Timer cleanup");
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);

    return () => {
      setTimeRemaining(timeout);
      clearInterval(interval);
    };
  }, []);

  return <progress value={timeRemaining} max={timeout} />;
}

export default ProgressBar;
