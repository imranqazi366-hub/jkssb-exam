import { useState, useEffect } from "react";

// ⏱ Timer (2 hours)
const TOTAL_TIME = 120 * 60;

// 👉 TERA DATA IMPORT (same file me hona chahiye)
const sets = {
  2: {
    qs: qs: [
  {n:1,s:"GK",q:"The Martand Sun Temple was built by?",opts:["Avantivarman","Lalitaditya Muktapida","Kanishka","Sikandar"],ans:1},
  {n:2,s:"GK",q:"Article used to grant special status to J&K?",opts:["356","370","371","360"],ans:1},
  {n:3,s:"GK",q:"First Dogra ruler who unified J&K?",opts:["Ranjit Dev","Ranbir Singh","Gulab Singh","Pratap Singh"],ans:2},
  {n:4,s:"GK",q:"Burzahom is known for?",opts:["Mughal gardens","Neolithic pits","Buddhist temples","Dogra forts"],ans:1},
  {n:5,s:"GK",q:"Which river does NOT originate in J&K?",opts:["Jhelum","Chenab","Ravi","Ganga"],ans:3},

  {n:31,s:"Accounts",q:"Going concern concept means?",opts:["Matching","Consistency","Business continues","Accrual"],ans:2},
  {n:32,s:"Accounts",q:"Accrual concept means?",opts:["Cash basis","Revenue when earned","Only cash","Monthly statements"],ans:1},

  {n:61,s:"English",q:"Correct sentence?",opts:[
    "Neither have submitted",
    "Neither has submitted",
    "Neither student has",
    "Neither had been"
  ],ans:1},

  {n:71,s:"Statistics",q:"Mode of 5,3,7,3,9,3?",opts:["3","5","7","9"],ans:0},

  {n:81,s:"Mathematics",q:"CI on 10000 at 10% for 2 years?",opts:["2000","2100","1000","2200"],ans:1},

  {n:91,s:"Economics",q:"IC convex due to?",opts:[
    "Increasing MRS",
    "Constant utility",
    "Diminishing MRS",
    "Supply law"
  ],ans:2},

  {n:101,s:"Science",q:"Newton's third law?",opts:[
    "F=ma",
    "Rest law",
    "Action reaction",
    "Mass law"
  ],ans:2},

  {n:111,s:"Computers",q:"ALU does?",opts:[
    "Control",
    "Memory",
    "Arithmetic logic",
    "Storage"
  ],ans:2}
]
};

function App() {

  // 👉 Set select (Set 2 use kar rahe)
  const questions = sets[2].qs;

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

  // 👉 Answer handle
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

  // ⏱ Time format
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h2>JKSSB Exam App</h2>

      <h3>
        ⏱ {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </h3>

      <h4>
        Question {current + 1} / {questions.length}
      </h4>

      <h2>{questions[current].q}</h2>

      {questions[current].opts.map((opt, index) => (
        <div key={index} style={{ margin: "10px" }}>
          <button
            onClick={() => handleAnswer(index)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;
