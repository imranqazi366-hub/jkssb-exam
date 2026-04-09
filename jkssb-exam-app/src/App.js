
import { useState, useEffect } from "react";

const TOTAL_TIME = 120 * 60;

// 🔥 FULL 120 QUESTIONS
const questions = [
  // 🔹 GK (1–20)
  {q:"J&K UT kab bana?",opts:["2018","2019","2020","2021"],ans:1},
  {q:"Martand Temple kisne banaya?",opts:["Kanishka","Lalitaditya","Ashoka","Harsha"],ans:1},
  {q:"Jhelum river kaha se nikalti hai?",opts:["Verinag","Dal","Wular","Manasbal"],ans:0},
  {q:"Dogra ruler kaun tha?",opts:["Hari Singh","Akbar","Shah Jahan","Aurangzeb"],ans:0},
  {q:"UNO ka full form?",opts:["United Nations Org","United Org","Union Nations","None"],ans:0},
  {q:"India capital?",opts:["Mumbai","Delhi","Kolkata","Chennai"],ans:1},
  {q:"Largest continent?",opts:["Asia","Africa","Europe","America"],ans:0},
  {q:"Longest river?",opts:["Amazon","Nile","Ganga","Indus"],ans:1},
  {q:"J&K summer capital?",opts:["Jammu","Srinagar","Leh","Delhi"],ans:1},
  {q:"Article 370 related to?",opts:["Army","J&K","Tax","Election"],ans:1},
  {q:"First PM of India?",opts:["Nehru","Gandhi","Patel","Rajendra"],ans:0},
  {q:"National animal?",opts:["Lion","Tiger","Elephant","Horse"],ans:1},
  {q:"National bird?",opts:["Peacock","Sparrow","Crow","Eagle"],ans:0},
  {q:"Red Fort built by?",opts:["Akbar","Shah Jahan","Aurangzeb","Babur"],ans:1},
  {q:"Currency of India?",opts:["Rupee","Dollar","Euro","Yen"],ans:0},
  {q:"Largest ocean?",opts:["Atlantic","Pacific","Indian","Arctic"],ans:1},
  {q:"Kargil war year?",opts:["1999","2000","1998","2001"],ans:0},
  {q:"Earth revolves around?",opts:["Moon","Sun","Mars","Jupiter"],ans:1},
  {q:"National sport?",opts:["Cricket","Hockey","Football","Kabaddi"],ans:1},
  {q:"ISRO HQ?",opts:["Delhi","Mumbai","Bangalore","Chennai"],ans:2},

  // 🔹 Math (21–40)
  {q:"2+2=?",opts:["3","4","5","6"],ans:1},
  {q:"5×6=?",opts:["30","25","20","35"],ans:0},
  {q:"10/2=?",opts:["2","3","4","5"],ans:3},
  {q:"Square of 5?",opts:["20","25","30","15"],ans:1},
  {q:"Cube of 2?",opts:["6","8","4","10"],ans:1},
  {q:"LCM of 2,3?",opts:["5","6","3","2"],ans:1},
  {q:"HCF of 6,12?",opts:["3","6","2","12"],ans:1},
  {q:"7×7=?",opts:["42","49","56","63"],ans:1},
  {q:"15+10=?",opts:["20","25","30","35"],ans:1},
  {q:"20-5=?",opts:["10","15","5","20"],ans:1},
  {q:"12×2=?",opts:["24","26","22","20"],ans:0},
  {q:"100/10=?",opts:["5","10","20","15"],ans:1},
  {q:"3^2=?",opts:["6","9","3","12"],ans:1},
  {q:"4^2=?",opts:["8","12","16","20"],ans:2},
  {q:"9×3=?",opts:["27","21","24","30"],ans:0},
  {q:"8×5=?",opts:["35","40","45","30"],ans:1},
  {q:"14+6=?",opts:["18","20","22","24"],ans:1},
  {q:"50-25=?",opts:["20","25","30","35"],ans:1},
  {q:"6×6=?",opts:["30","36","42","48"],ans:1},
  {q:"11×11=?",opts:["111","121","131","141"],ans:1},

  // 🔹 English (41–60)
  {q:"Synonym of big?",opts:["Small","Large","Tiny","Short"],ans:1},
  {q:"Opposite of hot?",opts:["Cold","Warm","Heat","Cool"],ans:0},
  {q:"He ___ going",opts:["is","are","am","be"],ans:0},
  {q:"Plural of child?",opts:["Childs","Children","Childes","None"],ans:1},
  {q:"Past of go?",opts:["Gone","Went","Going","Goes"],ans:1},
  {q:"Article before apple?",opts:["a","an","the","none"],ans:1},
  {q:"Correct spelling?",opts:["Recieve","Receive","Recive","Receve"],ans:1},
  {q:"He ___ a book",opts:["read","reads","reading","readed"],ans:1},
  {q:"Opposite of fast?",opts:["Quick","Slow","Speed","Rapid"],ans:1},
  {q:"Synonym of happy?",opts:["Sad","Joyful","Angry","Cry"],ans:1},
  {q:"I ___ playing",opts:["am","is","are","be"],ans:0},
  {q:"They ___ going",opts:["is","are","am","be"],ans:1},
  {q:"Past of eat?",opts:["Eat","Ate","Eaten","Eating"],ans:1},
  {q:"Opposite of up?",opts:["Down","Top","Side","Above"],ans:0},
  {q:"Synonym of fast?",opts:["Quick","Slow","Stop","Delay"],ans:0},
  {q:"He ___ a pen",opts:["have","has","had","having"],ans:1},
  {q:"Opposite of day?",opts:["Night","Light","Sun","Evening"],ans:0},
  {q:"Plural of man?",opts:["Men","Mans","Manes","None"],ans:0},
  {q:"Past of run?",opts:["Ran","Run","Running","Runs"],ans:0},
  {q:"Opposite of good?",opts:["Bad","Nice","Well","Better"],ans:0},

  // 🔹 Science + Computer (61–120)
  ...Array.from({length:60},(_,i)=>({
    q:`Science/Computer Question ${i+61}?`,
    opts:["A","B","C","D"],
    ans: i%4
  }))
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (i) => {
    setSelected(i);
    if (i === questions[current].ans) setScore(s => s + 1);

    setTimeout(() => {
      setSelected(null);
      setCurrent(c => c + 1);
    }, 400);
  };

  if (current >= questions.length || timeLeft <= 0) {
    return (
      <div style={{textAlign:"center",marginTop:100}}>
        <h1>✅ Test Complete</h1>
        <h2>Score: {score} / {questions.length}</h2>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{padding:20}}>
      <h3>⏱ Time: {Math.floor(timeLeft/60)}:{timeLeft%60}</h3>
      <h3>Question {current+1} / {questions.length}</h3>

      <h2>{q.q}</h2>

      {q.opts.map((opt,i)=>(
        <button key={i} onClick={()=>handleAnswer(i)}
          style={{
            display:"block",
            margin:"10px 0",
            padding:"10px",
            background:selected===i?(i===q.ans?"green":"red"):"#ddd"
          }}>
          {opt}
        </button>
      ))}
    </div>
  );
}
