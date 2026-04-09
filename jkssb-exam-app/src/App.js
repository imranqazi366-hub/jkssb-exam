
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_TIME = 120 * 60; 
const SECTIONS = ["GK", "Accounts", "English", "Statistics", "Mathematics", "Economics", "Science", "Computers"];

// --- FULL QUESTION DATA ---
// Ensure all 120 questions are included in this array
const quizQuestions = [
    {n:1,s:"GK",q:"The Martand Sun Temple, a masterpiece of ancient Kashmiri architecture, was commissioned by which ruler?",opts:["Avantivarman","Lalitaditya Muktapida","Kanishka","Sultan Sikandar"],ans:1,e:"The temple was built by Lalitaditya Muktapida of the Karkota dynasty during the 8th century AD."},
    {n:2,s:"GK",q:"Under the J&K Reorganisation Act 2019, which date was appointed for the formation of the new Union Territories?",opts:["5 August 2019","15 August 2019","31 October 2019","1 November 2019"],ans:2,e:"The Act came into effect on 31 October 2019, coinciding with National Unity Day."},
    // ... Add all remaining 118 questions here following the same format ...
    {n:120,s:"Computers",q:"Which protocol is primarily used for securely transmitting web pages over the internet?",opts:["FTP","HTTP","HTTPS","SMTP"],ans:2,e:"HTTPS (Hypertext Transfer Protocol Secure) encrypts data for secure communication."}
];

export default function AppleExamPortal() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [viewMode, setViewMode] = useState("TEST"); // TEST, REVIEW, or RESULT

  const currentQ = quizQuestions[currentIdx];
  const progress = (Object.keys(userAnswers).length / quizQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && viewMode === "TEST") {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, viewMode]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    if (window.confirm("Review your answers before submitting. Are you sure you want to end the test?")) {
      setViewMode("RESULT");
    }
  };

  // --- APPLE DESIGN SYSTEM ---
  const styles = {
    wrapper: { backgroundColor: "#F5F5F7", color: "#1D1D1F", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", padding: "0 20px" },
    nav: { maxWidth: "1000px", margin: "0 auto", padding: "30px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },
    card: { backgroundColor: "#FFFFFF", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.04)", padding: "40px", maxWidth: "800px", margin: "0 auto" },
    option: (isSelected) => ({
      width: "100%", padding: "20px", margin: "10px 0", borderRadius: "12px", border: isSelected ? "2px solid #0071E3" : "1px solid #D2D2D7",
      backgroundColor: isSelected ? "#F5Faff" : "#FFFFFF", cursor: "pointer", fontSize: "17px", textAlign: "left", transition: "all 0.3s ease"
    }),
    btnPrimary: { backgroundColor: "#0071E3", color: "#FFF", border: "none", padding: "12px 25px", borderRadius: "22px", fontWeight: "500", cursor: "pointer", fontSize: "14px" },
    btnSecondary: { backgroundColor: "transparent", color: "#0071E3", border: "none", padding: "12px 25px", cursor: "pointer", fontWeight: "500" },
    dot: (status) => ({
      width: "35px", height: "35px", borderRadius: "50%", border: "none", fontSize: "12px", cursor: "pointer",
      backgroundColor: status === "active" ? "#1D1D1F" : status === "done" ? "#D2D2D7" : "#E8E8ED",
      color: status === "active" ? "#FFF" : "#1D1D1F"
    })
  };

  if (viewMode === "RESULT") {
    const score = quizQuestions.reduce((acc, q, i) => acc + (userAnswers[i] === q.ans ? 1 : 0), 0);
    return (
      <div style={styles.wrapper}>
        <div style={{ ...styles.card, marginTop: "100px", textAlign: "center" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "600" }}>Your Result.</h1>
          <p style={{ color: "#86868B", fontSize: "21px" }}>You scored {score} out of {quizQuestions.length}</p>
          <div style={{ height: "2px", backgroundColor: "#F5F5F7", margin: "40px 0" }}></div>
          <button onClick={() => window.location.reload()} style={styles.btnPrimary}>Retake Exam</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div>
          <span style={{ fontWeight: "600", fontSize: "21px" }}>JKSSB Exam</span>
          <div style={{ fontSize: "12px", color: "#86868B" }}>FINANCE ACCOUNT ASSISTANT</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "18px", fontWeight: "500", color: timeLeft < 300 ? "#FF3B30" : "#1D1D1F" }}>{formatTime(timeLeft)}</div>
          <div style={{ fontSize: "10px", color: "#86868B", letterSpacing: "1px" }}>TIME REMAINING</div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 280px", gap: "40px" }}>
        
        {/* Main Exam Area */}
        <main>
          <div style={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#86868B", fontSize: "12px", marginBottom: "20px", fontWeight: "600" }}>
              <span>SECTION: {currentQ.s}</span>
              <span>QUESTION {currentIdx + 1} OF {quizQuestions.length}</span>
            </div>
            
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px", lineHeight: "1.3" }}>{currentQ.q}</h2>

            <div style={{ marginBottom: "40px" }}>
              {currentQ.opts.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => setUserAnswers({...userAnswers, [currentIdx]: i})} 
                  style={styles.option(userAnswers[currentIdx] === i)}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={styles.btnSecondary}>Back</button>
              <div>
                {currentIdx < quizQuestions.length - 1 ? (
                  <button onClick={() => setCurrentIdx(currentIdx + 1)} style={styles.btnPrimary}>Continue</button>
                ) : (
                  <button onClick={handleFinish} style={{ ...styles.btnPrimary, backgroundColor: "#34C759" }}>Finish Test</button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Status Sidebar */}
        <aside>
          <div style={{ ...styles.card, padding: "20px" }}>
            <h4 style={{ margin: "0 0 20px 0", fontSize: "14px" }}>Overview</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {quizQuestions.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIdx(i)}
                  style={styles.dot(currentIdx === i ? "active" : userAnswers[i] !== undefined ? "done" : "idle")}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: "30px", borderTop: "1px solid #F5F5F7", paddingTop: "20px" }}>
                <div style={{ fontSize: "12px", color: "#86868B", marginBottom: "10px" }}>Completed: {Math.round(progress)}%</div>
                <div style={{ width: "100%", height: "4px", backgroundColor: "#F5F5F7", borderRadius: "2px" }}>
                    <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#34C759", borderRadius: "2px", transition: "width 0.5s ease" }}></div>
                </div>
            </div>

            <button onClick={handleFinish} style={{ width: "100%", marginTop: "30px", backgroundColor: "transparent", color: "#FF3B30", border: "1px solid #FF3B30", borderRadius: "20px", padding: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                End Examination
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
