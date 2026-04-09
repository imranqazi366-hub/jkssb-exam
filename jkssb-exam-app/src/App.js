import React, { useState, useEffect } from "react";

// --- CONFIGURATION & STYLES ---
const TOTAL_TIME = 120 * 60; // 120 minutes
const SC = { 
  GK: "#1e3a5f", Accounts: "#0f766e", English: "#c2410c", 
  Statistics: "#15803d", Mathematics: "#6d28d9", Economics: "#0369a1", 
  Science: "#b45309", Computers: "#be185d" 
};

const sets = {
  2: {
    title: "Set 2 - JKSSB FAA Practice",
    qs: [
      { n: 1, s: "GK", q: "The Martand Sun Temple, one of the finest examples of ancient Kashmiri architecture, was built by?", opts: ["Avantivarman", "Lalitaditya Muktapida", "Emperor Kanishka", "Sultan Sikandar"], ans: 1, e: "Martand Sun Temple built by Lalitaditya Muktapida of Karkota dynasty in 8th century AD, in Anantnag." },
      { n: 2, s: "GK", q: "Which constitutional article was used by Parliament to grant special status to J&K (now abrogated)?", opts: ["Article 356", "Article 370", "Article 371", "Article 360"], ans: 1, e: "Article 370 granted special status to J&K. Abrogated on 5 August 2019." },
      { n: 3, s: "GK", q: "The first Dogra ruler to consolidate Jammu, Kashmir and Ladakh under one administration was?", opts: ["Ranjit Dev", "Ranbir Singh", "Gulab Singh", "Pratap Singh"], ans: 2, e: "Maharaja Gulab Singh unified Jammu, Kashmir and Ladakh under Treaty of Amritsar 1846." },
      { n: 4, s: "GK", q: "Burzahom, one of the earliest archaeological sites in Kashmir, is known for?", opts: ["Mughal garden architecture", "Neolithic pit-dwelling civilisation", "Buddhist rock-cut temples", "Dogra-era fortifications"], ans: 1, e: "Burzahom (near Srinagar) = Neolithic site with underground pit dwellings, dating back ~3000 BCE." },
      { n: 5, s: "GK", q: "Which among the following rivers does NOT originate in Jammu & Kashmir?", opts: ["Jhelum", "Chenab", "Ravi", "Ganga"], ans: 3, e: "Ganga originates in Uttarakhand (Gangotri glacier). Jhelum, Chenab, Ravi originate in J&K/Himachal." },
      { n: 6, s: "GK", q: "The J&K Reorganisation Act, 2019 bifurcated the state into two Union Territories effective from?", opts: ["5 August 2019", "15 August 2019", "31 October 2019", "1 November 2019"], ans: 2, e: "Both UTs — J&K (with legislature) and Ladakh (without legislature) — came into being on 31 October 2019." },
      { n: 7, s: "GK", q: "Under the J&K Reorganisation Act 2019, how many seats does the J&K Legislative Assembly have?", opts: ["107", "111", "114", "120"], ans: 2, e: "Seats increased from 107 to 114 (including 24 reserved for Pakistan-occupied Kashmir)." },
      { n: 8, s: "GK", q: "Karan Singh held the constitutional position of Sadr-e-Riyasat of J&K until?", opts: ["1962", "1965", "1968", "1971"], ans: 1, e: "Karan Singh served as Sadr-e-Riyasat from 17 November 1952 to 30 March 1965, then became first Governor." },
      { n: 9, s: "GK", q: "The Sufi saint credited with introducing the Rishi Order in Kashmir was?", opts: ["Shah-i-Hamdan", "Bulbul Shah", "Sheikh Noor-ud-din Wali (Nund Rishi)", "Rasul Mir"], ans: 2, e: "Sheikh Noor-ud-din Wali (Sheikh ul-Alam/Nund Rishi) founded the Rishi Order." },
      { n: 10, s: "GK", q: "The Dogra Art Museum is housed within which complex in Jammu?", opts: ["Bahu Fort", "Amar Mahal", "Mubarak Mandi Complex", "Raghunath Temple"], ans: 2, e: "Dogra Art Museum in Mubarak Mandi complex, Jammu, has over 7,500 antiquities." },
      { n: 31, s: "Accounts", q: "The concept which assumes that a business entity will continue operations for the foreseeable future is called?", opts: ["Matching Concept", "Consistency Concept", "Going Concern Concept", "Accrual Concept"], ans: 2, e: "Going Concern: business assumed to continue indefinitely." },
      { n: 32, s: "Accounts", q: "The Accrual Concept requires that?", opts: ["Transactions be recorded when cash is received", "Revenue be recognised when earned and expense when incurred", "Only cash transactions be recorded", "Financial statements be prepared monthly"], ans: 1, e: "Accrual: revenue when earned, expense when incurred." },
      { n: 61, s: "English", q: "Select the correct sentence:", opts: ["Neither of the students have submitted the assignment.", "Neither of the students has submitted the assignment.", "Neither of the student has submitted the assignment.", "Neither of the students had been submitting the assignment."], ans: 1, e: "'Neither of' = singular subject → singular verb 'has'." },
      { n: 106, s: "Science", q: "The process by which plants manufacture their own food using sunlight, water and CO₂ is?", opts: ["Respiration", "Transpiration", "Photosynthesis", "Osmosis"], ans: 2, e: "Photosynthesis is the process plants use to convert light energy into chemical energy." }
    ]
  }
};

export default function QuizApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const quizData = sets[2];
  const currentQ = quizData.qs[currentIdx];

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelect = (optIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    quizData.qs.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) score++;
    });
    return score;
  };

  // --- CYBERPUNK UI STYLES ---
  const containerStyle = {
    backgroundColor: "#0a0a0a",
    color: "#00ff41", // Neon Green
    fontFamily: "'Courier New', Courier, monospace",
    minHeight: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundColor: "#111",
    border: "2px solid #00ff41",
    boxShadow: "0 0 15px #00ff41",
    borderRadius: "8px",
    maxWidth: "800px",
    width: "100%",
    padding: "20px",
    marginTop: "20px",
  };

  const btnStyle = (active, isCorrect) => ({
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    backgroundColor: isCorrect ? "#064e3b" : active ? "#00ff41" : "#1a1a1a",
    color: active ? "#000" : "#00ff41",
    border: "1px solid #00ff41",
    borderRadius: "4px",
    cursor: isSubmitted ? "default" : "pointer",
    textAlign: "left",
    fontWeight: "bold",
    transition: "0.3s",
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ textShadow: "0 0 10px #00ff41" }}>{quizData.title}</h1>
      <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        TIME REMAINING: {formatTime(timeLeft)}
      </div>

      {!isSubmitted ? (
        <div style={cardStyle}>
          <div style={{ marginBottom: "10px", color: SC[currentQ.s] }}>
            [{currentQ.s}] Question {currentQ.n} of 120
          </div>
          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>{currentQ.q}</p>
          
          {currentQ.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={btnStyle(selectedAnswers[currentIdx] === i)}
            >
              {i + 1}. {opt}
            </button>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button 
              disabled={currentIdx === 0} 
              onClick={() => setCurrentIdx(currentIdx - 1)}
              style={{ padding: "10px", background: "none", color: "#00ff41", border: "1px solid #00ff41" }}
            >
              PREV
            </button>
            
            {currentIdx === quizData.qs.length - 1 ? (
              <button 
                onClick={() => setIsSubmitted(true)}
                style={{ padding: "10px", background: "#00ff41", color: "#000", border: "none" }}
              >
                FINISH QUIZ
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIdx(currentIdx + 1)}
                style={{ padding: "10px", background: "none", color: "#00ff41", border: "1px solid #00ff41" }}
              >
                NEXT
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={cardStyle}>
          <h2>QUIZ TERMINATED</h2>
          <p>Score: {calculateScore()} / {quizData.qs.length}</p>
          <hr style={{ borderColor: "#00ff41" }} />
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {quizData.qs.map((q, idx) => (
              <div key={idx} style={{ padding: "10px", borderBottom: "1px solid #333" }}>
                <p>Q{q.n}: {q.q}</p>
                <p style={{ color: selectedAnswers[idx] === q.ans ? "#00ff41" : "#ff3131" }}>
                  Your Answer: {q.opts[selectedAnswers[idx]] || "Skipped"}
                </p>
                <p style={{ color: "#00ff41" }}>Correct: {q.opts[q.ans]}</p>
                <small style={{ color: "#888" }}>{q.e}</small>
              </div>
            ))}
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: "20px", padding: "10px", width: "100%", background: "#00ff41", color: "#000" }}
          >
            RESTART
          </button>
        </div>
      )}
    </div>
  );
}
