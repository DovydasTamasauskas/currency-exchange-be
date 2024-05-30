const express = require("express");
const axios = require("axios");

const PORT = 3000;
const EXCHANGE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const app = express();

app.get("/", async (req, res) => {
  res.send("working...");
});

app.get("/exchange", async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;
  var result = null;
  if (baseCurrency && quoteCurrency && baseAmount) {
    const response = await axios.get(EXCHANGE_URL);
    result = response.data.rates;
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`running...`);
});
