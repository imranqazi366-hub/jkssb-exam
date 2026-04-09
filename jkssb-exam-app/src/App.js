
const questions = [
  // ENGLISH SECTION
  { 
    id: 1, sec: "English", 
    q: "It was very kind of you to do the washing-up, but you ________ it.", 
    opts: ["didn't have to do", "hadn't to do", "mightn't have done", "mustn't have done"], 
    ans: 0, ex: " 'Didn't have to do' indicates that an action was performed but was not necessary." [cite: 594, 595, 598]
  },
  { 
    id: 2, sec: "English", 
    q: "Find the error: After knowing truth, (a)/ they took the right decision (b)/ in the matter. (c)/ No error (d)", 
    opts: ["a", "b", "c", "d"], 
    ans: 0, ex: "Error is in part (a); it should be 'After knowing the truth'." [cite: 606, 607, 609]
  },
  { 
    id: 3, sec: "English", 
    q: "Prohibited by law or treaty from being imported or exported:", 
    opts: ["contraband", "smuggled", "counterfeit", "forged"], 
    ans: 0, ex: "Contraband refers to goods forbidden by law." [cite: 616, 617, 620]
  },
  { 
    id: 4, sec: "English", 
    q: "Choose the word which best expresses the meaning: Inclement", 
    opts: ["Selfish", "Active", "Unfavourable", "Inactive"], 
    ans: 2, ex: "Inclement (usually regarding weather) means unpleasantly cold or wet; unfavourable." [cite: 627, 628, 634]
  },
  { 
    id: 5, sec: "English", 
    q: "Choose the word opposite in meaning: Perspicuity", 
    opts: ["Vagueness", "Dullness", "Unfairness", "Unwillingness"], 
    ans: 0, ex: "Perspicuity means clarity; its opposite is vagueness." [cite: 636, 637, 638]
  },

  // GK & J&K SPECIAL
  { 
    id: 16, sec: "GK", 
    q: "Which is the largest city in the Union Territory of Jammu and Kashmir?", 
    opts: ["Jammu", "Srinagar", "Anantnag", "Leh"], 
    ans: 1, ex: "Srinagar is the largest city in the UT of J&K." [cite: 740, 743]
  },
  { 
    id: 17, sec: "GK", 
    q: "Which river is primarily allocated to Pakistan under the Indus Water Treaty?", 
    opts: ["Indus", "Ravi", "Beas", "Sutlej"], 
    ans: 0, ex: "The Indus, Jhelum, and Chenab are allocated to Pakistan for unrestricted use." [cite: 747, 749]
  },
  { 
    id: 18, sec: "GK", 
    q: "Gulmarg hill station lies in which range?", 
    opts: ["Aravali Range", "Pir Panjal Range", "Langpangkong Range", "Changkikong Range"], 
    ans: 1, ex: "Gulmarg is situated in the Pir Panjal Range of the Western Himalayas." [cite: 755, 757]
  },
  { 
    id: 19, sec: "GK", 
    q: "Which of the following is known as the 'Valley of Shepherds'?", 
    opts: ["Pahalgam", "Gulmarg", "Sonamarg", "Betaab Valley"], 
    ans: 0, ex: "Pahalgam is famously known as the Valley of Shepherds." [cite: 760, 762]
  },

  // CURRENT AFFAIRS & AWARDS
  { 
    id: 22, sec: "GK", 
    q: "The book titled 'Memories Never Die' was published as a tribute to whom?", 
    opts: ["Abdul Kalam", "Atal Bihari Vajpayee", "Pranab Mukherjee", "Manohar Parrikar"], 
    ans: 0, ex: "This book is a tribute to the life of Dr. A.P.J. Abdul Kalam." [cite: 784, 785]
  },
  { 
    id: 35, sec: "GK", 
    q: "What was the mascot for the Khelo India Winter Games, 2024?", 
    opts: ["Snow Leopard", "Musk Deer", "Red Fox", "Golden Eagle"], 
    ans: 0, ex: "The mascot was 'Sheen-e She' (Shan), a snow leopard." [cite: 964, 965]
  },

  // MATH & APTITUDE
  { 
    id: 36, sec: "Math", 
    q: "If the price of a commodity increases by 50%, by what fraction must consumption be reduced to keep expenditure the same?", 
    opts: ["1/4", "1/3", "1/2", "2/3"], 
    ans: 1, ex: "Reduction = (r / (100+r)) = 50/150 = 1/3." [cite: 972, 975]
  },
  { 
    id: 40, sec: "Math", 
    q: "Value of (0.08 × 0.007) is equal to:", 
    opts: ["0.056", "0.0056", "0.00056", "0.56"], 
    ans: 2, ex: "8 × 7 = 56; moving the decimal 5 places (2+3) gives 0.00056." [cite: 1000, 1004]
  }
];
