
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_TIME = 120 * 60;
const SC = { 
  GK: "#1e3a5f", Accounts: "#0f766e", English: "#c2410c", 
  Statistics: "#15803d", Mathematics: "#6d28d9", Economics: "#0369a1", 
  Science: "#b45309", Computers: "#be185d" 
};

// Add your full question array here (using the one from previous message)
const quizQuestions = [
    {n:1,s:"GK",q:"The Martand Sun Temple, one of the finest examples of ancient Kashmiri architecture, was built by?",opts:["Avantivarman","Lalitaditya Muktapida","Emperor Kanishka","Sultan Sikandar"],ans:1,e:"Martand Sun Temple built by Lalitaditya Muktapida of Karkota dynasty in 8th century AD, in Anantnag."},
    {n:2,s:"GK",q:"Which constitutional article was used by Parliament to grant special status to J&K (now abrogated)?",opts:["Article 356","Article 370","Article 371","Article 360"],ans:1,e:"Article 370 granted special status to J&K. Abrogated on 5 August 2019."},
    // ... paste all other questions here ...
    {n:106,s:"Science",q:"The process by which plants manufacture their own food using sunlight, water and CO₂ is?",opts:["Respiration","Transpiration","Photosynthesis","Osmosis"],ans:2,e:"Photosynthesis is the process plants use to convert light energy into chemical energy."}
];

export default function QuizApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores { index: selectedOption }
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx];
  const hasAnswered = answers[currentIdx] !== undefined;

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isFinished]);

  const handleSelect = (idx) => {
    if (hasAnswered) return; // Prevent changing answer after seeing result
    setAnswers({ ...answers, [currentIdx]: idx });
  };

  const progress = (Object.keys(answers).length / quizQuestions.length) * 100;

  // --- STYLES ---
  const theme = {
    bg: "#0d1117",
    card: "#161b22",
    neon: "#00ff41",
    text: "#c9d1d9",
    border: "#30363d",
    wrong: "#ff4444",
    correct: "#00ff41"
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: "100vh", fontFamily: "sans-serif", padding: "20px" }}>
      
      {/* Top Navigation Bar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${theme.border}`, paddingBottom: "10px" }}>
        <h2 style={{ color: theme.neon, margin: 0 }}>JKSSB Exam Portal</h2>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: theme.neon }}>{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
          <div style={{ fontSize: "0.8rem", color: "#8b949e" }}>REMAINING TIME</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: "100%", height: "4px", backgroundColor: "#30363d", margin: "20px 0" }}>
        <div style={{ width: `${progress}%`, height: "100%", backgroundColor: theme.neon, transition: "width 0.4s ease", boxShadow: `0 0 10px ${theme.neon}` }}></div>
      </div>

      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", gap: "20px", flexDirection: window.innerWidth < 800 ? "column" : "row" }}>
        
        {/* Main Quiz Area */}
        <div style={{ flex: 3 }}>
          <div style={{ backgroundColor: theme.card, padding: "30px", borderRadius: "12px", border: `1px solid ${theme.border}` }}>
            <span style={{ color: theme.neon, fontSize: "0.9rem", fontWeight: "bold", letterSpacing: "1px" }}>{currentQ.s.toUpperCase()} SECTION</span>
            <h3 style={{ fontSize: "1.4rem", marginTop: "10px", lineHeight: "1.4" }}>{currentQ.q}</h3>
            
            <div style={{ marginTop: "30px" }}>
              {currentQ.opts.map((opt, i) => {
                let btnBg = "transparent";
                let btnBorder = theme.border;
                let textColor = theme.text;

                if (hasAnswered) {
                  if (i === currentQ.ans) {
                    btnBg = "rgba(0, 255, 65, 0.1)";
                    btnBorder = theme.correct;
                    textColor = theme.correct;
                  } else if (i === answers[currentIdx]) {
                    btnBg = "rgba(255, 68, 68, 0.1)";
                    btnBorder = theme.wrong;
                    textColor = theme.wrong;
                  }
                } else {
                  btnBg = "#0d1117";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    style={{
                      display: "block", width: "100%", padding: "15px", margin: "12px 0",
                      textAlign: "left", borderRadius: "8px", cursor: hasAnswered ? "default" : "pointer",
                      backgroundColor: btnBg, color: textColor, border: `1px solid ${btnBorder}`,
                      fontSize: "1rem", fontWeight: "500", transition: "all 0.2s"
                    }}
                  >
                    <span style={{ marginRight: "15px", opacity: 0.5 }}>{String.fromCharCode(65 + i)}</span> {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Section */}
            {hasAnswered && (
              <div style={{ marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: "#0d1117", borderLeft: `4px solid ${theme.neon}` }}>
                <strong style={{ color: theme.neon }}>Explanation:</strong>
                <p style={{ margin: "10px 0 0", fontSize: "0.95rem", color: "#8b949e" }}>{currentQ.e}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
              <button 
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                style={{ background: "none", color: theme.text, border: "none", cursor: "pointer" }}
              >
                ← Previous
              </button>
              <button 
                onClick={() => setCurrentIdx(Math.min(quizQuestions.length - 1, currentIdx + 1))}
                style={{ backgroundColor: theme.neon, color: "#000", border: "none", padding: "10px 25px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                Next Question →
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Question Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: theme.card, padding: "20px", borderRadius: "12px", border: `1px solid ${theme.border}` }}>
            <h4 style={{ margin: "0 0 15px 0" }}>Question Map</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    height: "35px", display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "4px", fontSize: "0.8rem", cursor: "pointer",
                    border: `1px solid ${currentIdx === i ? theme.neon : theme.border}`,
                    backgroundColor: answers[i] !== undefined ? (quizQuestions[i].ans === answers[i] ? "rgba(0, 255, 65, 0.2)" : "rgba(255, 68, 68, 0.2)") : "transparent",
                    color: currentIdx === i ? theme.neon : theme.text
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <button 
                onClick={() => setIsFinished(true)}
                style={{ width: "100%", marginTop: "20px", padding: "12px", backgroundColor: "transparent", border: `1px solid ${theme.wrong}`, color: theme.wrong, borderRadius: "6px", cursor: "pointer" }}
            >
                End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
