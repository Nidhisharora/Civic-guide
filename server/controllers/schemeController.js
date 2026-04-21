const schemes = require("../data/schemes.json");

exports.checkEligibility = (req, res) => {
  const { age, income, occupation } = req.body;

  const eligible = schemes.filter((scheme) => {
    if (scheme.occupation && scheme.occupation !== occupation) {
      return false;
    }
    return income <= scheme.maxIncome;
  });

  res.json({ eligibleSchemes: eligible });
};