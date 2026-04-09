
import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOTAL_TIME = 120 * 60; // 120 minutes
const SC = { 
  GK: "#1e3a5f", Accounts: "#0f766e", English: "#c2410c", 
  Statistics: "#15803d", Mathematics: "#6d28d9", Economics: "#0369a1", 
  Science: "#b45309", Computers: "#be185d" 
};

const sets = {
  2: {
    title: "JKSSB FAA - Full Length Mock Set 2",
    qs: [
      // GK (1-30)
      {n:1,s:"GK",q:"The Martand Sun Temple, one of the finest examples of ancient Kashmiri architecture, was built by?",opts:["Avantivarman","Lalitaditya Muktapida","Emperor Kanishka","Sultan Sikandar"],ans:1,e:"Martand Sun Temple built by Lalitaditya Muktapida of Karkota dynasty in 8th century AD, in Anantnag."},
      {n:2,s:"GK",q:"Which constitutional article was used by Parliament to grant special status to J&K (now abrogated)?",opts:["Article 356","Article 370","Article 371","Article 360"],ans:1,e:"Article 370 granted special status to J&K. Abrogated on 5 August 2019."},
      {n:3,s:"GK",q:"The first Dogra ruler to consolidate Jammu, Kashmir and Ladakh under one administration was?",opts:["Ranjit Dev","Ranbir Singh","Gulab Singh","Pratap Singh"],ans:2,e:"Maharaja Gulab Singh unified Jammu, Kashmir and Ladakh under Treaty of Amritsar 1846."},
      {n:4,s:"GK",q:"Burzahom, one of the earliest archaeological sites in Kashmir, is known for?",opts:["Mughal garden architecture","Neolithic pit-dwelling civilisation","Buddhist rock-cut temples","Dogra-era fortifications"],ans:1,e:"Burzahom (near Srinagar) = Neolithic site with underground pit dwellings."},
      {n:5,s:"GK",q:"Which among the following rivers does NOT originate in Jammu & Kashmir?",opts:["Jhelum","Chenab","Ravi","Ganga"],ans:3,e:"Ganga originates in Uttarakhand (Gangotri glacier)."},
      {n:6,s:"GK",q:"The J&K Reorganisation Act, 2019 bifurcated the state into two Union Territories effective from?",opts:["5 August 2019","15 August 2019","31 October 2019","1 November 2019"],ans:2,e:"Effective from 31 October 2019."},
      {n:7,s:"GK",q:"Under the J&K Reorganisation Act 2019, how many seats does the J&K Legislative Assembly have?",opts:["107","111","114","120"],ans:2,e:"Seats increased to 114 (including 24 reserved for PoK)."},
      {n:8,s:"GK",q:"Karan Singh held the constitutional position of Sadr-e-Riyasat of J&K until?",opts:["1962","1965","1968","1971"],ans:1,e:"Served until March 1965, then became first Governor."},
      {n:9,s:"GK",q:"The Sufi saint credited with introducing the Rishi Order in Kashmir was?",opts:["Shah-i-Hamdan","Bulbul Shah","Sheikh Noor-ud-din Wali (Nund Rishi)","Rasul Mir"],ans:2,e:"Sheikh Noor-ud-din Wali founded the Rishi Order."},
      {n:10,s:"GK",q:"The Dogra Art Museum is housed within which complex in Jammu?",opts:["Bahu Fort","Amar Mahal","Mubarak Mandi Complex","Raghunath Temple"],ans:2,e:"Located in Mubarak Mandi complex, Jammu."},
      {n:11,s:"GK",q:"The J&K Official Languages Act 2020 recognised how many official languages for the UT?",opts:["2","3","4","5"],ans:3,e:"5 languages: Kashmiri, Dogri, Hindi, Urdu, and English."},
      {n:12,s:"GK",q:"Sindh Nallah (Nallah Sindh) is a tributary of which river in Kashmir?",opts:["Chenab","Jhelum","Tawi","Indus"],ans:1,e:"Major tributary of the Jhelum."},
      {n:13,s:"GK",q:"India's Parliament derives its power to form new States or alter their boundaries from?",opts:["Article 1","Article 2","Article 3","Article 4"],ans:2,e:"Article 3 allows Parliament to alter state boundaries."},
      {n:14,s:"GK",q:"The mass exodus of Kashmiri Pandits from the Kashmir valley occurred in?",opts:["1947","1965","1984","1990"],ans:3,e:"The exodus occurred in January 1990."},
      {n:15,s:"GK",q:"The J&K Reorganisation Act 2019 abolished which house of the state legislature?",opts:["Legislative Assembly","Rajya Sabha seat","Legislative Council","Public Accounts Committee"],ans:2,e:"The Legislative Council (Upper House) was abolished."},
      {n:16,s:"GK",q:"Losar is the traditional New Year of which community in J&K?",opts:["Dogra community","Kashmiri Muslim community","Ladakhi Buddhist community","Gujjar community"],ans:2,e:"Losar = Ladakhi Buddhist New Year."},
      {n:17,s:"GK",q:"The 'Darbar Move' practice was suspended in which year?",opts:["2019","2020","2021","2022"],ans:2,e:"Suspended in 2021 for digitization."},
      {n:18,s:"GK",q:"NABARD's primary mandate is to?",opts:["Regulate stock markets","Provide development credit to agriculture","Set monetary policy","Manage securities"],ans:1,e:"National Bank for Agriculture and Rural Development."},
      {n:19,s:"GK",q:"Which of the following is NOT a Union Territory with a Legislature?",opts:["Delhi","Puducherry","Jammu and Kashmir","Ladakh"],ans:3,e:"Ladakh is a UT without a legislature."},
      {n:20,s:"GK",q:"The Raghunath Temple in Jammu was completed by?",opts:["Maharaja Pratap Singh","Maharaja Ranbir Singh","Maharaja Hari Singh","Maharaja Ranjit Dev"],ans:1,e:"Completed by Maharaja Ranbir Singh in 1860."},
      {n:21,s:"GK",q:"CPI (Consumer Price Index) is used in India to officially measure?",opts:["GDP growth","Industrial production","Rate of inflation","Foreign exchange rate"],ans:2,e:"Used to target inflation since 2014."},
      {n:22,s:"GK",q:"The Chenab Rail Bridge is part of which project?",opts:["Delhi-Mumbai Corridor","USBRL","National Highway Expansion","Freight Corridor"],ans:1,e:"Part of Udhampur-Srinagar-Baramulla Rail Link."},
      {n:23,s:"GK",q:"Kousarnag lake in J&K is situated in the?",opts:["Zanskar Range","Pir Panchal Range","Greater Himalayan Range","Ladakh Range"],ans:1,e:"Located in the Pir Panchal range."},
      {n:24,s:"GK",q:"Under the J&K Reorganisation Act 2019, LG must act on Advisory Committee recommendations within?",opts:["15 days","30 days","45 days","60 days"],ans:1,e:"Must act within 30 days."},
      {n:25,s:"GK",q:"The GI tag for Basohli Paintings was granted in?",opts:["2020","2021","2022","2023"],ans:3,e:"Granted in 2023."},
      {n:26,s:"GK",q:"Which of the following is the longest National Highway in India?",opts:["NH-1","NH-44","NH-48","NH-27"],ans:1,e:"NH-44 (Srinagar to Kanyakumari)."},
      {n:27,s:"GK",q:"The J&K High Court under the Reorganisation Act 2019 serves as common court for?",opts:["J&K only","Ladakh only","Both J&K and Ladakh","HP and J&K"],ans:2,e:"Common court for both UTs."},
      {n:28,s:"GK",q:"Sheikh Mohammad Abdullah served as the first Prime Minister of J&K from?",opts:["1947 to 1953","1953 to 1963","1963 to 1965","1975 to 1982"],ans:0,e:"First PM from 1947–1953."},
      {n:29,s:"GK",q:"The Directorate of Archives in J&K was established in modern form in?",opts:["1947","1956","1963","1975"],ans:2,e:"Established in 1963."},
      {n:30,s:"GK",q:"The Hemis Festival in Ladakh commemorates?",opts:["Lord Buddha","Guru Nanak","Guru Padmasambhava","Dalai Lama"],ans:2,e:"Celebrates birth of Guru Padmasambhava."},

      // ACCOUNTS (31-60)
      {n:31,s:"Accounts",q:"The concept which assumes a business will continue operations for the foreseeable future?",opts:["Matching","Consistency","Going Concern","Accrual"],ans:2,e:"Going Concern Concept."},
      {n:32,s:"Accounts",q:"The Accrual Concept requires that?",opts:["Cash is received","Revenue recognized when earned","Only cash recorded","Monthly prep"],ans:1,e:"Revenue when earned, regardless of cash."},
      {n:33,s:"Accounts",q:"Under Conservatism, an accountant should?",opts:["Anticipate profits","Record realized only","Provide for losses but not profits","Market values"],ans:2,e:"Anticipate no profit, provide for all possible losses."},
      {n:34,s:"Accounts",q:"A cheque deposited but not yet credited in Bank Statement is?",opts:["Outstanding","Stale","Deposit in transit","Dishonoured"],ans:2,e:"Deposit in Transit."},
      {n:35,s:"Accounts",q:"Recording revenue expense as capital is an?",opts:["Omission","Commission","Error of principle","Compensating"],ans:2,e:"Error of Principle."},
      {n:36,s:"Accounts",q:"Under Straight Line Method, annual depreciation?",opts:["Increases","Decreases","Remains constant","Market value"],ans:2,e:"Remains constant on original cost."},
      {n:37,s:"Accounts",q:"Current Ratio formula is?",opts:["Assets/Liabilities","Current Assets / Current Liabilities","Fixed/Capital","NP
