
const examData = [
  // ENGLISH SECTION
  {
    id: 1, section: "English",
    question: "It was very kind of you to do the washing-up, but you ________ it.",
    options: ["didn't have to do", "hadn't to do", "mightn't have done", "mustn't have done"],
    answer: 0, explanation: "'Didn't have to do' indicates an action that was performed but was not necessary." // [cite: 595, 597, 603]
  },
  {
    id: 2, section: "English",
    question: "Find out which part of a sentence has an error: After knowing truth, (a)/ they took the right decision (b)/ in the matter. (c)/ No error (d)",
    options: ["a", "b", "c", "d"],
    answer: 0, explanation: "The error is in part (a); the correct phrase is 'knowing the truth'." // [cite: 607, 609, 615]
  },
  {
    id: 3, section: "English",
    question: "Prohibited by law or treaty from being imported or exported:",
    options: ["contraband", "smuggled", "counterfeit", "forged"],
    answer: 0 // [cite: 617, 619, 625]
  },
  {
    id: 10, section: "English",
    question: "Choose the alternative which best expresses the meaning of the Idiom/Phrase: 'to smell a rat'",
    options: ["to smell foul", "to see a rat", "to chase a rat", "to be suspicious"],
    answer: 3 // [cite: 681, 683, 687]
  },

  // GK & J&K SPECIAL SECTION
  {
    id: 16, section: "General Knowledge",
    question: "Which is the largest city in the Union Territory of Jammu and Kashmir?",
    options: ["Jammu", "Srinagar", "Anantnag", "Leh"],
    answer: 1 // [cite: 510, 511]
  },
  {
    id: 18, section: "General Knowledge",
    question: "Gulmarg hill station lies in which range?",
    options: ["Aravali Range", "Pir Panjal Range", "Langpangkong Range", "Changkikong Range"],
    answer: 1 // [cite: 512, 756, 759]
  },
  {
    id: 19, section: "General Knowledge",
    question: "Which of the following is known as the 'Valley of Shepherds'?",
    options: ["Pahalgam", "Gulmarg", "Sonamarg", "Betaab Valley"],
    answer: 0 // [cite: 513, 762, 767]
  },

  // CURRENT AFFAIRS & AWARDS (2024)
  {
    id: 23, section: "Current Affairs",
    question: "Match Gold winning Paralympic athletes (Paris 2024) to their sports: 1-Avani Lekhara, 2-Praveen Kumar, 3-Nitesh Kumar, 4-Harvinder Singh.",
    options: ["1-iii, 2-i, 3-iv, 4-ii", "1-i, 2-iii, 3-iv, 4-ii", "1-iii, 2-i, 3-ii, 4-iv", "1-i, 2-iii, 3-ii, 4-iv"],
    answer: 0, explanation: "Avani: Shooting (iii), Praveen: High Jump (i), Nitesh: Badminton (iv), Harvinder: Archery (ii)." // [cite: 789, 791, 801, 805]
  },
  {
    id: 35, section: "General Knowledge",
    question: "What was the mascot for the Khelo India Winter Games, 2024?",
    options: ["Snow Leopard", "Musk Deer", "Red Fox", "Golden Eagle"],
    answer: 0 // [cite: 964, 965, 971]
  },

  // QUANTITATIVE APTITUDE
  {
    id: 36, section: "Aptitude",
    question: "If the price of a commodity is increased by 50% by what fraction must its consumption be reduced so as to keep the same expenditure?",
    options: ["1/4", "1/3", "1/2", "2/3"],
    answer: 1, explanation: "Reduction = (50 / (100+50)) = 50/150 = 1/3." // [cite: 972, 974, 977]
  },
  {
    id: 40, section: "Aptitude",
    question: "The value of (0.08 × 0.007) is equal to:",
    options: ["0.056", "0.0056", "0.00056", "0.56"],
    answer: 2 // [cite: 1000, 1001, 1006]
  }
];
