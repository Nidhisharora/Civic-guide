const express = require("express");
const router = express.Router();
const { checkEligibility } = require("../controllers/schemeController");

router.get("/check", checkEligibility);

module.exports = router;