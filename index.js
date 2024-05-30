const axios = require("axios");
const server = require("./public/server");

const app = server.init();

const EXCHANGE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

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
