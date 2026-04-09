import { useState, useEffect } from "react";

// ⏱ Timer (2 hours)
const TOTAL_TIME = 120 * 60;

// 👉 TERA DATA IMPORT (same file me hona chahiye)
const sets = {
  2: {
    qs:[ // GK (1–10)
  {n:1,s:"GK",q:"Martand Sun Temple kisne banaya?",opts:["Avantivarman","Lalitaditya","Kanishka","Sikandar"],ans:1},
  {n:2,s:"GK",q:"Article 370 kya tha?",opts:["Tax law","Special status","Election rule","Army law"],ans:1},
  {n:3,s:"GK",q:"J&K ko unify kisne kiya?",opts:["Ranjit Dev","Ranbir Singh","Gulab Singh","Pratap Singh"],ans:2},
  {n:4,s:"GK",q:"Burzahom kisliye famous hai?",opts:["Garden","Pit houses","Temple","Fort"],ans:1},
  {n:5,s:"GK",q:"Ganga kahan se nikalti hai?",opts:["J&K","HP","UK","Bihar"],ans:2},
  {n:6,s:"GK",q:"J&K UT kab bana?",opts:["2018","2019","2020","2021"],ans:1},
  {n:7,s:"GK",q:"Assembly seats kitni hai?",opts:["107","111","114","120"],ans:2},
  {n:8,s:"GK",q:"Sadr-e-Riyasat kaun tha?",opts:["Karan Singh","Abdullah","Sinha","Murmu"],ans:0},
  {n:9,s:"GK",q:"Rishi order kisne start kiya?",opts:["Hamdan","Bulbul Shah","Nund Rishi","Rasul Mir"],ans:2},
  {n:10,s:"GK",q:"Dogra Museum kaha hai?",opts:["Bahu Fort","Amar Mahal","Mubarak Mandi","Temple"],ans:2},

  // Accounts (11–20)
  {n:11,s:"Accounts",q:"Going concern kya hai?",opts:["Profit","Continue","Cash","Loss"],ans:1},
  {n:12,s:"Accounts",q:"Accrual concept?",opts:["Cash","Earned basis","Future","Monthly"],ans:1},
  {n:13,s:"Accounts",q:"Prudence?",opts:["Profit show","Loss ignore","Loss record","Ignore"],ans:2},
  {n:14,s:"Accounts",q:"Deposit in transit?",opts:["Cheque","Delay deposit","Bank","Cash"],ans:1},
  {n:15,s:"Accounts",q:"Error principle?",opts:["Omission","Wrong class","Calc","None"],ans:1},
  {n:16,s:"Accounts",q:"SLM depreciation?",opts:["Increase","Decrease","Same","Random"],ans:2},
  {n:17,s:"Accounts",q:"Current ratio?",opts:["A/L","CA/CL","FA","NP"],ans:1},
  {n:18,s:"Accounts",q:"Capital expenditure?",opts:["Short","Long","None","Year"],ans:1},
  {n:19,s:"Accounts",q:"Advance income?",opts:["Asset","Liability","Capital","None"],ans:1},
  {n:20,s:"Accounts",q:"Voucher kya hai?",opts:["Book","Proof","Account","Note"],ans:1},

  // English (21–30)
  {n:21,s:"English",q:"Correct sentence?",opts:["Neither have","Neither has","Neither student","Neither had"],ans:1},
  {n:22,s:"English",q:"Passive voice?",opts:["Announced","Will be announced","Is","Would"],ans:1},
  {n:23,s:"English",q:"Indirect speech?",opts:["Say","Told not","Asked","Request"],ans:1},
  {n:24,s:"English",q:"Modal?",opts:["Should","May","Will","Must"],ans:1},
  {n:25,s:"English",q:"Article?",opts:["a","an","the","none"],ans:1},
  {n:26,s:"English",q:"Frugal opposite?",opts:["Eco","Thrifty","Extravagant","Prudent"],ans:2},
  {n:27,s:"English",q:"Committee verb?",opts:["is","was","are","were"],ans:2},
  {n:28,s:"English",q:"Idiom cat?",opts:["Free","Reveal","Chaos","Risk"],ans:1},
  {n:29,s:"English",q:"If I ___ you?",opts:["was","were","am","be"],ans:1},
  {n:30,s:"English",q:"Verbose opposite?",opts:["Long","Talk","Concise","Fluent"],ans:2},

  // Statistics (31–40)
  {n:31,s:"Statistics",q:"Mode?",opts:["3","5","7","9"],ans:0},
  {n:32,s:"Statistics",q:"P(A∪B)?",opts:["0.24","0.1","1","0.5"],ans:2},
  {n:33,s:"Statistics",q:"Mean sensitive?",opts:["Median","Mode","Mean","Geo"],ans:2},
  {n:34,s:"Statistics",q:"Paasche uses?",opts:["Base","Avg","Current","Any"],ans:2},
  {n:35,s:"Statistics",q:"IMR age?",opts:["5","1","2","1"],ans:1},
  {n:36,s:"Statistics",q:"Best method?",opts:["Direct","Mail","Phone","Obs"],ans:1},
  {n:37,s:"Statistics",q:"Formula mode?",opts:["Mean","3Med-2Mean","Other","None"],ans:1},
  {n:38,s:"Statistics",q:"King prob?",opts:["1/52","1/13","1/26","1/4"],ans:1},
  {n:39,s:"Statistics",q:"Census?",opts:["Sample","Full","Strat","Cluster"],ans:1},
  {n:40,s:"Statistics",q:"NRR<1?",opts:["Grow","Stable","Decline","Age"],ans:2},

  // Maths (41–50)
  {n:41,s:"Mathematics",q:"CI?",opts:["2000","2100","1000","2200"],ans:1},
  {n:42,s:"Mathematics",q:"Solve x?",opts:["2","3","4","5"],ans:0},
  {n:43,s:"Mathematics",q:"7C3?",opts:["21","35","42","70"],ans:1},
  {n:44,s:"Mathematics",q:"Derivative?",opts:["3x","6x-2","6x","3x²"],ans:1},
  {n:45,s:"Mathematics",q:"A-B?",opts:["345","12","67","1267"],ans:1},
  {n:46,s:"Mathematics",q:"Rate?",opts:["10","12.5","8","6"],ans:1},
  {n:47,s:"Mathematics",q:"Midpoint?",opts:["5,7","4,6","5,8","10"],ans:0},
  {n:48,s:"Mathematics",q:"Limit?",opts:["0","e","1","inf"],ans:2},
  {n:49,s:"Mathematics",q:"Det?",opts:["10","-2","2","-10"],ans:1},
  {n:50,s:"Mathematics",q:"Permutation?",opts:["10","15","60","20"],ans:2},

  // Economics (51–60)
  {n:51,s:"Economics",q:"IC convex?",opts:["Inc","Const","Dim","Supply"],ans:2},
  {n:52,s:"Economics",q:"GDP FC?",opts:["NNP","GDP FC","GNP","NI"],ans:1},
  {n:53,s:"Economics",q:"Reverse repo?",opts:["Repo","Bank","SLR","Reverse"],ans:3},
  {n:54,s:"Economics",q:"Stagflation?",opts:["Growth","Infl+Unemp","Low","Def"],ans:1},
  {n:55,s:"Economics",q:"2 sellers?",opts:["Mono","Oligo","Duo","MonoP"],ans:2},
  {n:56,s:"Economics",q:"MRP?",opts:["Goods","Factors","Bond","Forex"],ans:1},
  {n:57,s:"Economics",q:"Giffen?",opts:["Normal","Down","Up","Elastic"],ans:2},
  {n:58,s:"Economics",q:"SLR?",opts:["CRR","Repo","SLR","Rev"],ans:2},
  {n:59,s:"Economics",q:"India economy?",opts:["Cap","Soc","Mixed","Trad"],ans:2},
  {n:60,s:"Economics",q:"Rent theory?",opts:["All","Surplus","Wage","Interest"],ans:1},

  // Science (61–70)
  {n:61,s:"Science",q:"3rd law?",opts:["F=ma","Rest","Action","Accel"],ans:2},
  {n:62,s:"Science",q:"Ohm law?",opts:["P","VIR","F","E"],ans:1},
  {n:63,s:"Science",q:"Vit D?",opts:["Scurvy","Blind","Rickets","Ber"],ans:2},
  {n:64,s:"Science",q:"Not gas?",opts:["CO2","CH4","N2","N2O"],ans:2},
  {n:65,s:"Science",q:"Xylem?",opts:["Food","Water","Gas","Protein"],ans:1},
  {n:66,s:"Science",q:"Photosynthesis?",opts:["Resp","Trans","Photo","Osm"],ans:2},
  {n:67,s:"Science",q:"NCD?",opts:["TB","Malaria","Cholera","Diabetes"],ans:3},
  {n:68,s:"Science",q:"Ozone cause?",opts:["CO2","CFC","NO","CH4"],ans:1},
  {n:69,s:"Science",q:"Biomass?",opts:["Tide","Wind","Organic","Geo"],ans:2},
  {n:70,s:"Science",q:"Power unit?",opts:["Amp","Volt","Joule","Watt"],ans:3},

  // Computers (71–80)
  {n:71,s:"Computers",q:"ALU?",opts:["Control","Cache","ALU","Reg"],ans:2},
  {n:72,s:"Computers",q:"Non volatile?",opts:["RAM","Cache","HDD","DRAM"],ans:2},
  {n:73,s:"Computers",q:"Freeware?",opts:["Open","Free no code","Prop","Share"],ans:1},
  {n:74,s:"Computers",q:"Ctrl+Z?",opts:["Save","Cut","Undo","Zoom"],ans:2},
  {n:75,s:"Computers",q:"OS manages?",opts:["File","UI","All","Net"],ans:2},
  {n:76,s:"Computers",q:"Max excel?",opts:["HIGH","MAX","MAX","LARGE"],ans:2},
  {n:77,s:"Computers",q:"LAN?",opts:["WAN","MAN","LAN","Net"],ans:2},
  {n:78,s:"Computers",q:"BIOS?",opts:["Binary","Basic","Internal","OS"],ans:1},
  {n:79,s:"Computers",q:"E-gov?",opts:["Fun","Service","Bank","Social"],ans:1},
  {n:80,s:"Computers",q:"Output?",opts:["Scanner","Keyboard","Mic","Printer"],ans:3}
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
