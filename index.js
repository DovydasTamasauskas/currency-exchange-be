const axios = require("axios");
const server = require("./public/server");
const { EXCHANGE_URL } = require("./public/urls");

const app = server.init();
const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "ILS"];

app.get("/", async (req, res) => {
  res.send("working...");
});

app.get("/exchange", async (req, res) => {
  const { baseCurrency, quoteCurrency, baseAmount } = req.query;
  var rates = null;

  if (
    !baseCurrency ||
    !quoteCurrency ||
    !SUPPORTED_CURRENCIES.includes(baseCurrency) ||
    !SUPPORTED_CURRENCIES.includes(quoteCurrency)
  )
    return res.status(400).json({
      error: "Currency is not supported by system",
    });

  if (!baseAmount || isNaN(baseAmount)) {
    return res.status(400).json({ error: "Excahnge amount is incorrect" });
  }

  if (baseCurrency && quoteCurrency && baseAmount) {
    try {
      const response = await axios.get(`${EXCHANGE_URL}/${baseCurrency}`);
      rates = response.data.rates;
    } catch {
      return res.status(500).json({ error: "Failed to fetch" });
    }
  }

  if (!rates[quoteCurrency] || !rates[baseCurrency])
    return res.status(400).json({ error: "Currency not supported" });

  const quoteAmount = Math.round(baseAmount * rates[quoteCurrency] * 10) / 1000;

  res.json({ quoteAmount, rates });
});
