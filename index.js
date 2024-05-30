const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", async (req, res) => {
  res.send("working...");
});

app.listen(PORT, () => {
  console.log(`running...`);
});
