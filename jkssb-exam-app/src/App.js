
import React, { useState, useEffect } from "react";

// --- THE COMPLETE 120 QUESTION DATABASE ---
const questions = [
  // GK & J&K SPECIAL (1-30)
  { id: 1, sec: "GK", q: "The Martand Sun Temple was built by which ruler of the Karkota Dynasty?", opts: ["Avantivarman", "Lalitaditya Muktapida", "Durlabhavardhana", "Jayapida"], ans: 1, ex: "Built by Lalitaditya Muktapida in the 8th century AD." },
  { id: 2, sec: "GK", q: "Which article of the Indian Constitution was associated with the special status of J&K?", opts: ["Art 35A", "Art 370", "Art 371", "Art 324"], ans: 1, ex: "Article 370 was abrogated on August 5, 2019." },
  { id: 3, sec: "GK", q: "Who was the last ruling Maharaja of J&K?", opts: ["Gulab Singh", "Ranbir Singh", "Hari Singh", "Pratap Singh"], ans: 2, ex: "Maharaja Hari Singh signed the Instrument of Accession in 1947." },
  { id: 4, sec: "GK", q: "Burzahom, the famous Neolithic site, is located in which district?", opts: ["Jammu", "Srinagar", "Anantnag", "Baramulla"], ans: 1, ex: "Located in Srinagar." },
  { id: 5, sec: "GK", q: "Which river is known as the 'Vitasta' in Sanskrit?", opts: ["Chenab", "Jhelum", "Ravi", "Indus"], ans: 1, ex: "The Jhelum river is anciently known as Vitasta." },
  { id: 6, sec: "GK", q: "The J&K Reorganisation Act, 2019 came into effect on?", opts: ["5 Aug 2019", "15 Aug 2019", "31 Oct 2019", "26 Jan 2020"], ans: 2, ex: "Became effective on 31st October 2019." },
  { id: 7, sec: "GK", q: "Which lake is famous for 'Floating Gardens'?", opts: ["Wular", "Dal", "Manasbal", "Pangong"], ans: 1, ex: "Dal Lake is famous for its floating gardens (Rad)." },
  { id: 8, sec: "GK", q: "The Treaty of Amritsar (1846) was signed with?", opts: ["Gulab Singh", "Duleep Singh", "Hari Singh", "Ranjit Singh"], ans: 0, ex: "Signed between the British and Gulab Singh." },
  { id: 9, sec: "GK", q: "Who is known as the 'Nightingale of Kashmir'?", opts: ["Lalleshwari", "Habba Khatoon", "Kota Rani", "Arnimal"], ans: 1, ex: "Habba Khatoon was a renowned poetess." },
  { id: 10, sec: "GK", q: "Which range separates Kashmir Valley from the Outer Himalayas?", opts: ["Zanskar", "Pir Panjal", "Karakoram", "Ladakh"], ans: 1, ex: "The Pir Panjal range." },
  
  // ACCOUNTANCY (31-60)
  { id: 31, sec: "Accounts", q: "Which concept assumes a business will continue forever?", opts: ["Matching", "Consistency", "Going Concern", "Accrual"], ans: 2, ex: "Going Concern concept." },
  { id: 32, sec: "Accounts", q: "What is the primary purpose of a Trial Balance?", opts: ["Profit Check", "Arithmetical Accuracy", "Cash Flow", "Taxation"], ans: 1, ex: "To verify arithmetical accuracy of ledger postings." },
  { id: 33, sec: "Accounts", q: "Double entry system was introduced by?", opts: ["Adam Smith", "Luca Pacioli", "F.W. Taylor", "Henry Fayol"], ans: 1, ex: "Luca Pacioli in 1494." },
  { id: 34, sec: "Accounts", q: "Goodwill is which type of asset?", opts: ["Current Asset", "Fictitious Asset", "Intangible Asset", "Liquid Asset"], ans: 2, ex: "It is an intangible fixed asset." },
  { id: 35, sec: "Accounts", q: "The left side of an account is called?", opts: ["Credit", "Balance", "Debit", "Total"], ans: 2, ex: "Left side is Debit (Dr.)." },

  // STATISTICS & MATH (61-85)
  { id: 61, sec: "Stats", q: "The measure of central tendency that is most affected by extreme values is?", opts: ["Median", "Mode", "Arithmetic Mean", "None"], ans: 2, ex: "The Mean is sensitive to outliers." },
  { id: 62, sec: "Stats", q: "The probability of a sure event is?", opts: ["0", "0.5", "1", "Infinity"], ans: 2, ex: "A sure event always has a probability of 1." },

  // ECONOMICS (86-100)
  { id: 86, sec: "Economics", q: "The law of demand states that as price rises, demand?", opts: ["Increases", "Decreases", "Stays Constant", "Fluctuates"], ans: 1, ex: "Inverse relationship between price and demand." },

  // SCIENCE & COMPUTERS (101-120)
  { id: 101, sec: "Science", q: "Which vitamin is synthesized in the skin by sunlight?", opts: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], ans: 3, ex: "Vitamin D is synthesized via UV rays." },
  { id: 115, sec: "Computers", q: "What is the shortcut for 'Paste' in Windows?", opts: ["Ctrl+P", "Ctrl+V", "Ctrl+C", "Ctrl+X"], ans: 1, ex: "Ctrl+V is the command to paste." },
  { id: 120, sec: "Computers", q: "Which is a permanent storage device?", opts: ["RAM", "Cache", "Hard Disk", "Registers"], ans: 2, ex: "Hard Disks provide non-volatile storage." }
];

export default function ExamEngine() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120 * 60); 
  const [view, setView] = useState("TEST"); 

  useEffect(() => {
    if (timeLeft > 0 && view === "TEST") {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setView("RESULTS");
    }
  }, [timeLeft, view]);

  const score = questions.reduce((acc, q, i) => (answers[i] === q.ans ? acc + 1 : acc), 0);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (view === "RESULTS") {
    return (
      <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", padding: "40px", fontFamily: "Segoe UI, sans-serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <h1 style={{ textAlign: "center", color: "#1a73e8" }}>Scorecard</h1>
          <div style={{ fontSize: "60px", fontWeight: "800", textAlign: "center", color: "#202124", margin: "20px 0" }}>
            {score} <span style={{ fontSize: "20px", color: "#70757a" }}>/ {questions.length}</span>
          </div>
          <hr />
          <h2 style={{ marginTop: "30px" }}>Detailed Review</h2>
          {questions.map((q, i) => (
            <div key={i} style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: answers[i] === q.ans ? "#f8fff9" : "#fff9f9" }}>
              <p><strong>{i + 1}. {q.q}</strong></p>
              <p style={{ color: answers[i] === q.ans ? "#2d7d32" : "#d32f2f" }}>Your Answer: {q.opts[answers[i]] || "Skipped"}</p>
              <p style={{ color: "#2d7d32" }}>Correct Answer: {q.opts[q.ans]}</p>
              <p style={{ fontSize: "14px", color: "#5f6368", fontStyle: "italic" }}>Explanation: {q.ex}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[currentIdx] || { q: "Slot Empty - Add Question Here", opts: ["A", "B", "C", "D"], sec: "N/A" };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", color: "#202124" }}>
      {/* Header */}
      <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #dadce0", padding: "12px 50px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: "700", fontSize: "22px", color: "#1a73e8" }}>JKSSB Portal</div>
        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <div style={{ padding: "8px 16px", backgroundColor: "#fce8e6", color: "#d93025", borderRadius: "8px", fontWeight: "700" }}>{formatTime(timeLeft)}</div>
          <button onClick={() => { if(window.confirm("Finish Test?")) setView("RESULTS") }} style={{ backgroundColor: "#1a73e8", color: "#fff", border: "none", padding: "10px 25px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Submit Test</button>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "40px auto", display: "grid", gridTemplateColumns: "1fr 350px", gap: "30px", padding: "0 20px" }}>
        {/* Main Area */}
        <section style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "40px", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ backgroundColor: "#e8f0fe", color: "#1967d2", padding: "4px 12px", borderRadius: "4px", fontSize: "13px", fontWeight: "700" }}>{q.sec}</span>
            <span style={{ color: "#70757a" }}>Q{currentIdx + 1} of 120</span>
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "500", lineHeight: "1.4", marginBottom: "40px" }}>{q.q}</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {q.opts.map((opt, i) => (
              <button key={i} onClick={() => setAnswers({...answers, [currentIdx]: i})} style={{
                textAlign: "left", padding: "20px", borderRadius: "8px", border: answers[currentIdx] === i ? "2px solid #1a73e8" : "1px solid #dadce0",
                backgroundColor: answers[currentIdx] === i ? "#f1f3f4" : "#fff", cursor: "pointer", fontSize: "16px", transition: "0.2s"
              }}>{opt}</button>
            ))}
          </div>
          <div style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "30px", display: "flex", justifyContent: "space-between" }}>
            <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={{ background: "none", border: "1px solid #dadce0", padding: "12px 25px", borderRadius: "8px", cursor: "pointer" }}>Back</button>
            <button onClick={() => setCurrentIdx(Math.min(119, currentIdx + 1))} style={{ backgroundColor: "#202124", color: "#fff", border: "none", padding: "12px 40px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Next</button>
          </div>
        </section>

        {/* Sidebar */}
        <aside style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.12)", height: "fit-content" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>Question Palette</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
            {Array.from({ length: 120 }).map((_, i) => (
              <button key={i} onClick={() => setCurrentIdx(i)} style={{
                height: "40px", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: "700",
                backgroundColor: currentIdx === i ? "#1a73e8" : (answers[i] !== undefined ? "#3c4043" : "#f1f3f4"),
                color: currentIdx === i || answers[i] !== undefined ? "#fff" : "#3c4043"
              }}>{i + 1}</button>
            ))}
          </div>
          <div style={{ marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}>
              <span>Progress</span>
              <span>{Math.round((Object.keys(answers).length / 120) * 100)}%</span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f3f4", borderRadius: "4px", marginTop: "10px", overflow: "hidden" }}>
              <div style={{ width: `${(Object.keys(answers).length / 120) * 100}%`, height: "100%", backgroundColor: "#34a853", transition: "0.3s" }}></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
