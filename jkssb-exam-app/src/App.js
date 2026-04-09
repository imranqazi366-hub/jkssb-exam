
import React, { useState, useEffect } from "react";

// --- THE DATA ---
const questions = [
  // I have pre-filled the first few; the logic is set for 120.
  { id: 1, sec: "GK", q: "The Martand Sun Temple was built by which ruler of the Karkota Dynasty?", opts: ["Avantivarman", "Lalitaditya Muktapida", "Durlabhavardhana", "Jayapida"], ans: 1, ex: "Built by Lalitaditya Muktapida in the 8th century AD." },
  { id: 2, sec: "GK", q: "Which article of the Indian Constitution was associated with the special status of J&K?", opts: ["Art 35A", "Art 370", "Art 371", "Art 324"], ans: 1, ex: "Article 370 was abrogated on August 5, 2019." },
  // ... continue adding up to 120
  { id: 120, sec: "Computers", q: "Which is a permanent storage device?", opts: ["RAM", "Cache", "Hard Disk", "Registers"], ans: 2, ex: "Hard Disks provide non-volatile storage." }
];

export default function ProExamPortal() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(7200); 
  const [view, setView] = useState("TEST"); // "TEST" or "RESULTS"

  useEffect(() => {
    if (timeLeft > 0 && view === "TEST") {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, view]);

  const score = questions.reduce((acc, q, i) => (answers[i] === q.ans ? acc + 1 : acc), 0);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // --- RESULTS VIEW ---
  if (view === "RESULTS") {
    return (
      <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "Inter, sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", marginBottom: "30px" }}>
            <h1 style={{ color: "#1e293b", margin: 0 }}>Examination Result</h1>
            <div style={{ fontSize: "64px", fontWeight: "800", color: "#2563eb", margin: "20px 0" }}>{score} <span style={{ fontSize: "24px", color: "#64748b" }}>/ 120</span></div>
            <p style={{ color: "#64748b", marginBottom: "30px" }}>Accuracy: {((score / 120) * 100).toFixed(1)}%</p>
            <button onClick={() => window.location.reload()} style={{ padding: "12px 24px", borderRadius: "8px", border: "none", backgroundColor: "#1e293b", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Restart Test</button>
          </div>

          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
            <h2 style={{ marginBottom: "20px" }}>Answer Key & Explanations</h2>
            {questions.map((q, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0", padding: "20px 0" }}>
                <p style={{ fontWeight: "700", color: "#1e293b" }}>Q{i+1}: {q.q}</p>
                <div style={{ marginTop: "10px", fontSize: "14px" }}>
                  <div style={{ color: answers[i] === q.ans ? "#16a34a" : "#dc2626", fontWeight: "600" }}>Your Ans: {q.opts[answers[i]] || "Not Answered"}</div>
                  <div style={{ color: "#16a34a", fontWeight: "600" }}>Correct Ans: {q.opts[q.ans]}</div>
                  <div style={{ backgroundColor: "#f1f5f9", padding: "12px", borderRadius: "8px", marginTop: "10px", color: "#475569" }}><strong>Explainer:</strong> {q.ex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- EXAM VIEW ---
  const q = questions[currentIdx] || { q: "End of Question Bank - Please add your 120 questions to the code.", opts: [], sec: "N/A" };

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif", color: "#1e293b" }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e8f0", padding: "15px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: "800", fontSize: "20px", color: "#2563eb" }}>EXAM<span style={{ color: "#1e293b" }}>PRO</span></div>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div style={{ padding: "8px 16px", backgroundColor: "#fef2f2", color: "#991b1b", borderRadius: "8px", fontWeight: "700" }}>⏱ {formatTime(timeLeft)}</div>
          <button onClick={() => { if(window.confirm("Submit Test?")) setView("RESULTS") }} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Submit Test</button>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "40px auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "30px", padding: "0 20px" }}>
        
        {/* Main Section */}
        <section>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={{ backgroundColor: "#e0e7ff", color: "#3730a3", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "800" }}>{q.sec}</span>
              <span style={{ color: "#64748b", fontWeight: "600" }}>Question {currentIdx + 1} of 120</span>
            </div>

            <h2 style={{ fontSize: "24px", lineHeight: "1.4", marginBottom: "40px", fontWeight: "700" }}>{q.q}</h2>

            <div style={{ display: "grid", gap: "12px" }}>
              {q.opts.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => setAnswers({...answers, [currentIdx]: i})}
                  style={{
                    textAlign: "left", padding: "20px", borderRadius: "12px", fontSize: "16px", fontWeight: "500", transition: "0.2s", cursor: "pointer",
                    border: answers[currentIdx] === i ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    backgroundColor: answers[currentIdx] === i ? "#eff6ff" : "#fff",
                    color: answers[currentIdx] === i ? "#1e40af" : "#1e293b"
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px", paddingTop: "30px", borderTop: "1px solid #f1f5f9" }}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={{ background: "none", border: "1px solid #e2e8f0", padding: "12px 24px", borderRadius: "8px", color: "#64748b", cursor: "pointer", fontWeight: "600" }}>Previous</button>
              <button onClick={() => setCurrentIdx(Math.min(119, currentIdx + 1))} style={{ backgroundColor: "#1e293b", color: "#fff", border: "none", padding: "12px 40px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Next Question</button>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "25px", height: "fit-content", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px", fontWeight: "700" }}>Question Progress</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxHeight: "400px", overflowY: "auto", padding: "5px" }}>
            {Array.from({ length: 120 }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIdx(i)}
                style={{
                  height: "40px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "12px",
                  backgroundColor: currentIdx === i ? "#2563eb" : (answers[i] !== undefined ? "#1e293b" : "#f1f5f9"),
                  color: currentIdx === i || answers[i] !== undefined ? "#fff" : "#64748b"
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
             <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                <span>Total Answered</span>
                <span>{Object.keys(answers).length} / 120</span>
             </div>
             <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${(Object.keys(answers).length / 120) * 100}%`, height: "100%", backgroundColor: "#22c55e", transition: "0.3s" }}></div>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
