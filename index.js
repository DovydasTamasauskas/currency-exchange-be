const axios = require("axios");
const server = require("./public/server");
const { EXCHANGE_URL } = require("./public/urls");

const app = server.init();

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
