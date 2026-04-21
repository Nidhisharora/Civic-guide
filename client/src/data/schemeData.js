// client/src/data/schemeData.js
// 10 real Indian Government Schemes — eligibility logic runs in browser, no API needed

export const SCHEMES = [
  {
    id: "pmjdy",
    name: "PM Jan Dhan Yojana (PMJDY)",
    ministry: "Ministry of Finance",
    tag: "Banking",
    desc: "Zero-balance bank account with RuPay debit card, ₹1 lakh accident insurance, and ₹30,000 life insurance for all unbanked citizens.",
    benefit: "Free bank account + ₹10,000 overdraft + ₹1 lakh accident insurance",
    documents: [
      "Aadhaar Card",
      "PAN Card or Form 60",
      "Passport-size photograph",
    ],
    applyUrl: "https://pmjdy.gov.in",
    howToApply: [
      "Visit any public sector bank (SBI, PNB, UCO, Bank of Baroda).",
      "Ask for PMJDY Account Opening Form (Form No. 1).",
      "Submit Aadhaar + 1 passport-size photograph.",
      "Account opens same day — RuPay debit card arrives within 10 days.",
    ],
    check: (f) => {
      if (f.nobank) return "eligible";
      if (f.income <= 200000 || f.occupation === "Daily Wage / Labourer" || f.occupation === "Farmer") return "eligible";
      return null;
    },
  },
  {
    id: "pmay",
    name: "PM Awas Yojana – Gramin (PMAY-G)",
    ministry: "Ministry of Rural Development",
    tag: "Housing",
    desc: "₹1.20 lakh (plains) or ₹1.30 lakh (hilly areas) to BPL families without a pucca house to build one, plus free toilet under Swachh Bharat Mission.",
    benefit: "₹1.20–1.30 lakh housing subsidy + free toilet construction support",
    documents: [
      "Aadhaar Card",
      "BPL Ration Card",
      "Bank account passbook",
      "Land ownership proof or allotment letter",
      "SECC 2011 inclusion proof",
    ],
    applyUrl: "https://pmayg.nic.in",
    howToApply: [
      "Check your name in SECC-2011 list at pmayg.nic.in.",
      "Visit your Gram Panchayat or Block Development Office (BDO).",
      "Submit Aadhaar + BPL card + land proof.",
      "Funds are released directly to bank in 3 installments after inspection.",
      "Construction must be completed within 12 months.",
    ],
    check: (f) => {
      if (f.nohouse && (f.bpl || f.income <= 100000)) return "eligible";
      if (f.nohouse) return "maybe";
      return null;
    },
  },
  {
    id: "ujjwala",
    name: "PM Ujjwala Yojana (PMUY)",
    ministry: "Ministry of Petroleum & Natural Gas",
    tag: "Energy",
    desc: "Free LPG gas connection with stove and first cylinder for women from BPL or economically weaker households to replace harmful firewood cooking.",
    benefit: "Free LPG connection + first refill subsidy + stove at subsidised cost",
    documents: [
      "Aadhaar Card (woman applicant)",
      "BPL Ration Card or SECC data",
      "Address proof",
      "Bank passbook",
      "Passport-size photograph",
    ],
    applyUrl: "https://pmuy.gov.in",
    howToApply: [
      "Visit nearest LPG distributor (IndianOil, HPCL, or BPCL).",
      "Fill Form KYC-1 (applicant info) and KYC-2 (household info).",
      "Submit Aadhaar + BPL card + bank passbook.",
      "Connection is free — first cylinder delivered within 7 working days.",
    ],
    check: (f) => {
      if (f.gender === "Female" && (f.bpl || f.income <= 150000)) return "eligible";
      if (f.gender === "Female" && f.income <= 250000) return "maybe";
      return null;
    },
  },
  {
    id: "pmkisan",
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    ministry: "Ministry of Agriculture & Farmers' Welfare",
    tag: "Agriculture",
    desc: "Direct income support of ₹6,000/year to all small and marginal landholding farmers, paid as ₹2,000 every 4 months directly to their bank account.",
    benefit: "₹6,000/year in 3 installments of ₹2,000 — direct bank transfer",
    documents: [
      "Aadhaar Card (mandatory)",
      "Land ownership records (Khasra / Khatauni)",
      "Bank account linked to Aadhaar",
      "Mobile number",
    ],
    applyUrl: "https://pmkisan.gov.in",
    howToApply: [
      "Go to pmkisan.gov.in → Farmer Corner → New Farmer Registration.",
      "Enter Aadhaar number and mobile number.",
      "Fill land details — village patwari verifies land records.",
      "Once approved, ₹2,000 is auto-credited every 4 months via DBT.",
      "You can also register at any Common Service Centre (CSC).",
    ],
    check: (f) => {
      if (f.occupation === "Farmer") return "eligible";
      return null;
    },
  },
  {
    id: "ayushman",
    name: "Ayushman Bharat – PM-JAY",
    ministry: "National Health Authority",
    tag: "Health",
    desc: "₹5 lakh/year health insurance for secondary and tertiary hospitalisation — surgeries, ICU, medicines — cashless at 25,000+ empanelled hospitals nationwide.",
    benefit: "₹5 lakh/year cashless health cover for entire family",
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Income certificate (if required)",
    ],
    applyUrl: "https://pmjay.gov.in",
    howToApply: [
      "Check eligibility at mera.pmjay.gov.in using Aadhaar or ration card.",
      "Visit nearest empanelled hospital or Common Service Centre (CSC).",
      "Get your Ayushman card printed free of cost.",
      "Show the card at hospital for fully cashless treatment — no paperwork needed.",
    ],
    check: (f) => {
      if (f.bpl || f.income <= 200000 || f.category === "SC" || f.category === "ST") return "eligible";
      if (f.income <= 300000) return "maybe";
      return null;
    },
  },
  {
    id: "nsp",
    name: "National Scholarship Portal (NSP)",
    ministry: "Ministry of Education / Minority Affairs",
    tag: "Education",
    desc: "Pre-matric and post-matric scholarships for SC/ST/OBC/Minority students covering tuition fees, hostel charges, and maintenance allowances.",
    benefit: "₹2,000–25,000/year scholarship depending on course and category",
    documents: [
      "Aadhaar Card",
      "Previous year mark sheet / bonafide certificate",
      "Parent's income certificate",
      "Bank account (student or parent)",
      "Caste / category certificate",
    ],
    applyUrl: "https://scholarships.gov.in",
    howToApply: [
      "Register at scholarships.gov.in with Aadhaar.",
      "Select your applicable scheme (Pre-matric / Post-matric / Merit-cum-Means).",
      "Upload mark sheets, income certificate, caste certificate.",
      "Submit by October–November (deadline varies each year).",
      "Your school or college must verify the application online within 30 days.",
      "Amount credited directly to bank account after state verification.",
    ],
    check: (f) => {
      if (
        f.occupation === "Student" &&
        (f.category === "SC" || f.category === "ST" || f.category === "OBC" || f.category === "EWS") &&
        f.income <= 250000
      ) return "eligible";
      if (f.occupation === "Student" && f.income <= 150000) return "maybe";
      return null;
    },
  },
  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    ministry: "Ministry of Women & Child Development",
    tag: "Maternity",
    desc: "₹5,000 cash benefit to pregnant women and lactating mothers for the first living child to compensate wage loss and improve nutrition.",
    benefit: "₹5,000 in 3 installments: ₹1,000 + ₹2,000 + ₹2,000",
    documents: [
      "Aadhaar Card",
      "MCP Card (from ANM / Anganwadi)",
      "Bank account",
      "Ration Card",
      "Husband's Aadhaar (for record)",
    ],
    applyUrl: "https://pmmvy.wcd.gov.in",
    howToApply: [
      "Register within 150 days of pregnancy at nearest Anganwadi Centre or govt hospital.",
      "Fill Form 1-A on registration → 1st installment (₹1,000) released.",
      "Fill Form 1-B after 1st ANC checkup at 6 months → 2nd installment (₹2,000).",
      "Fill Form 1-C after child birth + 1st vaccination → 3rd installment (₹2,000).",
      "All amounts transferred directly to your bank account.",
    ],
    check: (f) => {
      if (f.pregnant) return "eligible";
      return null;
    },
  },
  {
    id: "apy",
    name: "Atal Pension Yojana (APY)",
    ministry: "Ministry of Finance / PFRDA",
    tag: "Pension",
    desc: "Guaranteed pension of ₹1,000–₹5,000/month after age 60 for unorganised sector workers, with spouse pension and death corpus benefit.",
    benefit: "₹1,000–₹5,000/month pension post-60 + spouse pension + ₹1.7–8.5 lakh death corpus",
    documents: [
      "Aadhaar Card",
      "Savings bank account",
      "Mobile number linked to bank",
    ],
    applyUrl: "https://npscra.nsdl.co.in",
    howToApply: [
      "Visit your bank branch or post office and ask for APY subscription form.",
      "Choose your desired pension amount (₹1k / ₹2k / ₹3k / ₹4k / ₹5k per month).",
      "Monthly contribution auto-debited: ₹42–₹1,454/month based on age and pension chosen.",
      "The earlier you join, the lower your monthly contribution.",
      "Can also subscribe via internet banking of most major banks.",
    ],
    check: (f) => {
      const age = parseInt(f.age);
      if (
        age >= 18 && age <= 40 &&
        (f.occupation === "Daily Wage / Labourer" || f.occupation === "Farmer" ||
          f.occupation === "Self-employed / Business" || f.occupation === "Unemployed")
      ) return "eligible";
      if (age >= 18 && age <= 40) return "maybe";
      return null;
    },
  },
  {
    id: "mudra",
    name: "PM MUDRA Yojana",
    ministry: "Ministry of Finance / MUDRA Bank",
    tag: "Business Loan",
    desc: "Collateral-free business loans in 3 tiers: Shishu (up to ₹50,000), Kishor (₹50K–5 lakh), Tarun (₹5–10 lakh) for micro and small enterprises.",
    benefit: "₹50,000 to ₹10 lakh loan without collateral or guarantor",
    documents: [
      "Aadhaar + PAN Card",
      "Business proof (GST / photos / registration)",
      "6-month bank statement",
      "Address proof of business",
      "2 passport-size photographs",
    ],
    applyUrl: "https://www.mudra.org.in",
    howToApply: [
      "Visit any public sector bank, RRB, MFI, or NBFC.",
      "Ask for MUDRA loan form for the tier you need (Shishu / Kishor / Tarun).",
      "Submit business proof + KYC documents + bank statements.",
      "Shishu loans (under ₹50,000) are approved within 7–10 working days.",
      "Apply online at udyamimitra.in and track application status there.",
    ],
    check: (f) => {
      if (f.occupation === "Self-employed / Business" || f.occupation === "Daily Wage / Labourer") return "eligible";
      if (f.occupation === "Farmer" || f.occupation === "Unemployed") return "maybe";
      return null;
    },
  },
  {
    id: "ignoaps",
    name: "NSAP – Old Age Pension (IGNOAPS)",
    ministry: "Ministry of Rural Development",
    tag: "Old Age Pension",
    desc: "Monthly pension for BPL senior citizens aged 60+. Central share is ₹200–₹500; most states add a top-up bringing total to ₹1,000–₹2,000/month.",
    benefit: "₹200–₹500/month (central) + state top-up — varies by state",
    documents: [
      "Aadhaar Card",
      "Age proof (birth / school / medical certificate)",
      "BPL Ration Card",
      "Bank account passbook",
      "Photograph",
    ],
    applyUrl: "https://nsap.nic.in",
    howToApply: [
      "Apply at Gram Panchayat (rural) or Municipal office (urban).",
      "Fill IGNOAPS application Form-A.",
      "District Social Welfare Officer approves within 60 days.",
      "Pension paid monthly via direct bank transfer (DBT).",
      "Track status at nsap.nic.in using your beneficiary ID.",
    ],
    check: (f) => {
      const age = parseInt(f.age);
      if (age >= 60 && (f.bpl || f.income <= 100000)) return "eligible";
      if (age >= 60) return "maybe";
      return null;
    },
  },
];