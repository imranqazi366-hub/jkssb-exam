import { useState, useEffect } from "react";

// ⏱ Total time (2 hours)
const TOTAL_TIME = 120 * 60;

function App() {

  // 👉 TERA DATA (short demo — tu apna pura paste kar)
  const questions = [
    {
      q: "India ki capital kya hai?",
      opts: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      ans: 0
    },
    {
      q: "2 + 2 = ?",
      opts: ["3", "4", "5", "6"],
      ans: 1
    }
  ];

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

  // ⏱ Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <h3>⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}</h3>

      <h2>{questions[current].q}</h2>

      {questions[current].opts.map((opt, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button
            onClick={() => handleAnswer(index)}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            {opt}
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
