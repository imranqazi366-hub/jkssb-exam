
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_TIME = 120 * 60;
const SECTION_COLORS = { 
  GK: "#00d4ff", Accounts: "#00ff41", English: "#bc13fe", 
  Statistics: "#ff8c00", Mathematics: "#ff007a", Economics: "#ffee00", 
  Science: "#00ffa3", Computers: "#7209b7" 
};

// --- DATA SOURCE (Consolidated 120 Questions) ---
const quizQuestions = [
    // GK (1-30)
    {n:1,s:"GK",q:"The Martand Sun Temple, one of the finest examples of ancient Kashmiri architecture, was built by?",opts:["Avantivarman","Lalitaditya Muktapida","Emperor Kanishka","Sultan Sikandar"],ans:1,e:"Martand Sun Temple built by Lalitaditya Muktapida of Karkota dynasty in 8th century AD."},
    {n:2,s:"GK",q:"Which constitutional article was used by Parliament to grant special status to J&K (now abrogated)?",opts:["Article 356","Article 370","Article 371","Article 360"],ans:1,e:"Article 370 granted special status to J&K. Abrogated on 5 August 2019."},
    {n:3,s:"GK",q:"The first Dogra ruler to consolidate Jammu, Kashmir and Ladakh under one administration was?",opts:["Ranjit Dev","Ranbir Singh","Gulab Singh","Pratap Singh"],ans:2,e:"Maharaja Gulab Singh unified the region under the Treaty of Amritsar 1846."},
    {n:4,s:"GK",q:"Burzahom, one of the earliest archaeological sites in Kashmir, is known for?",opts:["Mughal garden architecture","Neolithic pit-dwelling civilisation","Buddhist rock-cut temples","Dogra-era fortifications"],ans:1,e:"Burzahom is a Neolithic site near Srinagar famous for pit dwellings."},
    {n:5,s:"GK",q:"Which among the following rivers does NOT originate in Jammu & Kashmir?",opts:["Jhelum","Chenab","Ravi","Ganga"],ans:3,e:"Ganga originates in Uttarakhand (Gangotri glacier)."},
    {n:6,s:"GK",q:"The J&K Reorganisation Act, 2019 bifurcated the state into two Union Territories effective from?",opts:["5 August 2019","15 August 2019","31 October 2019","1 November 2019"],ans:2,e:"Effective from 31 October 2019 (Unity Day)."},
    {n:7,s:"GK",q:"Under the J&K Reorganisation Act 2019, how many seats does the J&K Legislative Assembly have?",opts:["107","111","114","120"],ans:2,e:"Increased to 114 (including 24 reserved for PoK)."},
    {n:8,s:"GK",q:"Karan Singh held the constitutional position of Sadr-e-Riyasat of J&K until?",opts:["1962","1965","1968","1971"],ans:1,e:"Served until 1965, then transitioned to the role of Governor."},
    {n:9,s:"GK",q:"The Sufi saint credited with introducing the Rishi Order in Kashmir was?",opts:["Shah-i-Hamdan","Bulbul Shah","Sheikh Noor-ud-din Wali (Nund Rishi)","Rasul Mir"],ans:2,e:"Nund Rishi (Sheikh-ul-Alam) founded the indigenous Rishi order."},
    {n:10,s:"GK",q:"The Dogra Art Museum is housed within which complex in Jammu?",opts:["Bahu Fort","Amar Mahal","Mubarak Mandi Complex","Raghunath Temple"],ans:2,e:"Located in the historic Mubarak Mandi Palace complex."},
    {n:11,s:"GK",q:"The J&K Official Languages Act 2020 recognised how many official languages?",opts:["2","3","4","5"],ans:3,e:"Languages: Kashmiri, Dogri, Hindi, Urdu, and English."},
    {n:12,s:"GK",q:"Sindh Nallah is a tributary of which river in Kashmir?",opts:["Chenab","Jhelum","Tawi","Indus"],ans:1,e:"The Sindh is a major tributary of the Jhelum river."},
    {n:13,s:"GK",q:"India's Parliament derives its power to form new States from?",opts:["Article 1","Article 2","Article 3","Article 4"],ans:2,e:"Article 3 allows for the formation of new states and alteration of areas."},
    {n:14,s:"GK",q:"The mass exodus of Kashmiri Pandits from the valley occurred in?",opts:["1947","1965","1984","1990"],ans:3,e:"The exodus predominantly took place in January 1990."},
    {n:15,s:"GK",q:"The J&K Reorganisation Act 2019 abolished which house?",opts:["Legislative Assembly","Rajya Sabha seat","Legislative Council","PAC"],ans:2,e:"The Upper House (Legislative Council) was abolished."},
    {n:16,s:"GK",q:"Losar is the traditional New Year of which community?",opts:["Dogra","Kashmiri Muslim","Ladakhi Buddhist","Gujjar"],ans:2,e:"Celebrated by the Buddhist community in Ladakh."},
    {n:17,s:"GK",q:"The 'Darbar Move' practice was suspended in which year?",opts:["2019","2020","2021","2022"],ans:2,e:"Ended in 2021 to save costs and move toward e-office."},
    {n:18,s:"GK",q:"NABARD's primary mandate is to?",opts:["Regulate stocks","Rural/Agri Credit","Monetary policy","Govt securities"],ans:1,e:"National Bank for Agriculture and Rural Development."},
    {n:19,s:"GK",q:"Which is NOT a UT with a Legislature?",opts:["Delhi","Puducherry","J&K","Ladakh"],ans:3,e:"Ladakh is a UT without a legislature."},
    {n:20,s:"GK",q:"The Raghunath Temple in Jammu was completed by?",opts:["Pratap Singh","Ranbir Singh","Hari Singh","Ranjit Dev"],ans:1,e:"Completed by Maharaja Ranbir Singh in 1860."},
    {n:21,s:"GK",q:"CPI is used in India to officially measure?",opts:["GDP","Production","Inflation","Forex"],ans:2,e:"Consumer Price Index is the official inflation metric."},
    {n:22,s:"GK",q:"Chenab Rail Bridge is part of which project?",opts:["Delhi-Mumbai","USBRL","Highway Exp","Freight Corridor"],ans:1,e:"Udhampur-Srinagar-Baramulla Rail Link."},
    {n:23,s:"GK",q:"Kousarnag lake is situated in the?",opts:["Zanskar","Pir Panchal","Greater Himalaya","Ladakh Range"],ans:1,e:"Located in the Pir Panchal range, Shopian."},
    {n:24,s:"GK",q:"LG must act on Advisory Committee recommendations within?",opts:["15 days","30 days","45 days","60 days"],ans:1,e:"Per the 2019 Act, the timeframe is 30 days."},
    {n:25,s:"GK",q:"GI tag for Basohli Paintings was granted in?",opts:["2020","2021","2022","2023"],ans:3,e:"Basohli (Kathua) miniature paintings got GI tag in 2023."},
    {n:26,s:"GK",q:"The longest National Highway in India is?",opts:["NH-1","NH-44","NH-48","NH-27"],ans:1,e:"NH-44 (formerly NH-7), Srinagar to Kanyakumari."},
    {n:27,s:"GK",q:"J&K High Court serves as common court for?",opts:["J&K only","Ladakh only","Both","HP and J&K"],ans:2,e:"It is the High Court of J&K and Ladakh."},
    {n:28,s:"GK",q:"Sheikh Abdullah served as first PM of J&K from?",opts:["1947 to 1953","1953 to 1963","1963 to 1965","1975 to 1982"],ans:0,e:"First PM of J&K until 1953."},
    {n:29,s:"GK",q:"Directorate of Archives J&K was established in?",opts:["1947","1956","1963","1975"],ans:2,e:"Formally established in 1963."},
    {n:30,s:"GK",q:"Hemis Festival commemorates the birth of?",opts:["Buddha","Guru Nanak","Guru Padmasambhava","Dalai Lama"],ans:2,e:"Celebrates Guru Rinpoche (Padmasambhava)."},

    // ACCOUNTS (31-60)
    {n:31,s:"Accounts",q:"Business assumed to continue indefinitely is?",opts:["Matching","Consistency","Going Concern","Accrual"],ans:2,e:"Going Concern Concept."},
    {n:32,s:"Accounts",q:"Accrual Concept requires?",opts:["Cash received","Revenue earned/Exp incurred","Cash only","Monthly prep"],ans:1,e:"Record when earned/incurred, not when cash moves."},
    {n:33,s:"Accounts",q:"Under Conservatism, an accountant should?",opts:["Anticipate profit","Realised only","Provide for all losses","Market values"],ans:2,e:"Anticipate no profit, provide for all losses."},
    {n:34,s:"Accounts",q:"Cheque deposited but not yet credited is?",opts:["Outstanding","Stale","Deposit in transit","Dishonoured"],ans:2,e:"Common BRS item: Deposit in transit."},
    {n:35,s:"Accounts",q:"Revenue expense treated as capital is?",opts:["Omission","Commission","Error of principle","Compensating"],ans:2,e:"Violation of basic accounting principles."},
    {n:36,s:"Accounts",q:"Straight Line Method depreciation charge?",opts:["Increases","Decreases","Remains constant","Market-based"],ans:2,e:"Same amount every year."},
    {n:37,s:"Accounts",q:"Current Ratio formula?",opts:["Assets/Liabilities","CA/CL","Fixed/Capital","NP/Sales"],ans:1,e:"Current Assets divided by Current Liabilities."},
    {n:38,s:"Accounts",q:"Gaining Ratio is used during?",opts:["Admission","Revaluation","Retirement/Death","Profit dist"],ans:2,e:"Calculated when a partner leaves."},
    {n:39,s:"Accounts",q:"Capital Expenditure benefit extends?",opts:["One year","Beyond one year","One year exactly","Five years"],ans:1,e:"Results in asset with long-term utility."},
    {n:40,s:"Accounts",q:"Revenue received in advance is a?",opts:["Asset","Long-term","Capital","Current Liability"],ans:3,e:"Unearned income is a liability."},
    {n:41,s:"Accounts",q:"Marginal Cost is?",opts:["Total/Units","Fixed per unit","Variable of one extra unit","Selling cost"],ans:2,e:"Change in total cost from producing 1 more unit."},
    {n:42,s:"Accounts",q:"Social Audit means?",opts:["Social media","Impact on society","CA audit","Tax audit"],ans:1,e:"Examining social costs and benefits."},
    {n:43,s:"Accounts",q:"PFMS tracks?",opts:["Budgets","Public fund flow","Direct taxes","Banking"],ans:1,e:"Public Financial Management System."},
    {n:44,s:"Accounts",q:"Which is an Intangible Fixed Asset?",opts:["Building","Furniture","Patent","Stock"],ans:2,e:"Assets like Patents/Goodwill."},
    {n:45,s:"Accounts",q:"Inter-state supply tax?",opts:["CGST+SGST","IGST","CGST+IGST","SGST"],ans:1,e:"Integrated Goods and Services Tax."},
    {n:46,s:"Accounts",q:"Document authorizing entry?",opts:["Ledger","Invoice","Voucher","Memorandum"],ans:2,e:"Vouchers serve as primary evidence."},
    {n:47,s:"Accounts",q:"Partner's loan interest without deed?",opts:["0%","4%","6%","Bank rate"],ans:2,e:"Statutory 6% interest."},
    {n:48,s:"Accounts",q:"Actual cost < Budgeted cost?",opts:["Adverse","Negative","Favourable","Nil"],ans:2,e:"Favourable variance."},
    {n:49,s:"Accounts",q:"Ind AS are?",opts:["Diff from IFRS","Same as GAAP","IFRS Converged","Optional"],ans:2,e:"Converged Indian Accounting Standards."},
    {n:50,s:"Accounts",q:"'Incidence of Tax' is?",opts:["Rate","Legal obligation","Final burden","Method"],ans:2,e:"The person who actually feels the loss of money."},
    {n:51,s:"Accounts",q:"Checks ledger arithmetical accuracy?",opts:["BS","Cash Book","Trial Balance","Journal"],ans:2,e:"Trial Balance sums Dr/Cr."},
    {n:52,s:"Accounts",q:"NOT a current asset?",opts:["Stock","Debtors","Prepaid","Patents"],ans:3,e:"Patents are non-current intangible assets."},
    {n:53,s:"Accounts",q:"Revaluation Account is for?",opts:["Annual profit","Fair value adjustment","Depreciation","Trial Balance"],ans:1,e:"Used in partnership changes."},
    {n:54,s:"Accounts",q:"ERP integrates?",opts:["Payroll","All business functions","Payables","Gov/Private"],ans:1,e:"Unified software for all departments."},
    {n:55,s:"Accounts",q:"Dishonoured cheque makes Cash Book balance?",opts:["Higher","Lower","Same","Credit"],ans:0,e:"CB reflects higher balance than Bank."},
    {n:56,s:"Accounts",q:"Same method year to year?",opts:["Materiality","Going Concern","Consistency","Prudence"],ans:2,e:"Consistency Principle."},
    {n:57,s:"Accounts",q:"Petty Cash Book system?",opts:["Bank only","Imprest","Large corp","Main cash"],ans:1,e:"The Imprest System of petty cash."},
    {n:58,s:"Accounts",q:"DBT enabled by?",opts:["Finance Dept","PFMS","RBI","SEBI"],ans:1,e:"Direct Benefit Transfer via PFMS."},
    {n:59,s:"Accounts",q:"Capital A/c Credit balance means?",opts:["Loss","Withdrawals","Positive net worth","Liability paid"],ans:2,e:"Excess of assets over liabilities for owner."},
    {n:60,s:"Accounts",q:"Independent external audit required by law?",opts:["Internal","Management","Statutory","Tax"],ans:2,e:"Statutory Audit."},

    // ENGLISH (61-70)
    {n:61,s:"English",q:"Correct sentence?",opts:["Neither have submitted","Neither has submitted","Neither student has","Neither had been"],ans:1,e:"'Neither' is singular."},
    {n:62,s:"English",q:"Passive: 'Officer will announce results tomorrow.'",opts:["results will announced","results will be announced","results are announced","results would be"],ans:1,e:"will + be + V3."},
    {n:63,s:"English",q:"Indirect: 'Do not make noise.'",opts:["said do not","told not to make noise","asked that should not","requested"],ans:1,e:"Imperative negative shift."},
    {n:64,s:"English",q:"Modal: 'He ___ have taken the documents (past possibility).'",opts:["should","may","will","must"],ans:1,e:"'May have' shows possibility."},
    {n:65,s:"English",q:"Article: 'She is ___ honest officer.'",opts:["a","an","the","no article"],ans:1,e:"Vowel sound 'o'."},
    {n:66,s:"English",q:"Antonym of FRUGAL:",opts:["Economical","Thrifty","Extravagant","Prudent"],ans:2,e:"Wasteful vs Saver."},
    {n:67,s:"English",q:"'The committee ___ divided in opinion.'",opts:["is","was","are","were"],ans:2,e:"Plural when members disagree."},
    {n:68,s:"English",q:"'Let the cat out of the bag'?",opts:["Free pet","Reveal secret","Chaos","Risk"],ans:1,e:"Reveal secret unintentionally."},
    {n:69,s:"English",q:"Hypothetical?",opts:["If I was you","If I were you","If I am you","If I be you"],ans:1,e:"Subjunctive mood 'were'."},
    {n:70,s:"English",q:"Opposite of VERBOSE:",opts:["Loquacious","Garrulous","Concise","Fluent"],ans:2,e:"Using few words."},

    // STATS (71-80)
    {n:71,s:"Statistics",q:"Mode of 5, 3, 7, 3, 9, 3, 1?",opts:["3","5","7","9"],ans:0,e:"3 appears most often."},
    {n:72,s:"Statistics",q:"P(A)=0.6, P(B)=0.4, M.E., P(A U B)?",opts:["0.24","0.10","1.00","0.24"],ans:2,e:"0.6 + 0.4 = 1.0."},
    {n:73,s:"Statistics",q:"Most outlier affected measure?",opts:["Median","Mode","Arithmetic Mean","G.M."],ans:2,e:"Mean uses all values."},
    {n:74,s:"Statistics",q:"Paasche's Price Index uses quantity of?",opts:["Base year","Average","Current year","Any"],ans:2,e:"Current year weights."},
    {n:75,s:"Statistics",q:"IMR age limit?",opts:["5 years","1 year","2 years","Newborn"],ans:1,e:"Death under 1 year per 1000."},
    {n:76,s:"Statistics",q:"Wide geographic data collection?",opts:["Interview","Mailed questionnaire","Telephone","Observation"],ans:1,e:"Mailed questionnaires are cheap/wide."},
    {n:77,s:"Statistics",q:"Empirical relation?",opts:["Mean-Mode=2(Mean-Med)","Mode=3Med-2Mean","Mean=3Mode-2Med","Med=Mean+Mode"],ans:1,e:"Karl Pearson formula."},
    {n:78,s:"Statistics",q:"Prob of King from 52 cards?",opts:["1/52","1/13","4/26","2/52"],ans:1,e:"4/52 = 1/13."},
    {n:79,s:"Statistics",q:"Census other name?",opts:["Sample","Complete enumeration","Stratified","Cluster"],ans:1,e:"Total population count."},
    {n:80,s:"Statistics",q:"NRR < 1 means?",opts:["Growing","Stable","Declining","Ageing"],ans:2,e:"Below replacement level."},

    // MATHS (81-90)
    {n:81,s:"Mathematics",q:"CI on 10k at 10% for 2 years?",opts:["2k","2.1k","1k","2.2k"],ans:1,e:"10,000 * 1.21 - 10,000."},
    {n:82,s:"Mathematics",q:"Solution of 5x-3y=11 and 3x+2y=12?",opts:["2","3","4","5"],ans:0,e:"x=2, y=-1/3 (approx)."},
    {n:83,s:"Mathematics",q:"7C3 value?",opts:["21","35","42","70"],ans:1,e:"7*6*5 / 3*2*1."},
    {n:84,s:"Mathematics",q:"f(x)=3x^2-2x+1, f'(x)?",opts:["3x-2","6x-2","6x+1","3x^2-2"],ans:1,e:"d/dx rules."},
    {n:85,s:"Mathematics",q:"A={1,2,3,4,5}, B={3,4,5,6,7}, A-B?",opts:["{3,4,5}","{1,2}","{6,7}","{1,2,6,7}"],ans:1,e:"Elements only in A."},
    {n:86,s:"Mathematics",q:"SI Principal doubles in 8 yrs. Rate?",opts:["10%","12.5%","8%","6.25%"],ans:1,e:"Rate = 100/Time."},
    {n:87,s:"Mathematics",q:"Midpoint (3,5) and (7,9)?",opts:["(5,7)","(4,6)","(5,8)","(10,14)"],ans:0,e:"Average of coordinates."},
    {n:88,s:"Mathematics",q:"lim x->0 (e^x - 1)/x?",opts:["0","e","1","inf"],ans:2,e:"Definition of derivative of e^x at 0."},
    {n:89,s:"Mathematics",q:"Det of [[4,3],[2,1]]?",opts:["10","-2","2","-10"],ans:1,e:"4-6 = -2."},
    {n:90,s:"Mathematics",q:"Signals from 3 flags out of 5?",opts:["10","15","60","20"],ans:2,e:"5P3 Permutation."},

    // ECONOMICS (91-100)
    {n:91,s:"Economics",q:"IC convex due to?",opts:["Inc MRS","Constant MU","Dim MRS","Supply"],ans:2,e:"Diminishing Marginal Rate of Substitution."},
    {n:92,s:"Economics",q:"GDP MP - Net Indirect Taxes?",opts:["NNP FC","GDP FC","GNP MP","NI"],ans:1,e:"Converts MP to Factor Cost."},
    {n:93,s:"Economics",q:"Banks parking funds with RBI?",opts:["Repo","Bank Rate","SLR","Reverse Repo"],ans:3,e:"Reverse Repo Rate."},
    {n:94,s:"Economics",q:"Stagflation?",opts:["High growth+inf","High inf+unemployment","Low price","Deflation"],ans:1,e:"Stagnation + Inflation."},
    {n:95,s:"Economics",q:"Two sellers market?",opts:["Monopoly","Oligopoly","Duopoly","Monopsony"],ans:2,e:"Duopoly."},
    {n:96,s:"Economics",q:"MRP theory for?",opts:["Goods","Factors","Bonds","Forex"],ans:1,e:"Marginal Revenue Product."},
    {n:97,s:"Economics",q:"Giffen Good?",opts:["Normal","Downward","Upward demand","Elastic"],ans:2,e:"Demand rises with price."},
    {n:98,s:"Economics",q:"Liquid assets bank keep with themselves?",opts:["CRR","Repo","SLR","Reverse Repo"],ans:2,e:"Statutory Liquidity Ratio."},
    {n:99,s:"Economics",q:"India's economy type?",opts:["Capitalist","Socialist","Mixed","Traditional"],ans:2,e:"Mixed economy."},
    {n:100,s:"Economics",q:"Ricardian Theory explains rent as?",opts:["Payment all factors","Differential fertility surplus","Wages","Interest"],ans:1,e:"Rent due to soil quality diff."},

    // SCIENCE & COMPUTER (101-120)
    {n:101,s:"Science",q:"Newton's Third Law?",opts:["F=ma","At rest","Equal/Opposite","Inertia"],ans:2,e:"Action and Reaction."},
    {n:102,s:"Science",q:"Ohm's Law?",opts:["P=VI","V=IR","F=ma","E=mc2"],ans:1,e:"Resistance relation."},
    {n:103,s:"Science",q:"Vitamin D deficiency?",opts:["Scurvy","Night blind","Rickets","Beriberi"],ans:2,e:"Causes Rickets."},
    {n:104,s:"Science",q:"NOT a GHG?",opts:["CO2","Methane","Nitrogen","N2O"],ans:2,e:"N2 is inert in atmosphere."},
    {n:105,s:"Science",q:"Xylem transports?",opts:["Food","Water/Minerals","Gas","Sugar"],ans:1,e:"Upward water flow."},
    {n:106,s:"Science",q:"Food from sunlight?",opts:["Respiration","Transpiration","Photosynthesis","Osmosis"],ans:2,e:"Photosynthesis."},
    {n:107,s:"Computers",q:"Brain of the computer?",opts:["RAM","HDD","CPU","GPU"],ans:2,e:"Central Processing Unit."},
    {n:108,s:"Computers",q:"Volatile memory?",opts:["ROM","RAM","SSD","BIOS"],ans:1,e:"RAM loses data on power off."},
    {n:109,s:"Computers",q:"1 Terabyte equals?",opts:["1000 GB","1024 GB","1024 MB","100 GB"],ans:1,e:"Binary measurement system."},
    {n:110,s:"Computers",q:"HTTP stands for?",opts:["High Text Transfer","Hypertext Transfer Protocol","Hyperlink Tech","Hidden Text"],ans:1,e:"Web communication protocol."},
    {n:111,s:"Computers",q:"Operating system example?",opts:["MS Office","Windows","Google","Intel"],ans:1,e:"Windows is an OS."},
    {n:112,s:"Computers",q:"Short cut for 'Paste'?",opts:["Ctrl+C","Ctrl+P","Ctrl+V","Ctrl+X"],ans:2,e:"Ctrl+V is paste."},
    {n:113,s:"Computers",q:"World Wide Web founder?",opts:["Bill Gates","Steve Jobs","Tim Berners-Lee","Mark Zuckerberg"],ans:2,e:"Tim Berners-Lee (1989)."},
    {n:114,s:"Computers",q:"Full form of PDF?",opts:["Personal Doc File","Portable Document Format","Printable Data","Public File"],ans:1,e:"Portable Document Format."},
    {n:115,s:"Computers",q:"Security software?",opts:["Antivirus","Browser","Driver","Editor"],ans:0,e:"Used to prevent malware."},
    {n:116,s:"Computers",q:"Social networking site?",opts:["Amazon","Facebook","Wikipedia","Yahoo"],ans:1,e:"Facebook is a social platform."},
    {n:117,s:"Computers",q:"Unit of speed for processor?",opts:["Bytes","Pixels","GHz","DPI"],ans:2,e:"Gigahertz."},
    {n:118,s:"Computers",q:"Extension of MS Word?",opts: [".txt", ".exe", ".docx", ".pdf"], ans: 2, e: "Modern Word documents use .docx."},
    {n:119,s:"Computers",q:"First mechanical computer?",opts:["Abacus","Analytical Engine","Pascaline","ENIAC"],ans:1,e:"Babbage's Analytical Engine."},
    {n:120,s:"Computers",q:"Search engine example?",opts:["Chrome","Google","Safari","Firefox"],ans:1,e:"Google is the search engine; Chrome is the browser."}
];

export default function ExamPortal() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isExamOver, setIsExamOver] = useState(false);
  const [viewMode, setViewMode] = useState("TEST"); // TEST or RESULT

  const currentQ = quizQuestions[currentIdx];

  useEffect(() => {
    if (timeLeft > 0 && !isExamOver) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endExam();
    }
  }, [timeLeft, isExamOver]);

  const endExam = () => {
    setIsExamOver(true);
    setViewMode("RESULT");
  };

  const handleOptionClick = (optIndex) => {
    if (isExamOver) return;
    setUserAnswers({ ...userAnswers, [currentIdx]: optIndex });
  };

  const calculateScore = () => {
    return quizQuestions.reduce((acc, q, i) => acc + (userAnswers[i] === q.ans ? 1 : 0), 0);
  };

  // --- STYLING ---
  const glass = {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
  };

  return (
    <div style={{ backgroundColor: "#010409", color: "#e6edf3", minHeight: "100vh", fontFamily: "system-ui, sans-serif", padding: "10px" }}>
      
      {/* Header */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px" }}>
        <div>
          <h1 style={{ color: "#00ff41", fontSize: "1.5rem", margin: 0, textShadow: "0 0 10px #00ff41" }}>JKSSB-FAA LIVE PORTAL</h1>
          <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>ADVANCED LEARNING INTERFACE</span>
        </div>
        <div style={{ ...glass, padding: "10px 20px", textAlign: "center" }}>
          <div style={{ color: timeLeft < 600 ? "#ff4444" : "#00ff41", fontSize: "1.2rem", fontWeight: "bold" }}>
            {Math.floor(timeLeft / 3600)}:{(Math.floor(timeLeft / 60) % 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <small>TIME LEFT</small>
        </div>
      </header>

      {viewMode === "TEST" ? (
        <main style={{ maxWidth: "1200px", margin: "20px auto", display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
          
          {/* Question Card */}
          <section style={{ ...glass, padding: "30px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={{ backgroundColor: SECTION_COLORS[currentQ.s] || "#555", color: "#000", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "0.8rem" }}>
                {currentQ.s}
              </span>
              <span style={{ opacity: 0.5 }}>Question {currentIdx + 1} of 120</span>
            </div>

            <h2 style={{ fontSize: "1.3rem", fontWeight: "500", lineHeight: "1.6", marginBottom: "30px" }}>{currentQ.q}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {currentQ.opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(i)}
                  style={{
                    textAlign: "left", padding: "18px", borderRadius: "10px", border: userAnswers[currentIdx] === i ? "2px solid #00ff41" : "1px solid #30363d",
                    backgroundColor: userAnswers[currentIdx] === i ? "rgba(0, 255, 65, 0.1)" : "rgba(255,255,255,0.02)",
                    color: userAnswers[currentIdx] === i ? "#00ff41" : "#fff", cursor: "pointer", fontSize: "1rem", transition: "0.2s"
                  }}
                >
                  <span style={{ opacity: 0.3, marginRight: "10px" }}>{i + 1}.</span> {opt}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between" }}>
              <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} style={{ padding: "12px 30px", background: "none", border: "1px solid #30363d", color: "#fff", cursor: "pointer", borderRadius: "8px" }}>PREV</button>
              {currentIdx === quizQuestions.length - 1 ? (
                <button onClick={endExam} style={{ padding: "12px 40px", backgroundColor: "#00ff41", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "bold" }}>SUBMIT TEST</button>
              ) : (
                <button onClick={() => setCurrentIdx(currentIdx + 1)} style={{ padding: "12px 40px", backgroundColor: "#00ff41", color: "#000", border: "none", cursor: "pointer", borderRadius: "8px", fontWeight: "bold" }}>NEXT</button>
              )}
            </div>
          </section>

          {/* Question Grid Sidebar */}
          <aside style={{ ...glass, padding: "20px", height: "fit-content" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "15px" }}>Question Palette</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", maxHeight: "400px", overflowY: "auto", paddingRight: "5px" }}>
              {quizQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  style={{
                    height: "35px", borderRadius: "4px", border: "none", cursor: "pointer",
                    backgroundColor: currentIdx === i ? "#00ff41" : userAnswers[i] !== undefined ? "#1a7f37" : "#30363d",
                    color: currentIdx === i ? "#000" : "#fff", fontSize: "0.7rem", fontWeight: "bold"
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "20px", fontSize: "0.8rem", borderTop: "1px solid #333", paddingTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}><div style={{ width: "12px", height: "12px", background: "#1a7f37", marginRight: "10px" }}></div> Answered</div>
              <div style={{ display: "flex", alignItems: "center" }}><div style={{ width: "12px", height: "12px", background: "#30363d", marginRight: "10px" }}></div> Not Visited</div>
            </div>
          </aside>
        </main>
      ) : (
        /* Final Result Page */
        <main style={{ maxWidth: "800px", margin: "40px auto", ...glass, padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: "#00ff41" }}>EXAM COMPLETED</h2>
          <div style={{ fontSize: "4rem", margin: "20px 0" }}>{calculateScore()} <span style={{ fontSize: "1.5rem", opacity: 0.5 }}>/ 120</span></div>
          <p>Accuracy: {((calculateScore() / 120) * 100).toFixed(1)}%</p>
          
          <div style={{ textAlign: "left", marginTop: "40px", maxHeight: "500px", overflowY: "auto", padding: "10px" }}>
            <h3 style={{ borderBottom: "1px solid #333", paddingBottom: "10px" }}>Review Your Answers</h3>
            {quizQuestions.map((q, i) => (
              <div key={i} style={{ marginBottom: "25px", padding: "15px", borderBottom: "1px solid #222" }}>
                <p style={{ fontWeight: "bold" }}>Q{i+1}: {q.q}</p>
                <p style={{ color: userAnswers[i] === q.ans ? "#00ff41" : "#ff4444" }}>Your Choice: {q.opts[userAnswers[i]] || "Skipped"}</p>
                <p style={{ color: "#00ff41" }}>Correct: {q.opts[q.ans]}</p>
                <div style={{ fontSize: "0.9rem", opacity: 0.7, fontStyle: "italic", marginTop: "10px" }}>{q.e}</div>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.reload()} style={{ marginTop: "30px", padding: "15px 40px", backgroundColor: "#00ff41", color: "#000", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>RETAKE EXAM</button>
        </main>
      )}
    </div>
  );
}
