import { useState, useEffect } from "react";

// ⏱ Timer (2 hours)
const TOTAL_TIME = 120 * 60;

// 👉 TERA DATA IMPORT (same file me hona chahiye)
const sets = {
  2: {
    qs: [] // ⚠️ yahan apna FULL data paste kar (jo tu ne bheja tha)
  }
};

function App() {

  // 👉 Set select (Set 2 use kar rahe)
  const questions = sets[2].qs;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  // ⏱ TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ⏱ Time up
  if (timeLeft <= 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>⏰ Time Up!</h1>
        <h2>Score: {score}</h2>
      </div>
    );
  }

  // 👉 Answer handle
  const handleAnswer = (index) => {
    if (index === questions[current].ans) {
      setScore(score + 1);
    }
    setCurrent(current + 1);
  };

  // ✅ Test Complete
  if (current >= questions.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>✅ Test Complete</h1>
        <h2>Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  // ⏱ Time format
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h2>JKSSB Exam App</h2>

      <h3>
        ⏱ {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </h3>

      <h4>
        Question {current + 1} / {questions.length}
      </h4>

      <h2>{questions[current].q}</h2>

      {questions[current].opts.map((opt, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button
            onClick={() => handleAnswer(index)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
