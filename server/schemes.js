const schemes = [
  {
    name: "PM-Kisan",
    eligibility: (user) =>
      user.occupation === "farmer" && user.income < 600000,
    benefit: "₹6000 per year",
    steps: ["Register on PM-Kisan portal", "Submit land documents"]
  },
  {
    name: "Ayushman Bharat",
    eligibility: (user) =>
      user.income < 200000,
    benefit: "Free health insurance up to ₹5 lakh",
    steps: ["Check eligibility online", "Visit nearest hospital"]
  },
  {
    name: "Student Scholarship",
    eligibility: (user) =>
      user.occupation === "student" && user.income < 300000,
    benefit: "Financial support for education",
    steps: ["Apply via scholarship portal"]
  }
];

module.exports = schemes;