
import { useState, useEffect } from "react";

// ⏱ 2 hours timer
const TOTAL_TIME = 120 * 60;

// 🔥 120 QUESTIONS
const questions = Array.from({ length: 120 }, (_, i) => ({
  q: `Question ${i + 1}: JKSSB sample question?`,
  opts: ["Option A", "Option B", "Option C", "Option D"],
  ans: i % 4
}));

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selected, setSelected] = useState(null);

  // ⏱ TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const handleAnswer = (i) => {
    setSelected(i);

    if (i === questions[current].ans) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelected(null);
      setCurrent(c => c + 1);
    }, 500);
  };

  // 🏁 RESULT SCREEN
  if (current >= questions.length || timeLeft <= 0) {
    return (
      <div style={styles.result}>
        <h1>🎉 Test Complete</h1>
        <h2>{score} / {questions.length}</h2>
        <p>Performance: {Math.round((score / questions.length) * 100)}%</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>JKSSB Mock Test</h2>
        <h3>⏱ {formatTime(timeLeft)}</h3>
      </div>

      {/* PROGRESS */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${(current / questions.length) * 100}%`
          }}
        />
      </div>

      {/* QUESTION CARD */}
      <div style={styles.card}>
        <h3>Question {current + 1} / {questions.length}</h3>
        <h2>{q.q}</h2>

        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            style={{
              ...styles.option,
              background:
                selected === i
                  ? i === q.ans
                    ? "#4CAF50"
                    : "#f44336"
                  : "#fff"
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ⏱ FORMAT TIME
function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// 🎨 STYLES (TOP UI LOOK)
const styles = {
  container: {
    fontFamily: "Arial",
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1e88e5",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "10px"
  },

  progressBar: {
    height: "10px",
    background: "#ddd",
    borderRadius: "5px",
    margin: "15px 0"
  },

  progress: {
    height: "100%",
    background: "#1e88e5",
    borderRadius: "5px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  option: {
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "16px"
  },

  result: {
    textAlign: "center",
    marginTop: "100px"
  }
};
