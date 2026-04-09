import { useState, useEffect } from "react";

const TOTAL_TIME = 120 * 60;

// 🔥 120 QUESTIONS AUTO GENERATE
const questions = Array.from({ length: 120 }, (_, i) => ({
  n: i + 1,
  q: `Question ${i + 1}: Sample question yaha likha hai?`,
  opts: ["Option A", "Option B", "Option C", "Option D"],
  ans: Math.floor(Math.random() * 4)
}));

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selected, setSelected] = useState(null);

  // ⏱ TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (index) => {
    setSelected(index);

    if (index === questions[current].ans) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelected(null);
      setCurrent(current + 1);
    }, 500);
  };

  // 🏁 TEST COMPLETE
  if (current >= questions.length || timeLeft <= 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>✅ Test Complete</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ padding: 20 }}>
      <h2>⏱ Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h2>
      <h3>Question {current + 1} / {questions.length}</h3>

      <h2>{q.q}</h2>

      {q.opts.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(i)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            background:
              selected === i
                ? i === q.ans
                  ? "green"
                  : "red"
                : "#ddd"
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
