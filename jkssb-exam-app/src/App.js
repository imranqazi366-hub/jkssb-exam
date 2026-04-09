
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_QUESTIONS = 120;
const TIME_LIMIT = 120 * 60; // 120 Minutes

// --- THE QUESTION ENGINE ---
// I have structured this to handle the full 120 questions. 
// You can keep adding your 120 questions into this array.
const questions = [
  // GK Section (1-30)
  { id: 1, sec: "GK", q: "The Martand Sun Temple was built by which ruler of the Karkota Dynasty?", options: ["Avantivarman", "Lalitaditya Muktapida", "Durlabhavardhana", "Jayapida"], ans: 1, ex: "Built in the 8th century by Lalitaditya Muktapida." },
  { id: 2, sec: "GK", q: "Which article of the Indian Constitution was associated with the special status of J&K?", options: ["Art 35A", "Art 370", "Art 371", "Art 324"], ans: 1, ex: "Article 370 was abrogated in August 2019." },
  { id: 3, sec: "GK", q: "Who was the last ruling Maharaja of the princely state of Jammu and Kashmir?", options: ["Gulab Singh", "Ranbir Singh", "Hari Singh", "Pratap Singh"], ans: 2, ex: "Maharaja Hari Singh signed the Instrument of Accession in 1947." },
  // ... (Add your remaining 117 questions here following the exact same format)
  { id: 120, sec: "Computers", q: "Which of the following is a permanent storage device?", options: ["RAM", "Cache", "Hard Disk", "Registers"], ans: 2, ex: "Hard Disks provide non-volatile, permanent storage." }
];

export default function PremiumExam() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-submit on time out
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted]);

  const handleSelect = (optionIdx) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  };

  const calculateScore = () => {
    return questions.reduce((score, q, i) => (answers[i] === q.ans ? score + 1 : score), 0);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // --- STYLES (Apple Minimalist) ---
  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#fbfbfd", fontFamily: "-apple-system, sans-serif", color: "#1d1d1f" },
    nav: { height: "64px", borderBottom: "1px solid #d2d2d7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 },
    main: { maxWidth: "1100px", margin: "40px auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", padding: "0 20px" },
    questionCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "48px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" },
    optionBtn: (isSelected) => ({
      width: "100%", padding: "20px 24px", margin: "8px 0", borderRadius: "14px", border: isSelected ? "2px solid #0071e3" : "1px solid #d2d2d7",
      backgroundColor: isSelected ? "#f5faff" : "#fff", textAlign: "left", fontSize: "17px", cursor: "pointer", transition: "all 0.2s ease"
    }),
    sidebar: { backgroundColor: "#fff", borderRadius: "24px", padding: "24px", height: "fit-content", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" },
    pill: { backgroundColor: "#f5f5f7", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", color: "#86868b" }
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div style={{ ...styles.container, textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "700" }}>Performance Report.</h1>
        <div style={{ fontSize: "80px", fontWeight: "700", color: "#0071e3", margin: "20px 0" }}>{score}<span style={{ fontSize: "24px", color: "#86868b" }}>/120</span></div>
        <button onClick={() => window.location.reload()} style={{ backgroundColor: "#1d1d1f", color: "#fff", padding: "16px 32px", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "600" }}>Retake Examination</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={{ fontWeight: "700", fontSize: "20px" }}>FAA Portal</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div style={{ color: timeLeft < 300 ? "#ff3b30" : "#1d1d1f", fontWeight: "600" }}>{formatTime(timeLeft)}</div>
          <button onClick={() => {if(window.confirm("Submit test?")) setIsSubmitted(true)}} style={{ backgroundColor: "#0071e3", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "18px", fontWeight: "600", cursor: "pointer" }}>Submit</button>
        </div>
      </nav>

      <main style={styles.main}>
        <div>
          <div style={styles.questionCard}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={styles.pill}>{questions[currentIdx].sec}</span>
              <span style={{ color: "#86868b", fontSize: "14px" }}>Question {currentIdx + 1} of 120</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "600", lineHeight: "1.25", marginBottom: "40px" }}>{questions[currentIdx].q}</h2>
            
            <div style={{ marginBottom: "40px" }}>
              {questions[currentIdx].options.map((opt, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={styles.optionBtn(answers[currentIdx] === i)}>
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} style={{ background: "none", border: "none", color: currentIdx === 0 ? "#d2d2d7" : "#0071e3", fontSize: "17px", cursor: "pointer" }}>Previous</button>
              <button onClick={() => setCurrentIdx(prev => Math.min(prev + 1, 119))} style={{ backgroundColor: "#f5f5f7", border: "none", padding: "12px 32px", borderRadius: "12px", fontSize: "17px", fontWeight: "600", cursor: "pointer" }}>Next</button>
            </div>
          </div>
        </div>

        <aside style={styles.sidebar}>
          <h3 style={{ fontSize: "17px", marginBottom: "20px" }}>Overview</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxHeight: "400px", overflowY: "auto", padding: "4px" }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  height: "36px", width: "100%", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600",
                  backgroundColor: currentIdx === i ? "#1d1d1f" : (answers[i] !== undefined ? "#e8e8ed" : "#f5f5f7"),
                  color: currentIdx === i ? "#fff" : "#1d1d1f"
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "24px", borderTop: "1px solid #f5f5f7", paddingTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
              <span>Completion</span>
              <span>{Math.round((Object.keys(answers).length / 120) * 100)}%</span>
            </div>
            <div style={{ height: "6px", width: "100%", backgroundColor: "#f5f5f7", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", backgroundColor: "#0071e3", width: `${(Object.keys(answers).length / 120) * 100}%`, transition: "width 0.3s ease" }}></div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
