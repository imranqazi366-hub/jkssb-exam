
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_QUESTIONS = 120;
const TIME_LIMIT = 120 * 60; 

// --- THE QUESTION BANK ---
// I have loaded the first 30 questions here. 
// I will provide the remaining 90 questions in the next message for you to paste in.
const questions = [
  { id: 1, sec: "GK", q: "The Martand Sun Temple was built by which ruler of the Karkota Dynasty?", options: ["Avantivarman", "Lalitaditya Muktapida", "Durlabhavardhana", "Jayapida"], ans: 1, ex: "Built in the 8th century by Lalitaditya Muktapida." },
  { id: 2, sec: "GK", q: "Which article of the Indian Constitution was associated with the special status of J&K?", options: ["Art 35A", "Art 370", "Art 371", "Art 324"], ans: 1, ex: "Article 370 was abrogated in August 2019." },
  { id: 3, sec: "GK", q: "Who was the last ruling Maharaja of the princely state of Jammu and Kashmir?", options: ["Gulab Singh", "Ranbir Singh", "Hari Singh", "Pratap Singh"], ans: 2, ex: "Maharaja Hari Singh signed the Instrument of Accession in 1947." },
  { id: 4, sec: "GK", q: "Burzahom, the famous Neolithic site, is located in which district?", options: ["Jammu", "Srinagar", "Anantnag", "Baramulla"], ans: 1, ex: "Burzahom is located in the Srinagar district of Kashmir." },
  { id: 5, sec: "GK", q: "Which river is known as the 'Vitasta' in Sanskrit?", options: ["Chenab", "Jhelum", "Ravi", "Indus"], ans: 1, ex: "The Jhelum river is anciently known as Vitasta." },
  { id: 6, sec: "GK", q: "The J&K Reorganisation Act, 2019 came into effect on?", options: ["5 Aug 2019", "15 Aug 2019", "31 Oct 2019", "26 Jan 2020"], ans: 2, ex: "It became effective on 31st October 2019." },
  { id: 7, sec: "GK", q: "Which lake is famous for the 'Floating Gardens' (Rad)?", opts: ["Wular", "Dal", "Manasbal", "Pangong"], ans: 1, e: "Dal Lake is famous for its floating gardens." },
  { id: 8, sec: "GK", q: "The Treaty of Amritsar (1846) was signed between the British and?", opts: ["Gulab Singh", "Duleep Singh", "Hari Singh", "Ranjit Singh"], ans: 0, e: "Signed with Gulab Singh, founding the Dogra dynasty." },
  { id: 9, sec: "GK", q: "Who is known as the 'Nightingale of Kashmir'?", opts: ["Lalleshwari", "Habba Khatoon", "Kota Rani", "Arnimal"], ans: 1, e: "Habba Khatoon was a renowned poetess." },
  { id: 10, sec: "GK", q: "Which mountain range separates Kashmir Valley from the Outer Himalayas?", opts: ["Zanskar", "Pir Panjal", "Karakoram", "Ladakh Range"], ans: 1, e: "The Pir Panjal range." },
  { id: 11, sec: "GK", q: "The first railway line in J&K was laid in which year?", opts: ["1890", "1897", "1905", "1947"], ans: 1, e: "First line connected Jammu to Sialkot in 1897." },
  { id: 12, sec: "GK", q: "Which pass connects Jammu with the Kashmir Valley?", opts: ["Zojila", "Banihal", "Khardung La", "Pencil La"], ans: 1, e: "Banihal pass via Jawahar Tunnel." },
  { id: 13, sec: "GK", q: "The Shalimar Bagh was built by Emperor?", opts: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], ans: 1, e: "Built by Jahangir for his wife Nur Jahan." },
  { id: 14, sec: "GK", q: "Wular Lake is located in which district?", opts: ["Bandipora", "Ganderbal", "Srinagar", "Budgam"], ans: 0, e: "Bandipora district." },
  { id: 15, sec: "GK", q: "Who was the founder of the Karkota Dynasty?", opts: ["Lalitaditya", "Durlabhavardhana", "Avantivarman", "Sankaravarman"], ans: 1, e: "Founded by Durlabhavardhana." },
  { id: 16, sec: "GK", q: "Which town is known as 'Chhota Kashi'?", opts: ["Jammu", "Purmandal", "Udhampur", "Samba"], ans: 1, e: "Purmandal is called Chhota Kashi." },
  { id: 17, sec: "GK", q: "The world's highest rail bridge is being built over which river?", opts: ["Jhelum", "Chenab", "Indus", "Tawi"], ans: 1, e: "The Chenab Bridge." },
  { id: 18, sec: "GK", q: "Who wrote 'Rajatarangini'?", opts: ["Kalhana", "Bilhana", "Jonaraja", "Kshemendra"], ans: 0, e: "Kalhana wrote it in the 12th century." },
  { id: 19, sec: "GK", q: "The 'Darbar Move' was started by?", opts: ["Gulab Singh", "Ranbir Singh", "Pratap Singh", "Hari Singh"], ans: 1, e: "Maharaja Ranbir Singh in 1872." },
  { id: 20, sec: "GK", q: "Which district is known as 'Land of Springs'?", opts: ["Anantnag", "Kulgam", "Pulwama", "Sopore"], ans: 0, e: "Anantnag is famous for its numerous springs." },
  { id: 21, sec: "GK", q: "Vaishno Devi shrine is located in which hills?", opts: ["Pir Panjal", "Trikuta", "Nandi", "Zanskar"], ans: 1, e: "Located in the Trikuta Hills." },
  { id: 22, sec: "GK", q: "Which ruler built the city of Parihaspora?", opts: ["Avantivarman", "Lalitaditya", "Zain-ul-Abidin", "Shah Mir"], ans: 1, e: "Built by Lalitaditya Muktapida." },
  { id: 23, sec: "GK", q: "What is the capital of Ladakh?", opts: ["Leh", "Kargil", "Dras", "Nubra"], ans: 0, e: "Leh is the capital." },
  { id: 24, sec: "GK", q: "The 'Kishenganga' river is a tributary of?", opts: ["Chenab", "Jhelum", "Ravi", "Indus"], ans: 1, e: "A major tributary of Jhelum." },
  { id: 25, sec: "GK", q: "Who was known as 'Budshah'?", opts: ["Zain-ul-Abidin", "Akbar", "Shah Mir", "Sikandar"], ans: 0, e: "Sultan Zain-ul-Abidin (The Great King)." },
  { id: 26, sec: "GK", q: "The largest glacier in the Karakoram range is?", opts: ["Siachen", "Baltoro", "Biafo", "Hispar"], ans: 0, e: "Siachen Glacier." },
  { id: 27, sec: "GK", q: "The Hemis National Park is famous for?", opts: ["Tigers", "Snow Leopards", "Elephants", "Lions"], ans: 1, e: "Famous for Snow Leopards." },
  { id: 28, sec: "GK", q: "Saffron is mainly cultivated in which plateau?", opts: ["Pampore", "Gulmarg", "Sonamarg", "Yusmarg"], ans: 0, e: "Pampore (Kashmir Saffron)." },
  { id: 29, sec: "GK", q: "Total districts in the UT of J&K are?", opts: ["10", "15", "20", "22"], ans: 2, e: "There are 20 districts in J&K UT." },
  { id: 30, sec: "GK", q: "Which article allows Parliament to reorganize states?", opts: ["Art 1", "Art 2", "Art 3", "Art 4"], ans: 2, e: "Article 3 provides this power." }
];

export default function PremiumExamPortal() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsSubmitted(true);
    }
  }, [timeLeft, isSubmitted]);

  const handleSelect = (idx) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentIdx]: idx });
  };

  const calculateScore = () => {
    return questions.reduce((score, q, i) => (answers[i] === q.ans ? score + 1 : score), 0);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#fbfbfd", fontFamily: "-apple-system, system-ui, sans-serif", color: "#1d1d1f" },
    nav: { height: "64px", borderBottom: "1px solid #d2d2d7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 },
    main: { maxWidth: "1100px", margin: "40px auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px", padding: "0 20px" },
    questionCard: { backgroundColor: "#fff", borderRadius: "24px", padding: "48px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" },
    optionBtn: (isSelected) => ({
      width: "100%", padding: "20px 24px", margin: "8px 0", borderRadius: "14px", border: isSelected ? "2px solid #0071e3" : "1px solid #d2d2d7",
      backgroundColor: isSelected ? "#f5faff" : "#fff", textAlign: "left", fontSize: "17px", cursor: "pointer", transition: "all 0.2s ease", fontWeight: isSelected ? "600" : "400"
    }),
    sidebar: { backgroundColor: "#fff", borderRadius: "24px", padding: "24px", height: "fit-content", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" },
    submitBtn: { backgroundColor: "#0071e3", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "18px", fontWeight: "600", cursor: "pointer" }
  };

  if (isSubmitted) {
    return (
      <div style={{ ...styles.container, textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "700" }}>Test Completed.</h1>
        <div style={{ fontSize: "80px", fontWeight: "700", color: "#0071e3", margin: "20px 0" }}>{calculateScore()}<span style={{ fontSize: "24px", color: "#86868b" }}>/120</span></div>
        <button onClick={() => window.location.reload()} style={{ backgroundColor: "#1d1d1f", color: "#fff", padding: "16px 32px", borderRadius: "30px", border: "none", cursor: "pointer", fontWeight: "600" }}>Retake Examination</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={{ fontWeight: "700", fontSize: "19px", letterSpacing: "-0.5px" }}>JKSSB Exam Portal</div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div style={{ color: timeLeft < 300 ? "#ff3b30" : "#1d1d1f", fontWeight: "600", fontSize: "17px" }}>{formatTime(timeLeft)}</div>
          <button onClick={() => {if(window.confirm("Submit?")) setIsSubmitted(true)}} style={styles.submitBtn}>Submit</button>
        </div>
      </nav>

      <main style={styles.main}>
        <div>
          <div style={styles.questionCard}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ backgroundColor: "#f5f5f7", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", color: "#86868b" }}>{questions[currentIdx].sec}</span>
              <span style={{ color: "#86868b", fontSize: "14px" }}>Question {currentIdx + 1} of 120</span>
            </div>
            <h2 style={{ fontSize: "26px", fontWeight: "600", lineHeight: "1.3", marginBottom: "40px" }}>{questions[currentIdx].q}</h2>
            
            <div style={{ marginBottom: "40px" }}>
              {(questions[currentIdx].options || questions[currentIdx].opts).map((opt, i) => (
                <button key={i} onClick={() => handleSelect(i)} style={styles.optionBtn(answers[currentIdx] === i)}>
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)} style={{ background: "none", border: "none", color: currentIdx === 0 ? "#d2d2d7" : "#0071e3", fontSize: "17px", cursor: "pointer", fontWeight: "600" }}>Previous</button>
              <button onClick={() => setCurrentIdx(prev => Math.min(prev + 1, 119))} style={{ backgroundColor: "#f5f5f7", border: "none", padding: "12px 32px", borderRadius: "12px", fontSize: "17px", fontWeight: "600", cursor: "pointer" }}>Next</button>
            </div>
          </div>
        </div>

        <aside style={styles.sidebar}>
          <h3 style={{ fontSize: "17px", fontWeight: "600", marginBottom: "20px" }}>Overview</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxHeight: "400px", overflowY: "auto", padding: "4px" }}>
            {Array.from({ length: 120 }).map((_, i) => (
              <button
                key={i}
                onClick={() => i < questions.length && setCurrentIdx(i)}
                style={{
                  height: "36px", width: "100%", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600",
                  backgroundColor: currentIdx === i ? "#1d1d1f" : (answers[i] !== undefined ? "#e8e8ed" : "#f5f5f7"),
                  color: currentIdx === i ? "#fff" : "#1d1d1f",
                  opacity: i < questions.length ? 1 : 0.3
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
