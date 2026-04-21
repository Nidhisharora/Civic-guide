const express = require("express");
const cors = require("cors");
require("dotenv").config();
const chatRoutes = require("./routes/chatRoutes");

const ocrRoutes = require("./routes/ocrRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/ocr", ocrRoutes);

app.use("/api/chat", chatRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const schemeRoutes = require("./routes/schemeRoutes");
app.use("/api/schemes", schemeRoutes);